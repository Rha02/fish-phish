interface MailPayload {
    senderEmail: string;
    senderName: string;
    subject: string;
    body: string;
}

interface MailScannerResponse {
    score: number;
    description: string;
}

interface MailScannerRepository {
    /**
     * scan() takes the mail contents, assesses whether it is spam or not,
     * and returns a score and assessment description.
     * @param payload MailPayload
     */
    scan(payload: MailPayload): Promise<MailScannerResponse>;
}

export type { MailPayload, MailScannerResponse, MailScannerRepository};