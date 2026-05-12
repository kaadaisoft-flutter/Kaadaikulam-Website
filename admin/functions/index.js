const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const cloudinary = require('cloudinary').v2;

const cloudinaryApiKey = defineSecret('CLOUDINARY_API_KEY');
const cloudinaryApiSecret = defineSecret('CLOUDINARY_API_SECRET');

/**
 * Deletes an asset from Cloudinary.
 * POST body: { publicId: string, resourceType?: 'image' | 'video' }
 */
exports.cloudinaryDelete = onRequest(
  { secrets: [cloudinaryApiKey, cloudinaryApiSecret] },
  async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { publicId, resourceType = 'image' } = req.body || {};
      if (!publicId) {
        res.status(400).json({ error: 'publicId is required' });
        return;
      }

      cloudinary.config({
        cloud_name: 'dy8uty5uo',
        api_key: cloudinaryApiKey.value(),
        api_secret: cloudinaryApiSecret.value(),
      });

      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      res.json({ success: true });
    } catch (err) {
      console.error('Cloudinary delete error:', err);
      res.status(500).json({ error: err.message || 'Delete failed' });
    }
  }
);
