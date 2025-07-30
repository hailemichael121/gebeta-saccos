import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateResponse(prompt: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for Gebeta SACCOS, a financial cooperative in Ethiopia. Provide helpful, accurate information about SACCOS services, financial advice, and answer questions in a friendly, professional manner.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    })

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
  } catch (error) {
    console.error("Error generating response:", error)
    return "I'm sorry, I'm having trouble responding right now. Please try again later."
  }
}
