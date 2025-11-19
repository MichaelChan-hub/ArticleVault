import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { ArticleContent, PDFGenerationOptions } from '@/types';

interface TipTapEditorProps {
  content: ArticleContent;
  pdfOptions: PDFGenerationOptions;
  onContentChange?: (content: string) => void;
  onPdfOptionsChange?: (options: PDFGenerationOptions) => void;
  editable?: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  pdfOptions,
  onContentChange,
  onPdfOptionsChange,
  editable = true
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        paragraph: {
          HTMLAttributes: {
            class: 'article-paragraph',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'article-heading',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'article-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'article-link',
        },
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: content.content,
    editable,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
  });

  // Toolbar component
  const Toolbar = () => {
    if (!editor || !editable) return null;

    return (
      <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
            }`}
            title="粗体"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 3a1 1 0 000 2h.5a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H6a1 1 0 100 2h4a1 1 0 100-2h-.5a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5H10a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
            }`}
            title="斜体"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 2a1 1 0 000 2h2v12H8a1 1 0 100 2h4a1 1 0 100-2h-2V4h2a1 1 0 100-2H8z" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
            }`}
            title="删除线"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <select
            value={editor.isActive('heading') ? `h${editor.getAttributes('heading').level}` : 'p'}
            onChange={(e) => {
              if (e.target.value === 'p') {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(e.target.value.replace('h', ''));
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="p">正文</option>
            <option value="h1">标题 1</option>
            <option value="h2">标题 2</option>
            <option value="h3">标题 3</option>
            <option value="h4">标题 4</option>
            <option value="h5">标题 5</option>
            <option value="h6">标题 6</option>
          </select>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
            }`}
            title="无序列表"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
            }`}
            title="有序列表"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
        </div>

        {/* Other */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="撤销"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="重做"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Toolbar />
      <div className="prose prose-lg max-w-none">
        <EditorContent
          editor={editor}
          className="min-h-[400px] p-6 focus:outline-none"
        />
      </div>

      {/* Editor styles */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          padding: 1.5rem;
          min-height: 400px;
        }

        .ProseMirror .article-paragraph {
          margin-bottom: 1rem;
          line-height: 1.6;
          text-align: justify;
        }

        .ProseMirror .article-heading {
          margin: 1.5rem 0 0.75rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .ProseMirror h1.article-heading {
          font-size: 2rem;
        }

        .ProseMirror h2.article-heading {
          font-size: 1.75rem;
        }

        .ProseMirror h3.article-heading {
          font-size: 1.5rem;
        }

        .ProseMirror h4.article-heading {
          font-size: 1.25rem;
        }

        .ProseMirror h5.article-heading {
          font-size: 1.125rem;
        }

        .ProseMirror h6.article-heading {
          font-size: 1rem;
        }

        .ProseMirror .article-image {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem auto;
          border-radius: 0.5rem;
        }

        .ProseMirror .article-link {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: #93c5fd;
          text-underline-offset: 2px;
        }

        .ProseMirror .article-link:hover {
          color: #1d4ed8;
          text-decoration-color: #60a5fa;
        }

        .ProseMirror blockquote {
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          border-left: 4px solid #e5e7eb;
          background-color: #f9fafb;
          font-style: italic;
        }

        .ProseMirror ul, .ProseMirror ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }

        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }

        .ProseMirror th, .ProseMirror td {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          text-align: left;
        }

        .ProseMirror th {
          background-color: #f9fafb;
          font-weight: 600;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .ProseMirror pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .ProseMirror pre code {
          background-color: transparent;
          padding: 0;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default TipTapEditor;