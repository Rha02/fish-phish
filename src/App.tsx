import React from "react";
import { mailScannerRepo, MailPayload, MailScannerResponse } from "./mail_scanner_repo";

function App() {
    const [ mailScanResponse, setMailScanResponse ] = React.useState<MailScannerResponse | null>(null);

    // Listen for messages from the chrome extension script
    chrome.runtime.onMessage.addListener(async (message: MailPayload) => {
        const res = await mailScannerRepo.scan(message);
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
        // Pop Up Caontainer 
        <div className="bg-white h-[400px] w-[300px] flex flex-col mx-0 my-0">
            {/* Title Container */}
            <div className="h-[50px] w-full flex border-b-[1px] border-b-gray-300">
                <p className="font-bold text-lg mx-auto my-auto">
                    FishPhish
                </p>
            </div>

            {/* Mail Scan Fraudulent Score */}
            {mailScanResponse ? (
                <div className="h-[300px] w-full overflow-auto flex flex-col"> 
                    <p>
                        Score: {mailScanResponse.score}
                    </p>
                    <p>
                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua. In ante metus dictum at tempor commodo ullamcorper a. Proin libero nunc consequat interdum varius 
                        sit amet mattis. Sit amet venenatis urna cursus eget nunc scelerisque viverra. At volutpat diam ut venenatis tellus in 
                        metus vulputate. Quis ipsum suspendisse ultrices gravida dictum fusce. Enim diam vulputate ut pharetra sit amet aliquam.
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
                        nullam non.
                    </p>
                </div>
            ) : (
                <div className="h-[300px] w-full flex flex-col justify-center items-center">
                    <div role="status">
                        <svg aria-hidden="true" className="h-28 w-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            {/* Button */}
            <div className="h-[50px] w-full flex justify-center border-t-[1px] border-t-gray-300">
                <button className="bg-white" onClick={onClick}>
                    My Button
                </button>
            </div>
        </div>
    );
}

export default App;
