import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the rich text editor

// Define a custom Blot for inserting pictures and diagrams
var BlockEmbed = Quill.import('blots/block/embed');
class InsertBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('src', value.url);
    node.setAttribute('alt', value.alt || 'Inserted Image');
    node.setAttribute('class', 'inserted-image');
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
      alt: node.getAttribute('alt'),
    };
  }
}
InsertBlot.blotName = 'insert';
InsertBlot.tagName = 'img';
Quill.register(InsertBlot);

// Define the toolbar options for the rich text editor
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'], // remove formatting button
  ['link', 'image', 'video'], // link and image, video
  ['insert'], // Custom button for inserting pictures and diagrams
];

const RichTextEditorToolbar = ({ value, onChange }) => {
  return (
    <ReactQuill 
      theme="snow" 
      value={value} 
      onChange={onChange} 
      modules={{ toolbar: toolbarOptions }}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'insert' // Ensure 'insert' is recognized as a valid format
      ]}
      style={{ height: '100%', width: '100%' }} // Set the editor to span the full width and height of its container
    />
  );
};

export default RichTextEditorToolbar;