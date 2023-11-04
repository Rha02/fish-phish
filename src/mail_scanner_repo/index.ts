import NewGPTRepo from "./gpt_repo";
import { MailScannerRepository, MailPayload, MailScannerResponse } from "./repository";

const mailScannerRepo = NewGPTRepo();

export { mailScannerRepo };    
export type { MailScannerRepository, MailPayload, MailScannerResponse };

