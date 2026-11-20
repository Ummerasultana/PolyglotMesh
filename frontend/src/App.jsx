import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  // Separate code for each language
  const [codes, setCodes] = useState({
    python: 'print("Hello PolyglotMesh!")',

    javascript: 'console.log("Hello PolyglotMesh!");',

    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello PolyglotMesh!");
    }
}`
  });

  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");

  // Current language code
  const code = codes[language];

  // Code statistics
  const lineCount = code.split("\n").length;
  const characterCount = code.length;

  // Update editor code
  const handleCodeChange = (newCode) => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: newCode
    }));
  };

  // Change language
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setOutput("");
    setStatus("Ready");
  };

  // Run button (temporary until backend integration)
  const handleRun = () => {
    setStatus("Frontend ready");
    setOutput(
      "Frontend is working!\nBackend connection will be added later."
    );
  };

  // Clear current editor
  const handleClear = () => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: ""
    }));

    setOutput("");
    setStatus("Ready");
  };

  // SAVE CODE
  const handleSave = () => {
    try {
      const savedCodes = JSON.parse(
        localStorage.getItem("polyglotmesh_codes") || "{}"
      );

      savedCodes[language] = code;

      localStorage.setItem(
        "polyglotmesh_codes",
        JSON.stringify(savedCodes)
      );

      setStatus("Saved");
      setOutput(
        `${language.toUpperCase()} code saved successfully!`
      );
    } catch (error) {
      setStatus("Save failed");
      setOutput("Unable to save code: " + error.message);
    }
  };

  // LOAD CODE
  const handleLoad = () => {
    try {
      const savedCodes = JSON.parse(
        localStorage.getItem("polyglotmesh_codes") || "{}"
      );

      if (
        Object.prototype.hasOwnProperty.call(savedCodes, language) &&
        typeof savedCodes[language] === "string"
      ) {
        setCodes((previousCodes) => ({
          ...previousCodes,
          [language]: savedCodes[language]
        }));

        setStatus("Loaded");
        setOutput(
          `${language.toUpperCase()} code loaded successfully!`
        );
      } else {
        setStatus("No saved code");
        setOutput(
          `No saved ${language.toUpperCase()} code found.`
        );
      }
    } catch (error) {
      setStatus("Load failed");
      setOutput("Unable to load code: " + error.message);
    }
  };

  const languages = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" }
  ];

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>PolyglotMesh</h1>
        <p>Multi-Language Runtime Sandbox</p>
      </header>

      <main className="dashboard">

        {/* Toolbar */}
        <div className="toolbar">

          {/* Language Tabs */}
          <div className="language-tabs">
            {languages.map((item) => (
              <button
                key={item.value}
                className={language === item.value ? "active" : ""}
                onClick={() => handleLanguageChange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="actions">

            <button
              className="clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Code
            </button>

            <button
              className="load-btn"
              onClick={handleLoad}
            >
              Load Code
            </button>

            <button
              className="run-btn"
              onClick={handleRun}
            >
              ▶ Run
            </button>

          </div>
        </div>

        {/* Editor */}
        <h3>Code Editor - {language}</h3>

        <CodeEditor
          language={language}
          code={code}
          setCode={handleCodeChange}
        />

        {/* Code Statistics */}
        <div className="code-stats">
          <span>Language: {language}</span>
          <span>Lines: {lineCount}</span>
          <span>Characters: {characterCount}</span>
        </div>

        {/* Output Console */}
        <OutputConsole
          output={output}
          status={status}
        />

      </main>

      <footer>
        PolyglotMesh | Built with React and Monaco Editor
      </footer>

    </div>
  );
}

export default App;