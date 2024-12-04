// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MonacoEditor } from "@monaco-editor/react";

// function Dummy() {
//   const languageDetails = useSelector((state) => state.languageChanged || {});
//   const { error, loading, languagescript = { variants: [] } } = languageDetails;

//   return (
//     <div>
//       {languagescript && Object.keys(languagescript).length > 0 ? (
//         <div>
//           <h3>Language Script Details:</h3>
//           <pre>{JSON.stringify(languagescript, null, 2)}</pre>
//         </div>
//       ) : (
//         <div>No language script available.</div>
//       )}
//     </div>
//   );
// }

// export default Dummy;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Editor from '@monaco-editor/react';
// import axios from "axios";

// const CodeEditor = () => {
//   const [code, setCode] = useState(""); // State to store the code in editor
//   const [output, setOutput] = useState(""); // State to store output after code execution
//   const [language, setLanguage] = useState("JavaScript");
//   // Fetching language details from Redux state
//   const languageDetails = useSelector((state) => state.languageChanged || {});
//   const { error, loading, languagescript = { variants: [] } } = languageDetails;

//   // Handle editor mount
//   const handleEditorMount = (editor, monaco) => {
    
//     if (!monaco) {
//         console.error('Monaco editor failed to mount');
//         return;
//       }
//       // Set the language for the editor model
//       const model = monaco.editor.createModel(code, "python");
//       editor.setModel(model);
//     console.log("Editor is mounted!", editor, monaco);
//   };

//   // Handle code change
//   const handleEditorChange = (value) => {
//     setCode(value);
//   };

//   // Simulate compilation (or send to backend API)
//   const compileCode = () => {
//     // Example: Simulate compilation output
//     // const { data } = axios.post("/")
//     // const {data} = axios.get("/dsds/")
//     setOutput(`Output of the code: ${code.length} characters`);
//   };

//   // Set initial code when languagescript data changes
//   useEffect(() => {
//     if (languagescript) {
//         console.log(languagescript)
//       setCode(languagescript.default_syntax); 
//       setLanguage(languagescript.language) // Set languagescript as initial code
//     }
//   }, [languagescript]);

//   return (
//     <div>
//       <div
//         style={{
//           height: "400px",
//           border: "1px solid #ccc",
//           marginBottom: "20px",
//         }}
//       >
//         <Editor
//           height="400px"
//           defaultLanguage="Java" // Ensure this is valid or dynamically set
//           theme="vs-dark"
//           language={language.toLowerCase()}
//           value={code}
//           onChange={handleEditorChange}
//           onMount={handleEditorMount}
//           options={{
//             selectOnLineNumbers: true,
//             minimap: { enabled: false },
//             automaticLayout: true,
//           }}
//         />
//       </div>

//       {/* Buttons */}
//       <button onClick={compileCode} style={{ marginRight: "10px" }}>
//         Run Code
//       </button>

//       {/* Output */}
//       <div>
//         <h3>Output:</h3>
//         <pre>{output || "No output yet."}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState(""); // State to store the code in editor
  const [output, setOutput] = useState(""); // State to store output after code execution
  const [language, setLanguage] = useState("C++");
  const [socket, setSocket] = useState(null);

  // Fetching language details from Redux state
  const languageDetails = useSelector((state) => state.languageChanged || {});
  const { error, loading, languagescript = { variants: [] } } = languageDetails;

  useEffect(() => {
    // Set initial code when languagescript data changes
    if (languagescript) {
      setCode(languagescript.default_syntax);
      setLanguage(languagescript.language); // Set languagescript as initial code
    }
  }, [languagescript]);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://localhost:8000/ws/compiler/");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "progress" || data.status === "success") {
        setOutput((prevOutput) => prevOutput + data.output);
      } else if (data.status === "error") {
        setOutput(`Error: ${data.output}`);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const compileCode = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          code,
          language,
          input: "", // Add user input handling here
        })
      );
      setOutput("Compiling...\n");
    }
  };

  return (
    <div>
      <div
        style={{
          height: "400px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <Editor
          height="400px"
          theme="vs-dark"
          language={language.toLowerCase()}
          value={code}
          onChange={handleEditorChange}
          options={{
            selectOnLineNumbers: true,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {/* Buttons */}
      <button onClick={compileCode} style={{ marginRight: "10px" }}>
        Run Code
      </button>

      {/* Output */}
      <div>
        <h3>Output:</h3>
        <pre>{output || "No output yet."}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
