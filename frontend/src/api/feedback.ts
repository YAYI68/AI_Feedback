type FeedbackAnalysis = {
  id: number;
  rawText: string;
  customerName: string;
  productMentioned: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  summary: string;
  createdAt: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const analyzeText = async (text: string): Promise<FeedbackAnalysis> => {
  const res = await fetch(`${BASE_URL}/api/v1/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rawText: text }),
  });
  if (!res.ok) throw new Error("Failed to analyze feedback");
  return res.json();
};
