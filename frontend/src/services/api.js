const API_URL = import.meta.env.VITE_API_URL;

// === Explain Code ===
export const explainCode = async (code, language) => {
  try {
    const response = await fetch(`${API_URL}/api/explain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMessage = "Failed to get explanation";
      try {
        const errJson = JSON.parse(errText);
        errorMessage = errJson.error || errorMessage;
      } catch (e) {
        errorMessage = errText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      success: data.success || false,
      explanation: data.explanation || null,
    };
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error("NETWORK_ERROR: Unable to connect to the server. Please check if the backend is running on " + API_URL);
    }
    throw error;
  }
};

// === Visualize Code (returns image + explanation) ===
export const visualizeCode = async (code, language) => {
  try {
    const response = await fetch(`${API_URL}/api/visualize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMessage = "Failed to visualize code";
      try {
        const errJson = JSON.parse(errText);
        errorMessage = errJson.error || errorMessage;
      } catch (e) {
        errorMessage = errText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      success: data.success || false,
      image: data.image || null,
      explanation: data.explanation || null,
    };
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error("NETWORK_ERROR: Unable to connect to the server. Please check if the backend is running on " + API_URL);
    }
    throw error;
  }
};
