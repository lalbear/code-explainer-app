import React from "react";

export default function ExplanationBubble({ explanation, clearExplanation }) {
  console.log("ExplanationBubble rendered with:", explanation);
  
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      padding: "20px", 
      margin: "10px 0",
      backgroundColor: "#f9f9f9"
    }}>
      <h3>Explanation Component Loaded</h3>
      <p>{explanation || "No explanation provided"}</p>
      <button onClick={clearExplanation} style={{ marginTop: "10px" }}>
        Clear
      </button>
    </div>
  );
}