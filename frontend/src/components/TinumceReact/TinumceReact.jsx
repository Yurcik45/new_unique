// import React from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// class TinumceReact extends React.Component {
//     handleEditorChange = (content, editor) => {
//         console.log("TINUMCE content: ", content);
//         // console.log("TINUMCE editor :", editor);
//     }


//     render() {

//         return (
//             <Editor
//                 outputFormat="html"
//                 scriptLoading={{
//                     async: true,
//                     defer: true,
//                     delay: 1000
//                 }}
//                 initialValue="<p>This is the initial content of the editor</p>"
//                 init={{
//                     min_height: 400,
//                     height: "100%",
//                     min_width: 200,
//                     width: "100%",
//                     max_width: "100%",
//                     menubar: true,
//                     plugins: [
//                         'advlist autolink lists link image charmap print preview anchor',
//                         'searchreplace visualblocks code fullscreen',
//                         'insertdatetime media table paste code help wordcount'
//                     ],
//                     toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
//                 }}

//                 onEditorChange={this.handleEditorChange}
//             />
//         )
//     }
// }

// export default TinumceReact

import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const TinumceReact = () => {

    const [editorState, setEditor] = useState()

    const handleEditorChange = (content, editor) => {
        setEditor({content, editor})
    }

    // console.log("EDITOR", editorState);



    return (
        <Editor
            outputFormat="html"
            scriptLoading={{
                async: true,
                defer: true,
                delay: 1000
            }}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                min_height: 400,
                height: "100%",
                min_width: 200,
                width: "100%",
                max_width: "100%",
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
            }}

            onEditorChange={handleEditorChange}
        />
    )
}

export default TinumceReact

