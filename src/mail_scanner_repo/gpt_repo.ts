import { MailPayload, MailScannerRepository } from "./repository";

const NewGPTRepo = (): MailScannerRepository => {
    return {
        scan: async (payload: MailPayload) => {
            return {
                score: 0.5,
                description: payload.body   
            };
        }
    };
};

export default NewGPTRepo;