

import {MailScannerRepository, MailScannerResponse} from "./repository";

const NewGPTRepo = (): MailScannerRepository => {
    return {
        scan: async (): Promise<MailScannerResponse> => {
            const makeAPIRequest = async () => {
                const API_KEY = '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';
                const prompt = "JUST give me answer and follow given format\n" +
                    "I will give you an email and \n" +
                    "1) you should rate it how suspicious it is and rate it from 0 to 100.\n" +
                    "2) you should give all suspicious wordings or clauses, suspicious links and emails anyword which is suspicious\n" +
                    " You response must me in JSON format like this\n" +
                    "Example:\n" +
                    "  {\n" +
                    "     score: 90,\n" +
                    "     description: {\"fake_problem\",\" suspicious link\" , \"some_kind_of_threat\",\"suspicious company name\",\"just add anything which is suspicious\",\"you can add multiple if there is alot\"}\n" +
                    "  }\n" +
                    "\n" +
                    "Dont forget to make sure your answer is only JSON format and nothing else. Here is an email:\n" +
                    "Email: google-search@searcher.com\n" +
                    "Subject: Urgent: Account Security Alert\n" +
                    "\n" +
                    "Dear Customer,\n" +
                    "\n" +
                    "We have detected suspicious activity on your account. Your account security is our top priority, and we need your immediate attention to resolve this issue.\n" +
                    "\n" +
                    "Please click on the following link to verify your account details and secure your account:\n" +
                    " www.google-search.com.\n" +
                    "\n" +
                    "If you do not verify your account within the next 24 hours, we will have to temporarily suspend your account.\n" +
                    "\n" +
                    "Thank you for your prompt attention to this matter.\n" +
                    "\n" +
                    "Sincerely,\n" +
                    "Google";
                const max_tokens = 1000; // Adjust this as needed
                const model = "text-davinci-002"; // Specify the model here

                try {
                    const response = await fetch("https://api.openai.com/v1/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${API_KEY}`
                        },
                        body: JSON.stringify({
                            prompt,
                            max_tokens,
                            model // Include the model parameter
                        })
                    });

                    const data = await response.json();
                    console.log("API Response:", data);

                    if (data.choices && data.choices.length > 0) {
                        return data.choices[0].text;
                    } else {
                        throw new Error("No choices in API response");
                    }
                } catch (error) {
                    console.error("API Error:", error);
                    throw new Error("API Request Failed");
                }
            };

            try {
                const apiResponse = await makeAPIRequest();

                // Modify the return statement as needed
                return apiResponse;
            } catch (error) {
                // Handle errors or return a default response
                console.error("Error in API request:", error);
                return {
                    score: 0,
                    description: "Error in API request"
                };
            }
        }
    };
};

export default NewGPTRepo;

