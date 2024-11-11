// src/lib/errors/CustomError.ts
export class CustomError extends Error {
    public statusCode: number;
    public data: any;

    constructor(message: string, statusCode: number, data: any) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
