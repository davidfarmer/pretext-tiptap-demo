import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Focus from '@tiptap/extension-focus'
import Term from './extensions/Term'
import Title from './extensions/Title'
import Definition from './extensions/Definition'
import React from 'react'
import './styles.scss'


const MenuBar = () => {
    const { editor } = useCurrentEditor()
  
    if (!editor) {
      return null
    }
  
    return (
      <>
        <button 
          onClick={() => editor.chain().focus().toggleTerm().run()}
          disabled={!editor.can().chain().focus().toggleTerm().run()}
          className={editor.isActive('term') ? 'is-active' : ''}
          >
        term</button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          emphasis
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTitle().run()}
          disabled={!editor.can().chain().focus().toggleTitle().run()}
        >
          Title
        </button>
 
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleDefinition().run()}
          className={editor.isActive('definition') ? 'is-active' : ''}
        >
          Definition
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          purple
        </button>
      </>
    )
  }
  
  const extensions = [
    Term,
    Title,
    Definition,
    Focus,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]
  
  const content = `
  <h1>
    Hi there,
  </h1>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
  `

  
  const EditorJSONPreview = () => {
    const { editor } = useCurrentEditor()
  
    return (
      <details>
        <summary>Inspect JSON</summary>
      <pre>
        {JSON.stringify(editor.getJSON(), null, 2)}
      </pre>
      </details>
    )
  }

  const EditorHTMLPreview = () => {
    const { editor } = useCurrentEditor()
  
    return (
      <details>
        <summary>Inspect HTML</summary>
        <pre>
          {editor.getHTML()}
        </pre>
      </details>
    )
  }
  
 const Tiptap = () => {
      return (
          <EditorProvider 
            slotBefore={<MenuBar />} 
            slotAfter={
              <>
              <EditorHTMLPreview/> 
              <EditorJSONPreview/>
              </>
            } 
            extensions={extensions} content={content}
          />
          )
    }
        
export default Tiptap;