import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md', lightBackdrop = false, noPadding = false, skipAnimation = false }) => {
    if (!isOpen) return null;

    const backdropClass = lightBackdrop ? 'bg-black/20' : 'bg-black/50';
    const backdropAnim = skipAnimation ? '' : 'animate-in fade-in duration-200';
    const contentAnim = skipAnimation ? '' : 'animate-in zoom-in-95 duration-200';

    const modalContent = (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden ${backdropClass} backdrop-blur-sm p-4 ${backdropAnim}`}>
            <div
                className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] ${contentAnim}`}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                    <h3 className="text-lg font-serif font-bold text-gray-900">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className={`overflow-y-auto w-full ${noPadding ? 'p-0' : 'p-4 sm:p-6'}`}>
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;
