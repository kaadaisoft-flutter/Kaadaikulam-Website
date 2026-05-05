/**
 * Generate URL-friendly slug from a string
 * @param {string} text - Input text (e.g. blog title)
 * @returns {string} - Slug (lowercase, hyphens, no special chars)
 */
export const generateSlug = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};
