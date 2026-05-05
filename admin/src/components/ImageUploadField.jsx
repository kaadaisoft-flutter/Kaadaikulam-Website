import React, { useState, useCallback, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Modal from './Modal';
import ImageCropper from './ImageCropper';
import { convertToWebP } from '../utils/imageUtils';

/**
 * Reusable image upload field with preview, remove button, and image cropper.
 * Same functionality as Gallery module - use across Blog, DonationSettings, etc.
 */
const ImageUploadField = ({
    value,
    onChange,
    onFileChange,
    label = 'Image',
    required = false,
    placeholder = 'Click to upload or drag & drop',
    hint = '',
    previewClassName = 'w-20 h-20',
    imageFit = 'cover',
    disabled = false,
    onPreviewClick,
    onConvertingChange,
    imageMode = 'horizontal', // 'horizontal' or 'vertical'
    fileName = '',
    fileDetails = '',
    aspectRatio = null, // e.g. 16/9 or 4/3
}) => {
    const [cropImageSource, setCropImageSource] = useState(null);
    const [originalFileName, setOriginalFileName] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            const baseName = file.name ? file.name.replace(/\.[^/.]+$/, '') : 'image';
            setOriginalFileName(baseName);
            const objectUrl = URL.createObjectURL(file);
            setCropImageSource(objectUrl);
        }
    }, []);

    const handleCropComplete = useCallback(async (croppedBlob) => {
        if (cropImageSource) URL.revokeObjectURL(cropImageSource);
        setCropImageSource(null);
        setIsConverting(true);
        onConvertingChange?.(true);

        const baseName = originalFileName || 'image';
        const webpName = `${baseName}.webp`;

        const previewUrl = URL.createObjectURL(croppedBlob);
        onChange(previewUrl);

        try {
            const croppedFile = new File([croppedBlob], webpName, { type: 'image/webp' });
            const optimizedFile = await convertToWebP(croppedFile);
            if (onFileChange) onFileChange(optimizedFile);
            if (optimizedFile !== croppedFile) {
                URL.revokeObjectURL(previewUrl);
                const newUrl = URL.createObjectURL(optimizedFile);
                onChange(newUrl);
            }
        } catch (err) {
            console.error('Optimization failed:', err);
            if (onFileChange) onFileChange(new File([croppedBlob], webpName, { type: 'image/webp' }));
        }
        setOriginalFileName('');
        setIsConverting(false);
        onConvertingChange?.(false);
    }, [cropImageSource, originalFileName, onChange, onFileChange, onConvertingChange]);

    const cancelCrop = useCallback(() => {
        if (cropImageSource) URL.revokeObjectURL(cropImageSource);
        setCropImageSource(null);
        setOriginalFileName('');
    }, [cropImageSource]);

    const handleClear = useCallback(() => {
        if (value && value.startsWith('blob:')) {
            URL.revokeObjectURL(value);
        }
        onChange(null);
        if (onFileChange) onFileChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [value, onChange, onFileChange]);

    const handleChangeClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {!value ? (
                <label
                    className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-primary/30 transition-all cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Upload size={28} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 font-medium">{placeholder}</p>
                    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                        disabled={disabled}
                    />
                </label>
            ) : (
                <div className={`relative border border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:border-primary/20 transition-all ${disabled ? 'opacity-50' : ''}`}>
                    <div className={`flex ${imageMode === 'vertical' ? 'flex-col' : 'items-center'} gap-4`}>
                        <div
                            className={`${previewClassName} rounded-lg overflow-hidden bg-gray-50 shrink-0 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all shadow-inner`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onPreviewClick && value) {
                                    onPreviewClick(value);
                                } else if (!onPreviewClick) {
                                    handleChangeClick();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <img src={value} alt="Preview" className={`w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{fileName || 'Image Selected'}</p>
                            <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider font-semibold">
                                {isConverting ? (
                                    <span className="text-primary animate-pulse flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        Optimizing...
                                    </span>
                                ) : (
                                    <span>{fileDetails || 'Ready for upload'}</span>
                                )}
                            </div>
                        </div>

                        <div className={`flex items-center gap-2 ${imageMode === 'vertical' ? 'w-full pt-3 border-t border-gray-50 justify-end' : ''}`}>
                            <button
                                type="button"
                                onClick={handleChangeClick}
                                disabled={disabled || isConverting}
                                className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-all border border-gray-200 shadow-sm disabled:opacity-50"
                            >
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={disabled || isConverting}
                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                                title="Remove image"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                        disabled={disabled}
                    />
                </div>
            )}

            <Modal
                isOpen={!!cropImageSource}
                onClose={cancelCrop}
                title="Crop & Edit Image"
                maxWidth="max-w-4xl"
                lightBackdrop
                noPadding
                skipAnimation
            >
                {cropImageSource && (
                    <ImageCropper
                        src={cropImageSource}
                        onCrop={handleCropComplete}
                        onCancel={cancelCrop}
                        forcedAspectRatio={aspectRatio}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ImageUploadField;
