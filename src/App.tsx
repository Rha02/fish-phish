import React from "react";
import NewGPTRepo from "./mail_scanner_repo/gpt_repo";
import { MailPayload, MailScannerRepository, MailScannerResponse } from "./mail_scanner_repo/repository";

function App() {
    const [ mailScanResponse, setMailScanResponse ] = React.useState<MailScannerResponse | null>(null);

    chrome.runtime.onMessage.addListener(async (message: MailPayload) => {
        const res = await mailScanner.scan(message);
        setMailScanResponse(res);
    });

    const mailScanner: MailScannerRepository = NewGPTRepo();

    const onClick = async () => {
        const [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Scrape the page
        chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: () => {
                const data: MailPayload = {
                    from: "FROM",
                    subject: "SUBJECT",
                    body: "BODY",
                    links: ["LINK1", "LINK2"]
                };
                chrome.runtime.sendMessage(data);
            },
        });
    };

    return (
        <>
            <h1>FishPhish</h1>
            <div className="">
                <button onClick={onClick}>
                    My Button
                </button>
            </div>
            <div>
                { mailScanResponse &&
                    <p>
                        Score: {mailScanResponse.score}
                        <br />
                        Description: {mailScanResponse.description}
                    </p>
                }
            </div>
        </>
    );
}

export default App;
