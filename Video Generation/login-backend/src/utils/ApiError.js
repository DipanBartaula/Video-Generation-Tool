class ApiError  {
    constructor(statusCode, message = "Something went wrong", errors = []) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
    }
}

export { ApiError };
