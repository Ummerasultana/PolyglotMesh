import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  // Store separate code for each language
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

  // Get code for the currently selected language
  const code = codes[language];

  // Update only the selected language's code
  const handleCodeChange = (newCode) => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: newCode
    }));
  };

  // Change language without losing previous code
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setOutput("");
    setStatus("Ready");
  };

  // Temporary Run button
  const handleRun = () => {
    setStatus("Frontend ready");
    setOutput(
      "Frontend is working!\nBackend connection will be added later."
    );
  };

  // Clear only the current language's editor
  const handleClear = () => {
    setCodes((previousCodes) => ({
      ...previousCodes,
      [language]: ""
    }));

    setOutput("");
    setStatus("Ready");
  };

  const languages = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>PolyglotMesh</h1>
        <p>Multi-Language Runtime Sandbox</p>
      </header>

      <main className="dashboard">
        <div className="toolbar">
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

          <div className="actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>

            <button className="run-btn" onClick={handleRun}>
              ▶ Run
            </button>
          </div>
        </div>

        <h3>Code Editor - {language}</h3>

        <CodeEditor
          language={language}
          code={code}
          setCode={handleCodeChange}
        />

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