import { MailPayload, MailScannerRepository } from "./repository";

const NewGPTRepo = (token: string): MailScannerRepository => {
    const max_tokens = 1000;
    const model = "text-davinci-002";
    const url = "https://api.openai.com/v1/completions";
    const char_limit = 2000;

    let prompt = "JUST give me answer and follow given format\n" +
        "I will give you a JSON data of an email, with the following fields: \n" +
        "senderEmail: the email address of the sender\n" +
        "senderName: the name of the sender\n" +
        "subject: the subject of the email\n" +
        "body: the HTML body of the email\n" +
        "Your job is to return a JSON object with the following fields:\n" +
        "1) you should rate how suspicious it is from 0 to 100, 0 being not suspicious and 100 being suspicious.\n" +
        "2) you should give your reasoning behind why you gave it such score\n" +
        "Your response must be in JSON object with the following schema:\n" +
        "  {\n" +
        "     score: number,\n" +
        "     description: string\n" +
        "  }\n" +
        "\n" +
        "Dont forget to make sure your answer is only JSON format and nothing else. Here is the JSON of an email:\n";
    
    return {
        scan: async (payload: MailPayload) => {
            if (payload.body.length > char_limit) {
                throw new Error("Body too long");
            }

            prompt += JSON.stringify(payload);
            console.log(prompt);
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        prompt,
                        max_tokens,
                        model
                    })
                });
                console.log(res);
                const data = await res.json();
                console.log(data);
                return JSON.parse(data.choices[0].text);
            } catch (error) {
                console.error("API Error: " + error);
                throw error;        
            }
        }
    };
};

export default NewGPTRepo;