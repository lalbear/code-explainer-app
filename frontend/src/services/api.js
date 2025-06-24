const API_URL = import.meta.env.VITE_API_URL;

export const explainCode = async (code, language) => {
  const response = await fetch(`${API_URL}/explain`, {
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

  return response.json();
};
