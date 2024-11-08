export declare class MailSender {
    private transporter;
    constructor();
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
