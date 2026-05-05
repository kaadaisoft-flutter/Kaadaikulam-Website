import { useState, useEffect, useRef } from 'react';
import { Heading1, Heading2, Heading3, Image as ImageIcon, X, List, Quote, Bold, Italic, Link as LinkIcon, Underline, ExternalLink, Mail, Phone, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LinkModal = ({ isOpen, onClose, onInsert, initialData }) => {
    const [linkData, setLinkData] = useState({ text: '', url: '', newTab: true });

    useEffect(() => {
        if (initialData) {
            setLinkData({
                text: initialData.text || '',
                url: initialData.url || '',
                newTab: initialData.newTab ?? true
            });
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleQuickAdd = (protocol) => {
        if (protocol === 'https://' && !linkData.url.startsWith('http')) {
            setLinkData({ ...linkData, url: 'https://' + linkData.url });
        } else if (protocol === 'Email') {
            setLinkData({ ...linkData, url: 'mailto:' + linkData.url });
        } else if (protocol === 'Phone') {
            setLinkData({ ...linkData, url: 'tel:' + linkData.url });
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-stone-100"
            >
                <div className="flex items-center justify-between p-6 border-b border-stone-50 bg-stone-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <LinkIcon size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-stone-900">Add Hyperlink</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Link Text (Optional)</label>
                        <input 
                            type="text"
                            value={linkData.text}
                            onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
                            placeholder="e.g. Visit our website"
                            className="w-full bg-stone-50 border-stone-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-stone-900 placeholder:text-stone-300"
                        />
                        <p className="text-[10px] text-stone-400 ml-1">Leave empty to use selected text</p>
                    </div>

                    <div className="space-y-2 text-stone-900">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">URL</label>
                        <div className="relative">
                            <input 
                                type="text"
                                value={linkData.url}
                                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                                placeholder="https://example.com"
                                className="w-full bg-stone-50 border-stone-100 rounded-2xl px-5 py-4 pr-12 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-stone-900 placeholder:text-stone-300"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300">
                                <ExternalLink size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Quick Add</label>
                        <div className="flex gap-2">
                            {[
                                { id: 'https://', label: 'https://', icon: ExternalLink },
                                { id: 'Email', label: 'Email', icon: Mail },
                                { id: 'Phone', label: 'Phone', icon: Phone }
                            ].map(btn => (
                                <button 
                                    key={btn.id}
                                    onClick={() => handleQuickAdd(btn.id)}
                                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-bold text-stone-600 transition-colors flex items-center gap-2"
                                >
                                    <btn.icon size={14} />
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <div className="relative">
                            <input 
                                type="checkbox"
                                checked={linkData.newTab}
                                onChange={(e) => setLinkData({ ...linkData, newTab: e.target.checked })}
                                className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-stone-200 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                            <CheckCircle size={14} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-bold text-stone-600 group-hover:text-stone-900 transition-colors">Open in new tab</span>
                    </label>
                </div>

                <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                    <button 
                        onClick={() => onInsert(null)} // Remove link logic
                        className="flex items-center gap-2 text-stone-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                        <Trash2 size={16} />
                        Remove Link
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-6 py-3 border border-stone-200 rounded-xl text-xs font-bold text-stone-500 hover:bg-white transition-all">
                            Cancel
                        </button>
                        <button 
                            onClick={() => onInsert(linkData)}
                            className="px-8 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
                        >
                            Insert Link
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CheckCircle = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const SlashMenu = ({ position, onSelect, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!position) return null;

    const items = [
        { id: 'h1', label: 'Heading 1', icon: Heading1, desc: 'Big section heading' },
        { id: 'h2', label: 'Heading 2', icon: Heading2, desc: 'Medium section heading' },
        { id: 'h3', label: 'Heading 3', icon: Heading3, desc: 'Small section heading' },
        { id: 'image', label: 'Image', icon: ImageIcon, desc: 'Upload an image' },
        { id: 'ul', label: 'Bullet List', icon: List, desc: 'Create a simple list' },
        { id: 'blockquote', label: 'Quote', icon: Quote, desc: 'Capture a quote' },
    ];

    return (
        <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bg-white shadow-2xl border border-gray-200 rounded-2xl overflow-hidden z-[100] w-72"
            style={{
                top: position.top + 24,
                left: position.left
            }}
        >
            <div className="text-[10px] font-bold text-gray-400 bg-gray-50/50 px-4 py-2 border-b border-gray-100 uppercase tracking-widest">
                Basic Blocks
            </div>
            <div className="py-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors group"
                    >
                        <div className="w-10 h-10 border border-gray-200 rounded-xl bg-white flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary/20 shadow-sm transition-all">
                            <item.icon size={18} />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                            <div className="text-[11px] text-gray-500 leading-tight">{item.desc}</div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

const FloatingToolbar = ({ position, onAction }) => {
    if (!position) return null;

    const items = [
        { id: 'bold', icon: Bold, label: 'Bold' },
        { id: 'italic', icon: Italic, label: 'Italic' },
        { id: 'underline', icon: Underline, label: 'Underline' },
        { id: 'h2', icon: Heading2, label: 'H2' },
        { id: 'link', icon: LinkIcon, label: 'Link' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bg-gray-900 shadow-xl rounded-xl overflow-hidden z-[100] flex items-center p-1.5 gap-0.5"
            style={{
                top: position.top - 55,
                left: position.left - 50
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => onAction(item.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title={item.label}
                >
                    <item.icon size={16} />
                </button>
            ))}
        </motion.div>
    );
};

const SlashEditor = ({ value, onChange, onImageUpload, placeholder = "Type '/' for commands..." }) => {
    const editorRef = useRef(null);
    const [menuState, setMenuState] = useState({ visible: false, position: null });
    const [toolbarState, setToolbarState] = useState({ visible: false, position: null });
    const [linkModal, setLinkModal] = useState({ isOpen: false, initialData: null });
    const fileInputRef = useRef(null);

    // Initial content load - only if editor is empty to avoid cursor jumps
    useEffect(() => {
        if (editorRef.current && value && (editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<p><br></p>')) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    // Selection detection logic for floating toolbar
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
                setToolbarState({ visible: false, position: null });
                return;
            }

            const range = selection.getRangeAt(0);
            
            // Check if selection is within editor
            if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
                const rect = range.getBoundingClientRect();
                setToolbarState({
                    visible: true,
                    position: { top: rect.top, left: rect.left + (rect.width / 2) }
                });
            } else {
                setToolbarState({ visible: false, position: null });
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html === '<p><br></p>' ? '' : html);
        }

        // Slash menu detection
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const textBeforeCaret = range.startContainer.textContent?.slice(0, range.startOffset) || '';
        
        if (textBeforeCaret.endsWith('/')) {
            const rect = range.getBoundingClientRect();
            setMenuState({
                visible: true,
                position: { top: rect.top, left: rect.left }
            });
        } else {
            if (menuState.visible) setMenuState({ visible: false, position: null });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            document.execCommand('defaultParagraphSeparator', false, 'p');
        }
        if (menuState.visible) {
            if (e.key === 'Escape' || e.key === ' ') {
                setMenuState({ visible: false, position: null });
            }
        }
    };

    const executeCommand = async (command) => {
        setMenuState({ visible: false, position: null });

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.setStart(range.startContainer, range.startOffset - 1);
            range.deleteContents();
        }

        if (command === 'h1') document.execCommand('formatBlock', false, 'h1');
        if (command === 'h2') document.execCommand('formatBlock', false, 'h2');
        if (command === 'h3') document.execCommand('formatBlock', false, 'h3');
        if (command === 'ul') document.execCommand('insertUnorderedList');
        if (command === 'blockquote') document.execCommand('formatBlock', false, 'blockquote');

        if (command === 'image') {
            fileInputRef.current?.click();
        }

        if (editorRef.current) {
            editorRef.current.focus();
            handleInput();
        }
    };

    const executeToolbarAction = (action) => {
        if (action === 'bold') document.execCommand('bold');
        if (action === 'italic') document.execCommand('italic');
        if (action === 'underline') document.execCommand('underline');
        if (action === 'h2') document.execCommand('formatBlock', false, 'h2');
        if (action === 'link') {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const container = range.commonAncestorContainer;
                const link = container.nodeType === 3 ? container.parentNode : container;
                
                if (link.tagName === 'A') {
                    setLinkModal({ 
                        isOpen: true, 
                        initialData: { text: link.innerText, url: link.href, newTab: link.target === '_blank' } 
                    });
                } else {
                    setLinkModal({ 
                        isOpen: true, 
                        initialData: { text: selection.toString(), url: '', newTab: true } 
                    });
                }
            }
        }
        handleInput();
    };

    const handleLinkInsert = (linkData) => {
        setLinkModal({ isOpen: false, initialData: null });
        if (!linkData) {
            document.execCommand('unlink');
        } else {
            const { text, url, newTab } = linkData;
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const html = `<a href="${url}" ${newTab ? 'target="_blank" rel="noopener noreferrer"' : ''} class="text-primary font-bold underline underline-offset-4">${text || selection.toString()}</a>`;
                document.execCommand('insertHTML', false, html);
            }
        }
        handleInput();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && onImageUpload) {
            try {
                const id = `upload-${Date.now()}`;
                document.execCommand('insertHTML', false, `<p id="${id}" class="text-gray-400 italic animate-pulse py-4 flex items-center gap-2"><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Uploading image...</p>`);
                
                const url = await onImageUpload(file);
                
                const placeholder = editorRef.current?.querySelector(`#${id}`);
                if (placeholder) {
                    placeholder.remove();
                }
                
                if (url) {
                    const altText = prompt("Enter Image Alt Text (SEO):", file.name.split('.')[0]);
                    const imgHtml = `<img src="${url}" alt="${altText || ''}" class="rounded-2xl shadow-lg my-8" />`;
                    document.execCommand('insertHTML', false, imgHtml + '<p><br></p>');
                }
                handleInput();
            } catch (err) {
                console.error("Upload failed", err);
                alert("Upload failed");
            }
        }
    };

    return (
        <div className="relative group/editor">
            <style>{`
                .slash-editor h1 { font-size: 2.5rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #111827; font-family: serif; }
                .slash-editor h2 { font-size: 1.875rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-family: serif; }
                .slash-editor h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151; font-family: serif; }
                .slash-editor p { margin-bottom: 1rem; line-height: 1.7; color: #4b5563; }
                .slash-editor img { max-width: 100%; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #f3f4f6; }
                .slash-editor ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .slash-editor blockquote { border-left: 4px solid #E5E7EB; padding-left: 1.5rem; font-style: italic; color: #6B7280; margin: 1.5rem 0; }
                .slash-editor a { color: #800000; text-decoration: underline; text-underline-offset: 4px; font-weight: 700; }
                .slash-editor:focus { outline: none; }
                .slash-editor[contenteditable]:empty:before {
                    content: attr(placeholder);
                    color: #D1D5DB;
                    pointer-events: none;
                    display: block;
                }
            `}</style>

            <div
                ref={editorRef}
                className="w-full min-h-[500px] p-0 text-lg text-gray-700 outline-none slash-editor max-w-none transition-all"
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />

            <AnimatePresence>
                {menuState.visible && (
                    <SlashMenu
                        position={menuState.position}
                        onSelect={executeCommand}
                        onClose={() => setMenuState({ visible: false, position: null })}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toolbarState.visible && (
                    <FloatingToolbar
                        position={toolbarState.position}
                        onAction={executeToolbarAction}
                    />
                )}
            </AnimatePresence>

            <LinkModal 
                isOpen={linkModal.isOpen}
                initialData={linkModal.initialData}
                onClose={() => setLinkModal({ isOpen: false, initialData: null })}
                onInsert={handleLinkInsert}
            />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default SlashEditor;
