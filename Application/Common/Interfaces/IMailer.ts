import Response from "../Response";

export default interface IMailer {
    send(from: string, to: string, subject: string, body: string): Promise<Response>
}