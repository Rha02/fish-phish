import NewGPTRepo from "./gpt_repo";
import { MailScannerRepository, MailPayload, MailScannerResponse } from "./repository";
import config from "../config";

const mailScannerRepo = NewGPTRepo(config.GPT_API_KEY);

export { mailScannerRepo };    
export type { MailScannerRepository, MailPayload, MailScannerResponse };

