import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

// Helper component for Toolbar Buttons
const ToolbarButton = ({ onClick, isActive, children, tooltip }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md transition-all ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "bg-transparent text-gray-600 hover:bg-gray-100"
    }`}
    title={tooltip}
  >
    {children}
  </button>
);

const Jobditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Describe the role, responsibilities, and benefits...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // Sending HTML to the backend is usually easier for Job Posts
      onChange(editor.getJSON());
    },
    // This allows the editor to look like a real document
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none p-4",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full border rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
      {/* Interactive Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-300">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          tooltip="Undo"
        >
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          tooltip="Redo"
        >
          <Redo size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" /> {/* Divider */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          tooltip="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          tooltip="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote size={18} />
        </ToolbarButton>
      </div>

      {/* Editor Surface */}
      <div className="cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Jobditor;
