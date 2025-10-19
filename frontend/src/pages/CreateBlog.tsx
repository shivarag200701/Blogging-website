import EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useState, useRef, useEffect } from "react";

const CreateBlog = () => {
  const [data, setData] = useState<OutputData | null>(null);
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      console.log("hi");

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        onChange: (api, event) => {
          console.log("Now I know that Editor's content changed!", event);
        },
        placeholder: "Let`s write an awesome story!",
      });

      editorInstance.current = editor;
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
      }
      editorInstance.current = null;
    };
  }, []);

  const handleSave = async () => {
    console.log("called");
    console.log(editorInstance.current);

    if (editorInstance.current) {
      try {
        console.log("oiside");

        const outputData = await editorInstance.current.save();
        setData(outputData);
        console.log("Saved data:", outputData);
      } catch (error) {
        console.error("Saving failed:", error);
      }
    }
  };
  return (
    <div>
      <h1>Create a new Blog post</h1>
      <div id="editorjs">
        <button onClick={handleSave}>Save</button>
        {/* {data && (
          <pre>
            present
            {JSON.stringify(data, null, 2)}
          </pre>
        )} */}
      </div>
    </div>
  );
};

export default CreateBlog;
