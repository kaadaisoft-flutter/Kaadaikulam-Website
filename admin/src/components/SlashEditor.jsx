import { useState, useEffect, useRef } from 'react';
import { Heading1, Heading2, Heading3, Image as ImageIcon, X, List, Quote, Bold, Italic, Link as LinkIcon, Underline } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const fileInputRef = useRef(null);

    // Initial content load
    useEffect(() => {
        if (editorRef.current && value && editorRef.current.innerHTML !== value) {
            if (editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<p><br></p>') {
                editorRef.current.innerHTML = value;
            }
        }
    }, []);

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
            // Ensure we use <p> tags for paragraphs
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

        // Remove the slash that triggered the menu
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
            const url = prompt("Enter Link URL:");
            if (url) document.execCommand('createLink', false, url);
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
                    document.execCommand('insertImage', false, url);
                    document.execCommand('insertHTML', false, '<p><br></p>');
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
                .slash-editor a { color: #800000; text-decoration: underline; text-underline-offset: 4px; }
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
