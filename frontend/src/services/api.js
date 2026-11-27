const API_BASE_URL = "http://localhost:8080/api";

// Function to execute code through the backend
export const executeCode = async (language, code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: language,
        code: code
      })
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const result = await response.json();

    return result;

  } catch (error) {
    throw new Error(
      "Unable to connect to backend: " + error.message
    );
  }
};