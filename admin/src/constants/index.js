/**
 * Centralized constants for the admin portal.
 * Update values here to avoid duplication across pages.
 */

// Gallery
export const GALLERY_CATEGORIES = [
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Festivals', label: 'Festivals' },
  { value: 'Rituals', label: 'Rituals' },
];

export const GALLERY_MEDIA_TYPES = [
  { value: 'Image', label: 'Image' },
  { value: 'Video Upload', label: 'Video Upload' },
  { value: 'YouTube Video', label: 'YouTube Video' },
];

// Blog
export const BLOG_AUTHORS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Temple Trust', label: 'Temple Trust' },
];

export const BLOG_CATEGORIES = [
  { value: 'Festival', label: 'Festival' },
  { value: 'Ritual', label: 'Ritual' },
  { value: 'Announcement', label: 'Announcement' },
  { value: 'Temple News', label: 'Temple News' },
];

export const BLOG_STATUS_OPTIONS = [
  { value: 'Draft', label: 'Draft' },
  { value: 'Published', label: 'Published' },
  { value: 'Archived', label: 'Archived' },
];

// Comments
export const COMMENT_STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];

// E-Services
export const APPROVAL_STATUS_OPTIONS = [
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending Approval', label: 'Pending' },
  { value: 'Rejected', label: 'Rejected' },
];

// Contact (Firestore: status pending/read, subject lowercase)
export const CONTACT_STATUS_OPTIONS = [
  { value: 'pending', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

export const CONTACT_SUBJECT_OPTIONS = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'general', label: 'General' },
  { value: 'visit', label: 'Visit' },
  { value: 'donation', label: 'Donation' },
  { value: 'event', label: 'Event' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

// Donation purpose (Firestore: general, maintenance, annadanam, festival)
export const DONATION_PURPOSE_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'annadanam', label: 'Annadanam' },
  { value: 'festival', label: 'Festival' },
];

// Donation status
export const DONATION_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

// Legacy (for backward compatibility)
export const DONATION_SERVICE_OPTIONS = DONATION_PURPOSE_OPTIONS;

// Placeholder URLs
export const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=100&h=100&fit=crop&auto=format';
export const PLACEHOLDER_VID =
  'https://images.unsplash.com/photo-1574236170880-fea49bb1af09?w=100&h=100&fit=crop&auto=format';
