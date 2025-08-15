const {GoogleGenAI} = require("@google/genai")

const ai = new GoogleGenAI({});

async function genrateResponse(chatHistory){
    const latestText = chatHistory.at(-1)?.parts[0]?.text
    if(latestText.toLowerCase()==="who is pushpa"){
        return "Pushpa? She’s the love story Amit never wants to end ❤️"
    }
    else if(latestText.toLowerCase()==="who create you"){
        return "Amit Yadav"
}
    else{
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:chatHistory
    });
    console.log(response.text)
    return response.text;
}
}

module.exports = genrateResponse;