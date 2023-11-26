import { MailPayload, MailScannerRepository } from "./repository";

const NewGPTRepo = (): MailScannerRepository => {
    return {
        scan: async (payload: MailPayload) => {
            return {
                score: 100,
                description: payload.body   
            };
        }
    };
};

export default NewGPTRepo;