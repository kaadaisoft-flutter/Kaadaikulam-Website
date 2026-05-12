/**
 * Cloudinary upload service for gallery images and videos.
 * Uses unsigned upload with preset - no API secret in client.
 * Delete uses env credentials (temporary - move to backend later).
 */

const CLOUD_NAME = 'dy8uty5uo';
const UPLOAD_PRESET_GALLERY = 'poondurai_kaadai_gallery';
const UPLOAD_PRESET_QR = 'poondurai_kaadai_qr';
const UPLOAD_PRESET_BLOG = 'poondurai_kaadai_blog';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

async function sha1Hex(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Delete asset from Cloudinary. Uses API key/secret from env.
 * SECURITY: Move to backend when possible - secret is exposed in client bundle.
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    if (!API_KEY || !API_SECRET) {
        throw new Error('VITE_CLOUDINARY_API_KEY and VITE_CLOUDINARY_API_SECRET must be set in .env');
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const params = { public_id: publicId, timestamp };
    const paramsStr = Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join('&');
    const signature = await sha1Hex(paramsStr + API_SECRET);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp);
    formData.append('api_key', API_KEY);
    formData.append('signature', signature);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/destroy`,
        { method: 'POST', body: formData }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || 'Cloudinary delete failed');
    return data;
};

function sanitizeForPublicId(str) {
    return (str || '')
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .slice(0, 100) || 'media';
}

/**
 * Upload file to Cloudinary. Uses 'auto' to detect image vs video.
 * @param {File} file - The file to upload
 * @param {Object} options - { preset?: string, folder?: string } - preset: 'gallery' | 'qr', folder for public_id
 * @returns {Promise<{ url: string, publicId: string, resourceType: string }>}
 */
export const uploadToCloudinary = async (file, options = {}) => {
    let preset = UPLOAD_PRESET_GALLERY;
    let folder = options.folder || 'gallery';

    if (options.preset === 'qr') {
        preset = UPLOAD_PRESET_QR;
        folder = options.folder || 'qr';
    } else if (options.preset === 'blog') {
        preset = UPLOAD_PRESET_BLOG;
        folder = options.folder || 'blog';
    }

    const baseName = file.name ? file.name.replace(/\.[^/.]+$/, '') : 'media';
    const filename = sanitizeForPublicId(baseName);
    const uuid = crypto.randomUUID().replace(/-/g, '');
    const publicId = `${folder}/${filename}_${uuid}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);
    formData.append('public_id', publicId);

    const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Cloudinary upload failed: ${err}`);
    }

    const data = await res.json();
    return {
        url: data.secure_url,
        publicId: data.public_id,
        resourceType: data.resource_type || (file.type?.startsWith('video/') ? 'video' : 'image'),
    };
};
