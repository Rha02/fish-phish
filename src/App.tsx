import React from "react";
import { useEffect } from "react";
import { mailScannerRepo, MailPayload, MailScannerResponse } from "./mail_scanner_repo";
import { Mail, Loader } from "./components";

function App() {
    const [ mailScanResponse, setMailScanResponse ] = React.useState<MailScannerResponse | null>(null);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    // 1 second loading delay
    const delay = 1000;

    // Handles the logic of displaying the loading compnent before the mail scan response component upon isLoading changes
    useEffect(() => {
        const fetchData = async () => {
            if(isLoading) {
                // Listen for messages from the chrome extension script
                chrome.runtime.onMessage.addListener(async (message: MailPayload) => {
                    const res = await mailScannerRepo.scan(message);
                    setMailScanResponse(res);
                    setLoading(false);
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

    const description = `Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante metus dictum at tempor commodo ullamcorper a. Proin libero nunc consequat interdum varius sit amet mattis. Sit amet venenatis urna cursus eget nunc scelerisque viverra. At volutpat diam ut venenatis tellus in metus vulputate. Quis ipsum suspendisse ultrices gravida dictum fusce. Enim diam vulputate ut pharetra sit amet aliquam.
    Feugiat sed lectus vestibulum mattis ullamcorper velit. Curabitur gravida arcu ac tortor dignissim convallis aenean et. 
    Dolor sit amet consectetur adipiscing elit. Tristique nulla aliquet enim tortor at. Eget mi proin sed libero. Etiam erat
    velit scelerisque in dictum non consectetur. Enim lobortis scelerisque fermentum dui. Neque ornare aenean euismod 
    elementum nisi quis. Quis lectus nulla at volutpat diam ut venenatis. Adipiscing diam donec adipiscing tristique risus 
    nec feugiat. Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Et sollicitudin ac orci phasellus. 
    Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Nunc sed blandit libero volutpat. Viverra ipsum nunc 
    aliquet bibendum enim facilisis gravida neque. Cursus mattis molestie a iaculis at erat. Hac habitasse platea dictumst 
    quisque. Enim ut sem viverra aliquet eget sit amet. Nunc consequat interdum varius sit amet mattis vulputate enim. Etiam 
    sit amet nisl purus in mollis nunc sed. Augue eget arcu dictum varius duis at consectetur. Mattis ullamcorper velit sed 
    ullamcorper morbi tincidunt ornare massa. Sed velit dignissim sodales ut eu sem. Rhoncus est pellentesque elit 
    ullamcorper. Rhoncus urna neque viverra justo nec ultrices dui sapien. Blandit aliquam etiam erat velit scelerisque. 
    Egestas pretium aenean pharetra magna ac. Vitae aliquet nec ullamcorper sit amet risus. Enim eu turpis egestas pretium 
    aenean pharetra. Sapien faucibus et molestie ac feugiat. A cras semper auctor neque. Platea dictumst vestibulum rhoncus 
    est. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Sed blandit libero volutpat sed cras ornare arcu dui.
    Volutpat sed cras ornare arcu dui vivamus arcu felis. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Viverra
    accumsan in nisl nisi. Eget aliquet nibh praesent tristique magna. Eu scelerisque felis imperdiet proin fermentum. Ac 
    ut consequat semper viverra nam libero justo laoreet. Auctor eu augue ut lectus arcu bibendum at. Parturient montes 
    nascetur ridiculus mus mauris vitae. Mauris cursus mattis molestie a iaculis at erat pellentesque. Dis parturient 
    montes nascetur ridiculus mus mauris vitae. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. In vitae 
    turpis massa sed elementum tempus egestas sed sed. Felis donec et odio pellentesque diam volutpat commodo. Tellus in 
    metus vulputate eu scelerisque. Tincidunt praesent semper feugiat nibh sed pulvinar. Semper eget duis at tellus at 
    urna condimentum mattis. Consectetur lorem donec massa sapien faucibus et. Justo donec enim diam vulputate ut pharetra 
    sit. Morbi leo urna molestie at elementum eu. Gravida in fermentum et sollicitudin ac. Id faucibus nisl tincidunt eget 
    nullam non.`;

    return (
        // Pop Up Caontainer 
        <div className="bg-white h-fit w-[300px] flex flex-col mx-0 my-0">
            {/* Title Container */}
            <div className="bg-white h-[50px] w-full flex border-b-[1px] border-b-gray-300">
                <p className="font-bold text-blue-800 text-lg mx-auto my-auto">
                    FishPhish
                </p>
            </div>

            {/* Body */}
            {/* Loader */}
            {isLoading ? <Loader /> : null}

            {/* Mail Response */}
            {mailScanResponse ? <Mail score={mailScanResponse.score} description={description} /> : null}

            {/* Empty Div */}
            {!isLoading && !mailScanResponse ? (
                <div className="h-[150px] w-full"></div>
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
