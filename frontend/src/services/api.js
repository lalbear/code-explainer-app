// src/services/api.js
export const explainCode = async (code, language) => {
  const response = await fetch("http://localhost:5050/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    const err = await response.text(); // capture the actual error message
    throw new Error(err || "Failed to get explanation");
  }

  return response.json();
};
