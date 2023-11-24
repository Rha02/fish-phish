interface MailProps {
    score: number;
    description: string;
}

const Mail: React.FC<MailProps> = ({score, description}) => {
    return (
        <div className="h-[300px] w-full overflow-auto flex flex-col"> 
            <p className="">
                Score: {score}
            </p>
            <p className="">
                {description}
            </p>
        </div>
    );
};

export default Mail;