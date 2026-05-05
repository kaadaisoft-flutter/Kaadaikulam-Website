import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { extractYoutubeId } from '../utils/youtubeUtils';
import toast from 'react-hot-toast';

const YOUTUBE_EMBED_BASE = 'https://www.youtube-nocookie.com/embed';

const MediaPreview = ({ isOpen, onClose, media }) => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const { type, fullUrl, title, thumbnail } = media || {};
  const youtubeId = type === 'YouTube Video' ? extractYoutubeId(fullUrl) : null;

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Reset error states when media changes
  useEffect(() => {
    setImageError(false);
    setVideoError(false);
  }, [media]);

  if (!isOpen || !media) return null;

  const previewContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media preview"
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 p-2 text-white/70 hover:text-white transition-all z-[10000]"
        title="Close"
        aria-label="Close preview"
      >
        <X size={32} />
      </button>

      <div
        className="relative w-full max-w-5xl max-h-full flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'YouTube Video' ? (
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            {youtubeId ? (
              <iframe
                src={`${YOUTUBE_EMBED_BASE}/${youtubeId}?autoplay=1&rel=0&enablejsapi=1&origin=${window.location.origin}`}
                title={title || 'YouTube Video'}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white gap-2">
                <p>Invalid YouTube URL</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-white/20 rounded-lg hover:bg-white/30"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : type === 'Video Upload' ? (
          <div className="relative w-full max-h-[90vh] flex items-center justify-center bg-gray-900 min-w-[320px] rounded-lg overflow-hidden shadow-2xl">
            {videoError ? (
              <div className="flex flex-col items-center justify-center p-8 text-white gap-2">
                <p>Failed to load video</p>
                <button
                  onClick={() => setVideoError(false)}
                  className="px-4 py-2 text-sm bg-white/20 rounded-lg hover:bg-white/30"
                >
                  Retry
                </button>
              </div>
            ) : (
              <video
                src={fullUrl}
                poster={thumbnail}
                controls
                autoPlay
                muted
                playsInline
                className="max-w-full max-h-[90vh] w-full object-contain"
                onError={() => {
                  setVideoError(true);
                  toast.error('Failed to load video', { id: 'media-video-error' });
                }}
              />
            )}
          </div>
        ) : (
          <>
            {imageError ? (
              <div className="flex flex-col items-center justify-center p-8 text-white gap-2 max-w-md">
                <p>Failed to load image</p>
                <button
                  onClick={() => setImageError(false)}
                  className="px-4 py-2 text-sm bg-white/20 rounded-lg hover:bg-white/30"
                >
                  Retry
                </button>
              </div>
            ) : (
              <img
                src={fullUrl}
                alt={title || 'Preview'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onError={() => {
                  setImageError(true);
                  toast.error('Failed to load image', { id: 'media-image-error' });
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(previewContent, document.body);
};

export default MediaPreview;
