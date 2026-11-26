# PolyglotMesh
### GraalVM Multi-Language Runtime Sandbox

## About the Project

PolyglotMesh is a web-based coding platform designed to provide a single environment for working with multiple programming languages. It aims to make coding easier by allowing users to select a language, write code and execute programs through an interactive dashboard.

The project uses a modern frontend and a backend powered by GraalVM Polyglot API to support multi-language code execution.

## Features

- Multi-language coding interface.
- Python, JavaScript and Java language tabs.
- Monaco Editor for code editing.
- Separate code storage for different languages.
- Save and Load code functionality.
- Live line and character counter.
- Output console for displaying messages.
- Clear editor functionality.
- Clear output functionality.
- Keyboard shortcuts for quick actions.
- Responsive dashboard design.

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Monaco Editor

### Backend
- Java
- Spring Boot
- GraalVM Polyglot API
- Spring WebFlux

### Database
- MongoDB / Mock Database

## Project Structure

```text
PolyglotMesh/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   └── OutputConsole.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

## Frontend Setup and Installation

### 1. Clone the Repository

Clone the project repository to your local system.

### 2. Navigate to the Frontend Folder

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the localhost URL displayed in your terminal to access the PolyglotMesh dashboard.

## How to Use the Dashboard

1. Open the PolyglotMesh dashboard.
2. Select a programming language from the available tabs.
3. Write or edit code in the Monaco Editor.
4. Use the Run button to validate the code input.
5. Use Save Code to save your code in the browser.
6. Use Load Code to retrieve previously saved code.
7. Use Clear to remove code from the editor.
8. View messages in the Output Console.
9. Use keyboard shortcuts for faster operations.

## Keyboard Shortcuts

| Shortcut | Function |
|---|---|
| Ctrl + Enter | Run |
| Ctrl + S | Save Code |
| Ctrl + Shift + L | Load Code |

## My Contribution – Frontend Development

I am responsible for the frontend development of PolyglotMesh. My contribution includes:

- Developing the main dashboard using React and Vite.
- Integrating Monaco Editor for code editing.
- Creating language tabs for Python, JavaScript and Java.
- Implementing separate code storage for different languages.
- Adding Save and Load functionality.
- Implementing live line and character counters.
- Developing Run and Clear buttons.
- Designing the Output Console.
- Implementing keyboard shortcuts.
- Improving the UI design and responsive layout.
- Preparing the frontend for backend integration.

## Project Objective

The objective of PolyglotMesh is to create an interactive multi-language coding environment where users can work with different programming languages from a single platform. The project aims to combine ease of use, efficient code management and secure code execution.

## Current Project Status

The frontend dashboard is under development. The editor, language switching, code saving and loading, code statistics, output messages and UI improvements have been implemented. Actual code execution through the backend API is planned as part of the integration phase.

---

### PolyglotMesh
*One Platform, Multiple Languages.*