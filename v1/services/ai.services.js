import { Groq } from "groq-sdk";

export const generateReviewSummaryService = async (review) => {
  if (!process.env.GROQ_API_KEY)
    return {
      available: false,
      summary: "Esta funcionalidad no está disponible en este momento.",
    };

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Resume en una frase breve esta reseña de la película ${review.movieTitle}: ${review.description}`,
        },
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.5,
      max_completion_tokens: 150,
    });
    
    return {
      available: true,
      summary: completion.choices[0]?.message?.content || "",
    };
  } catch (e) {
    console.log("Error Groq:", e.message);
    
    return {
      available: false,
      summary: "El resumen con IA no está disponible en este momento.",
    };
  }
};

