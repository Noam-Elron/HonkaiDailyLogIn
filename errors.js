class HttpException extends Error {
    constructor(err_code)
    {
        super("HTTP Error: " + err_code);
        this.name = "HTTPException";
    }

}

export {HttpException};