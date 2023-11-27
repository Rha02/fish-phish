import React from "react";
import { useEffect } from "react";
import { mailScannerRepo, MailPayload, MailScannerResponse } from "./mail_scanner_repo";
import { Mail, Loader, Error } from "./components";

function App() {
    const [ mailScanResponse, setMailScanResponse ] = React.useState<MailScannerResponse | null>(null);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);

    // 1 second loading delay
    const delay = 1000;

    // Handles the logic of displaying the loading compnent before the mail scan response component upon isLoading changes
    useEffect(() => {
        const fetchData = async () => {
            if(isLoading) {
                // Listen for messages from the chrome extension script
                chrome.runtime.onMessage.addListener(async (message: MailPayload) => {
                    try {
                        const res = await mailScannerRepo.scan(message);
                        setMailScanResponse(res);
                        setLoading(false);
                        setError(false);
                    } catch (error) {
                        setError(true);
                        setLoading(false);
                    }
                });
            }
        };

        fetchData();

    }, [isLoading]);
   
    // On button click, scrape the page and send data to listener
    const onClick = async () => {
        // Sets mail response to null
        setMailScanResponse(null);

        // Sets loading to true if the scan button is clicked
        setLoading(true);

        // Scrape the page after a timeout duration of "delay"
        setTimeout(async () => {
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
        }, delay);
    };

    return (
        // Pop Up Caontainer 
        <div className="bg-white h-fit w-[300px] flex flex-col mx-0 my-0">
            {/* Title Container */}
            <div className="bg-blue-700 h-[50px] w-full flex border-b-[1px] border-b-gray-300">
                <p className="font-bold text-white text-lg mx-auto my-auto">
                    FishPhish
                </p>
            </div>

            {/* Body */}
            {/* Loader */}
            {isLoading ? <Loader /> : null}

            {/* Mail Response */}
            {mailScanResponse ? <Mail score={mailScanResponse.score} description={mailScanResponse.description} /> : null}

            {/* Error component */}
            {!isLoading && !mailScanResponse && error ? <Error /> : null}

            {/* Empty Div */}
            {!isLoading && !mailScanResponse && !error ? (
                <div className="h-[150px] w-full flex items-center justify-center">
                    <p className="h-fit w-[150px] font-medium text-base text-center">
                        Click the button below to scan your email
                    </p>
                </div>
            ) : null}

            
            {/* Button */}
            <div className="h-[50px] w-full flex justify-center border-t-[1px] border-t-gray-300">
                <button className="bg-blue-700 font-bold text-white text-base h-full w-full" onClick={onClick}>
                    {isLoading ? "Scanning" : "Scan"}
                </button>
            </div>
        </div>
    );
}

export default App;
