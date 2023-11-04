import mailScannerRepo from "./mail_scanner_repo";

function App() {
    const onClick = async () => {
        const res = await mailScannerRepo.scan({
            from: "FROM",
            subject: "SUBJECT",
            body: "BODY",
            links: ["links"]
        });

        alert(res);
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
