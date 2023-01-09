import IMailer from "../../Application/Common/Interfaces/IMailer";
import Response from "../../Application/Common/Response";
import nodemailer from "nodemailer";

export default class Mailer implements IMailer {

    private readonly Host: string;
    private readonly Port: number;
    private readonly Username: string;
    private readonly Password: string;
    private readonly Transporter: any;

    constructor(configuration: any) {
        
        this.Host = configuration.Host;
        this.Port = configuration.Port;
        this.Username = configuration.Username;
        this.Password = configuration.Password;
        
        this.Transporter = nodemailer.createTransport({
            host: configuration.Host,
            port: configuration.Port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: configuration.Username,
                pass: configuration.Password
            },
        });

    }

    send(from: string, to: string, subject: string, body: string): Promise<Response> {
        //todo: implement sender logic
        throw new Error("Method not implemented.");
    }

}