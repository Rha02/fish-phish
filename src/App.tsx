import React from "react";
import { mailScannerRepo, MailPayload, MailScannerResponse } from "./mail_scanner_repo";

function App() {
    const [ mailScanResponse, setMailScanResponse ] = React.useState<MailScannerResponse | null>(null);
    const [ mailPayload, setMailPayload ] = React.useState<MailPayload | null>(null);

    // Listen for messages from the chrome extension script
    chrome.runtime.onMessage.addListener(async (message: MailPayload) => {
        const res = await mailScannerRepo.scan(message);
        setMailPayload(message);
        setMailScanResponse(res);
    });

    // On button click, scrape the page and send data to listener
    const onClick = async () => {
        // Scrape the page
        const [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: () => {
                const senderHTML = document.getElementsByClassName("gD")[0];
                const email = senderHTML.getAttribute("email");
                const name = senderHTML.getAttribute("name");

                const subjectHTML = document.getElementsByClassName("hP")[0];
                const subject = subjectHTML.innerHTML;

                const body = document.getElementsByClassName("a3s")[0].innerHTML;

                const data: MailPayload = {
                    senderEmail: email!,
                    senderName: name!,
                    subject: subject,
                    body: body
                };
                chrome.runtime.sendMessage(data);
            },
        });
    };

    return (
        <>
            <div className="">
                <h1>FishPhish</h1>
                <div className="">
                    <button className="bg-blue-500 text-white" onClick={onClick}>
                        My Button
                    </button>
                </div>
                <div>
                    {mailPayload &&
                        <p>
                            Sender Email: {mailPayload.senderEmail}
                            <br />
                            Sender Name: {mailPayload.senderName}
                            <br />
                            Subject: {mailPayload.subject}
                            <br />
                            Body: {mailPayload.body}
                        </p>
                    }
                </div>
                <div>
                    {mailScanResponse &&
                        <p>
                            Score: {mailScanResponse.score}
                            <br />
                            Description: {mailScanResponse.description}
                        </p>
                    }
                </div>
            </div>
        </>
    );
}

export default App;
