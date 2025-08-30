const API_URL = import.meta.env.VITE_API_URL;

// === Explain Code ===
export const explainCode = async (code, language) => {
  const response = await fetch(`${API_URL}/api/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to get explanation");
  }

  const data = await response.json();
  return {
    success: data.success || false,
    explanation: data.explanation || null,
  };
};

// === Visualize Code (returns image + explanation) ===
export const visualizeCode = async (code, language) => {
  const response = await fetch(`${API_URL}/api/visualize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to visualize code");
  }

  const data = await response.json();
  return {
    success: data.success || false,
    image: data.image || null,          // data:image/png;base64,...
    explanation: data.explanation || null, // text explanation
  };
};
