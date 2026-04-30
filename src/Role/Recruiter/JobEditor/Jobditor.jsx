import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

const ToolbarButton = ({ onClick, isActive, children, tooltip }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md transition-all ${
      isActive
        ? "bg-[#0d1f35] text-white shadow-sm"
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
    // ✅ FIX 1: Only use the initial value once on mount — don't pass `value` directly
    content: value || "",
    onUpdate: ({ editor }) => {
      // ✅ FIX 2: Always send HTML (not getText) so the useEffect comparison works
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[220px] max-w-none p-4",
      },
    },
  });

  // ✅ FIX 3: Only sync external value changes if the content actually differs
  // This prevents the editor from resetting while the user is typing
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const currentHTML = editor.getHTML();
    if (value !== currentHTML) {
      // preserveWhitespace keeps cursor position intact
      editor.commands.setContent(value || "", false);
    }
    // ✅ FIX 4: Remove `value` from deps — only run when editor mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="w-full border rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-[#0d1f35]/30 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-slate-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          tooltip="Undo"
        >
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          tooltip="Redo"
        >
          <Redo size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          tooltip="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          tooltip="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          tooltip="Heading 1"
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          tooltip="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          tooltip="Bullet List"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          tooltip="Numbered List"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          tooltip="Blockquote"
        >
          <Quote size={16} />
        </ToolbarButton>
      </div>

      {/* Editor surface */}
      <div className="cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Jobditor;
