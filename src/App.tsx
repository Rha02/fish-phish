// App.tsx

import { useState } from "react";
import { MailScannerResponse } from "./mail_scanner_repo";
import NewGPTRepo from "./mail_scanner_repo/gpt_repo";

function App() {
    const [response, setResponse] = useState<MailScannerResponse | null>(null);

    const handleButtonClick = async () => {
        try {
            const apiResponse = await NewGPTRepo().scan();
            setResponse(apiResponse);
        } catch (error) {
            console.error("Error in API request:", error);
        }
    };

    return (
        <div className="">
            <button onClick={handleButtonClick}>Scan Email</button>

            {response && (
                <div>
                    <h2>API Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
