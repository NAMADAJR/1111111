import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Text Filter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          style={{ width: "100%", padding: "10px" }}
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Check Text
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <strong>Status:</strong>{" "}
          {result.status === "approved" ? "✅ Approved" : "🚫 Blocked"}
          {result.categories.length > 0 && (
            <p>
              <strong>Categories:</strong> {result.categories.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
