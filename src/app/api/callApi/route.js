// app/api/chat/route.js
import axios from "axios";
import { NextResponse } from "next/server";
import { AxiosApiCall } from "@/helper/AxiosApicallMethod";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        console.log("Prompt:", prompt);


        const aiResponse = await AxiosApiCall(prompt)
        console.log(aiResponse)
        return NextResponse.json({
            result: aiResponse || "No content"
        });

    } catch (error) {
        console.error("Groq API error:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
