export class WrongCredentialsException extends Error {
    
}

export class NotUniqueException extends Error {
    constructor(readonly fields: string[], message?: string) {
        super(message);
    }
}

export class InvalidTokenException extends Error {
    
}

export class UserNotFoundException extends Error {
    constructor(readonly field: number | string) {
        super();
    }
}