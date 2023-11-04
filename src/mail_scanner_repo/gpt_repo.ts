import MailScannerRepository from "./repository";

const NewGPTRepo = (): MailScannerRepository => {
    return {
        scan: async (payload) => {
            console.log(payload);
            return {
                score: 0.5,
                description: payload.body
            };
        }
    };
};

export default NewGPTRepo;