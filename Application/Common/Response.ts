
export default class Response {

    public Status: number
    public Message: string

    public static responed(message: string, statusCode = 500): Response {
        let res = new Response();
        res.Message = message;
        res.Status = statusCode;
        return res;
    }

    public static Succeded(message: string): Response {
        return this.responed(message, 200);
    }

    public static NotFound(message: string): Response {
        return this.responed(message, 400);
    }

}