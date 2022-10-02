import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const HtmlEditor = ({ name, value, onChange, disabled }) => {
    const changeHandler = (data) => {
        console.log(data);
        onChange({ target: { name: name, value: data } });
    };
    return (
        <>
            <Editor
                value={value}
                disabled={disabled}
                onEditorChange={changeHandler}
                tinymceScriptSrc={process.env.PUBLIC_URL + "/js/tinymce/tinymce.min.js"}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                    toolbar:
                        "undo redo | code fullscreen | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </>
    );
};

export default HtmlEditor;
