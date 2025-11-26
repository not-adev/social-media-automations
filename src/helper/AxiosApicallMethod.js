import axios from "axios";
export const AxiosApiCall = async (prompt) => {
    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama-3.1-8b-instant",        // Use this instead of the old llama3-8b-8192
            messages: [{ role: "user", content: prompt }]
        },
        {
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );


    return response.data.choices?.[0]?.message?.content || "No content"
}