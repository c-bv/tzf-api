class ApiError extends Error {
    status: number;
    constructor(status: number, message: string, stack?: string) {
        super(message);
        this.status = status;
        stack ? (this.stack = stack) : Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
