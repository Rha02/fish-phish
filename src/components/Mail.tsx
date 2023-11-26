interface MailProps {
    score: number;
    description: string;
}

const Mail: React.FC<MailProps> = ({score, description}) => {
    let scoreBG = "";

    if(score <= 20) {
        scoreBG = "bg-[#00FF00]"; // Green
    } else if(score > 20 && score <= 40) {
        scoreBG = "bg-[#FFFF00]"; // Yellow
    } else if(score > 40 && score <= 60) {
        scoreBG = "bg-[#FFA500]"; // Orange
    } else {
        scoreBG = "bg-[#FF0000]"; // Red
    }

    return (
        <div className="h-[300px] w-full overflow-auto flex flex-col p-2"> 
            {/* Score Container */}
            <div className="h-fit w-full flex flex-row items-center justify-between">
                {/* Score Header */}
                <div className="h-full w-auto flex flex-col items-center justify-center pr-2">
                    <p className="font-bold text-blue-800 text-base">
                        Level of Danger:
                    </p>
                    <p className="font-bold text-base">
                        {score}
                    </p>
                </div>

                {/* Score Scale */}
                <div className="h-full w-full flex flex-1 items-center justify-center">
                    <span className="font-medium text-[#00FF00] text-base pr-1">
                        {`0`}
                    </span>

                    {/* Colored Rectangle */}
                    <div className="h-1/2 w-auto flex flex-1 border-[2px] border-black">
                        <div className={`${scoreBG} h-full w-full`} style={{ width: `${score}%` }} />
                    </div>

                    <span className="font-medium text-[#FF0000] text-base pl-1">
                        {`100`}
                    </span>
                </div>
            </div>

            {/* Scoring Scale Container */}
            <div className="flex py-3">
                <p className="font-normal text-xs">
                    Note: The scoring scale ranges from 0 to 100, where 0 represents minimal likelihood and 100 represents maximum risk of phishing.
                </p>
            </div>
            
            {/* Description Container */}
            <div className="flex flex-1">
                <p className="font-medium text-sm">
                    <span className="font-bold text-blue-800 text-base">
                        Description: 
                    </span>
                    {` ${description}`}
                </p>
            </div>
        </div>
    );
};

export default Mail;