import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  // Separate code storage for each language
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

  // RUN BUTTON WITH VALIDATION
  const handleRun = () => {

    // Remove previous output
    setOutput("");

    // Check whether code is empty
    if (!code.trim()) {
      setStatus("Validation Error");
      setOutput(
        "Error: No code found!\nPlease write some code before clicking Run."
      );
      return;
    }

    // Code is present
    setStatus("Ready to Execute");

    setOutput(
      "Your code has passed input validation!\n\n" +
      "Selected Language: " + language.toUpperCase() +
      "\nLines of Code: " + lineCount +
      "\nCharacters: " + characterCount +
      "\n\nWaiting for backend connection..."
    );
  };

  // CLEAR BUTTON
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
        language.toUpperCase() + " code saved successfully!"
      );
    } catch (error) {
      setStatus("Save Failed");
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
          language.toUpperCase() + " code loaded successfully!"
        );
      } else {
        setStatus("No Saved Code");
        setOutput(
          "No saved code found for " + language.toUpperCase() + "."
        );
      }
    } catch (error) {
      setStatus("Load Failed");
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