/**
 * Convert an image File to WebP format using Canvas API
 * @param {File} file - The image file to convert
 * @param {number} maxSizeBytes - Max size in bytes (default 2MB)
 * @returns {Promise<File>} - Converted WebP File
 */
export const convertToWebP = async (file, maxSizeBytes = 2 * 1024 * 1024) => {
    // 1. Instant return for valid WebP files
    if (file.type === 'image/webp' && file.size <= maxSizeBytes) {
        return file;
    }

    try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        // 2. Mathematical "Single-Shot" Quality Calculation
        // Using a Square Root curve (Math.sqrt) for quality is much more accurate than a linear ratio.
        // Image data doesn't shrink linearly, so this ensures large files (10MB+) don't get over-compressed.
        let initialQuality = 0.9;
        if (file.size > maxSizeBytes) {
            const ratio = maxSizeBytes / file.size;
            // Square root curve + 0.9 safety buffer provides a much more stable target
            initialQuality = Math.max(0.3, Math.min(0.85, Math.sqrt(ratio) * 0.9));
        }

        const baseName = file.name.replace(/\.[^.]+$/, '');

        return new Promise((resolve, reject) => {
            const tryConvert = (currentQuality) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Conversion failed'));
                            return;
                        }

                        // 3. Final Check & Quick Re-adjustment
                        // If it's still over (very rare with the buffer), we do one final shrink.
                        if (blob.size > maxSizeBytes && currentQuality > 0.2) {
                            const refinementRatio = maxSizeBytes / blob.size;
                            tryConvert(currentQuality * refinementRatio * 0.9);
                        } else {
                            resolve(new File([blob], `${baseName}.webp`, {
                                type: 'image/webp',
                                lastModified: Date.now(),
                            }));
                        }
                    },
                    'image/webp',
                    currentQuality
                );
            };
            tryConvert(initialQuality);
        });
    } catch (err) {
        console.error('High-speed conversion error:', err);
        throw err;
    }
};
