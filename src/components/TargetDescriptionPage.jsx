import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import RichTextEditorToolbar from './RichTextEditorToolbar'; // Import the RichTextEditorToolbar component

const TargetDescriptionPage = () => {
    const [editorState, setEditorState] = useState('');

    const onChangeEditorState = (value) => {
        setEditorState(value);
    };

    console.log("Rendering TargetDescriptionPage with Rich Text Editor");

    return (
        <div>
            <h1>Target Description</h1>
            <div className="editor">
                <RichTextEditorToolbar value={editorState} onChange={onChangeEditorState} />
            </div>
        </div>
    );
};

export default TargetDescriptionPage;