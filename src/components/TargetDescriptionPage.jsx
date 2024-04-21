import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import RichTextEditorToolbar from './RichTextEditorToolbar'; // Import the RichTextEditorToolbar component
import FileUploadHandler from './FileUploadHandler'; // Import FileUploadHandler for handling file uploads

const TargetDescriptionPage = () => {
    const [editorState, setEditorState] = useState('');

    const onChangeEditorState = (value) => {
        setEditorState(value);
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div className="editor" style={{ height: '100%', width: '100%' }}>
                <ReactQuill 
                  theme="snow" 
                  value={editorState} 
                  onChange={onChangeEditorState} 
                  modules={{
                    toolbar: [
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
                      ['link', 'image', 'video'] // link and image, video
                    ]
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                  style={{ height: '100%', width: '100%' }}
                />
                <FileUploadHandler /> {/* Use FileUploadHandler for uploading files */}
            </div>
        </div>
    );
};

export default TargetDescriptionPage;