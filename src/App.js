import React, { useState } from "react";
import axios from "axios";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  // Handle the upload of the PDF
  const uploadPdf = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await axios.post(
        "https://chat-with-pdf-be.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("PDF uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setErrorMessage("Error uploading PDF.");
    }
  };

  // Handle question submission
  const handleAskQuestion = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    try {
      const res = await axios.post(
        "https://chat-with-pdf-be.onrender.com/ask",
        { query }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error asking question:", error);
      setErrorMessage("Error asking question.");
    }
  };

  return (
    <div className="App">
      <h1>PDF Chatbot</h1>

      <div>
        <h2>Upload PDF</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button onClick={uploadPdf}>Upload PDF</button>
      </div>

      <div>
        <h2>Ask a Question Regarding PDF</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the PDF"
        />
        <button onClick={handleAskQuestion}>Ask</button>
      </div>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}

      {errorMessage && (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
