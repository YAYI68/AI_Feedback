export function parseLLMJson(raw: string): any {
  try {
    // remove Markdown code fences like ```json ... ```
    const cleaned = raw
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Failed to parse JSON from LLM output: ${err.message}`);
  }
}