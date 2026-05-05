import React, { useRef, useState, useEffect } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { RotateCcw, RotateCw, Maximize, Minimize, Move, FlipHorizontal, FlipVertical, Check } from 'lucide-react';

const ImageCropper = ({ src, onCrop, onCancel, forcedAspectRatio }) => {
    const cropperRef = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(forcedAspectRatio || NaN);
    const [isReady, setIsReady] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        setIsReady(false);
    }, [src]);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper || isApplying) return;
        setIsApplying(true);
        cropper.getCroppedCanvas({
            imageSmoothingQuality: 'medium', // Faster than high
        }).toBlob((blob) => {
            if (blob) {
                onCrop(blob);
            }
            setIsApplying(false);
        }, 'image/webp', 0.85);
    };

    const rotate = (degree) => cropperRef.current?.cropper.rotate(degree);
    const zoom = (ratio) => cropperRef.current?.cropper.zoom(ratio);
    const flip = (direction) => {
        const cropper = cropperRef.current?.cropper;
        if (direction === 'h') {
            cropper.scaleX(-cropper.getData().scaleX || -1);
        } else {
            cropper.scaleY(-cropper.getData().scaleY || -1);
        }
    };
    const reset = () => {
        const initialRatio = forcedAspectRatio || NaN;
        setAspectRatio(initialRatio);
        cropperRef.current?.cropper.reset();
        cropperRef.current?.cropper.setAspectRatio(initialRatio);
    };

    const changeAspectRatio = (ratio) => {
        if (forcedAspectRatio) return; // Prevent changing if forced
        setAspectRatio(ratio);
        cropperRef.current?.cropper.setAspectRatio(ratio);
    };

    const RATIOS = [
        { label: 'Free', value: NaN, icon: Move },
        { label: '1:1', value: 1 },
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
    ];

    return (
        <div className="flex flex-col h-[75vh] bg-[#f8f9fa] overflow-hidden relative">
            {/* Top Toolbar */}
            <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200 flex flex-wrap items-center justify-center gap-2 z-20">
                <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Rotate</span>
                    <button type="button" onClick={() => rotate(-90)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Rotate left">
                        <RotateCcw size={18} />
                    </button>
                    <button type="button" onClick={() => rotate(90)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Rotate right">
                        <RotateCw size={18} />
                    </button>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Flip</span>
                    <button type="button" onClick={() => flip('h')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Flip horizontal">
                        <FlipHorizontal size={18} />
                    </button>
                    <button type="button" onClick={() => flip('v')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Flip vertical">
                        <FlipVertical size={18} />
                    </button>
                </div>
                
                {!forcedAspectRatio && (
                    <>
                        <div className="w-px h-6 bg-gray-200" />
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Ratio</span>
                            {RATIOS.map((r) => (
                                <button
                                    type="button"
                                    key={r.label}
                                    onClick={() => changeAspectRatio(r.value)}
                                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                        (isNaN(aspectRatio) && isNaN(r.value)) || aspectRatio === r.value
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'hover:bg-gray-100 border-transparent text-gray-600'
                                    }`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex items-center gap-1">
                    <button type="button" onClick={() => zoom(-0.1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Zoom out">
                        <Minimize size={18} />
                    </button>
                    <button type="button" onClick={() => zoom(0.1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Zoom in">
                        <Maximize size={18} />
                    </button>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <button type="button" onClick={reset} className="px-3 py-1.5 hover:bg-red-50 text-red-500 rounded-lg text-xs font-bold transition-colors">
                    RESET
                </button>
            </div>

            {/* Center - Image only */}
            <div className="flex-1 flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden min-h-0">
                {!isReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-30">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <p className="text-sm font-medium text-gray-400">Loading image...</p>
                            <p className="text-xs text-gray-500">Preparing crop editor</p>
                        </div>
                    </div>
                )}
                <div className="h-full w-full max-w-full max-h-full">
                    <Cropper
                        src={src}
                        className="h-full w-full"
                        aspectRatio={aspectRatio}
                        guides={true}
                        ref={cropperRef}
                        viewMode={1} 
                        dragMode="move"
                        autoCropArea={0.8} // Leaves 10% margin around the box
                        background={true}
                        responsive={false}
                        checkOrientation={false}
                        checkCrossOrigin={false}
                        ready={() => setIsReady(true)}
                        wheelZoomRatio={0.1}
                        minCropBoxWidth={10}
                        minCropBoxHeight={10}
                    />
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-4 shadow-sm z-30">
                <p className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide flex-1">SCROLL TO ZOOM · DRAG TO MOVE</p>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button type="button" onClick={onCancel} disabled={isApplying} className="px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Discard
                    </button>
                    <button type="button" onClick={handleCrop} disabled={isApplying} className="px-10 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
                        {isApplying ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Applying...
                            </>
                        ) : (
                            <>
                                <Check size={20} />
                                Apply Crop
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                .cropper-container { 
                    width: 100% !important; 
                    height: 100% !important; 
                    position: absolute !important; 
                    top: 0; 
                    left: 0; 
                }
                .cropper-bg { 
                    background-image: conic-gradient(#fcfcfc 90deg, #f5f5f5 90deg 180deg, #fcfcfc 180deg 270deg, #f5f5f5 270deg) !important; 
                    background-size: 16px 16px !important; 
                }
                .cropper-modal {
                    background-color: #000 !important;
                    opacity: 0.45 !important;
                }
                .cropper-view-box {
                    outline: 1px solid #C07B3F;
                    outline-color: rgba(192, 123, 63, 0.6);
                    box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.1); 
                }
                .cropper-line, .cropper-point {
                    background-color: #C07B3F;
                    opacity: 0.8;
                }
                .cropper-point.point-se {
                    width: 6px;
                    height: 6px;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default ImageCropper;
