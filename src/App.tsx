function App() {
    const onClick = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // TODO: Scrape email content from the page
        chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: () => {
                alert('Hello, world!');
            }
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
        </>
    );
}

export default App;
