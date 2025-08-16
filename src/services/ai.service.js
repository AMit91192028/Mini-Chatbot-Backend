const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function genrateResponse(chatHistory) {
    let latestText = chatHistory.at(-1)?.parts[0]?.text;
    if (!latestText) {
        return "Sorry, I didn’t get that.";
    }

    latestText = latestText.trim().toLowerCase();

    if (latestText.includes("pushpa")) {
        return "Pushpa? She’s the love story Amit never wants to end ❤️";
    } 
    else if (latestText.includes("create") || latestText.includes("made you") || latestText.includes("who build")) {
        return "Amit Yadav";
    } 
    else {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: chatHistory,
        });
        return response.text();
    }
}

module.exports = genrateResponse;
