'use strict';
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'BaseException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}

export class AbstractClassException extends BaseException {
    constructor(className, fileName, lineNumber) {
        super(`Error: The class ${className} is abstract.`, fileName, lineNumber);
        this.className = className;
        this.name = "AbstractClassException";
    }
}

export class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("ERROR: " + param + " no puede estar vacio", fileName,
            lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

export class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("ERROR: El constructor no puede ser llamado como una función.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

export class InvalidValueException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: EL parámetro ${param} tiene un valor erróneo. Revísalo. (
        ${param}:${value})`, fileName, lineNumber);
        this.param = param;
        this.name = "InvalidValueException";
    }
}

export class InvalidRegexException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: EL parámetro ${param} no cumple con el formato marcado por la expresión regular. Revísalo. (
        ${param}:${value})`, fileName, lineNumber);
        this.param = param;
        this.name = "InvalidRegexException";
    }
}
export class valueIncludedException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("ERROR: " + param + " ya está incluida", fileName,
            lineNumber);
        this.param = param;
        this.name = "valueIncludedError";
    }
}

export class valueNotIncludedException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("ERROR: " + param + " no está incluida", fileName,
            lineNumber);
        this.param = param;
        this.name = "valueNotIncludedException";
    }
}

export class nullException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("ERROR: " + param + " es null. Revisalo", fileName,
            lineNumber);
        this.param = param;
        this.name = "valueIncludedError";
    }
}
export class InvalidTypeObjectException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`ERROR: El objeto pasado por parámetro ${param} no es el adecuado. Revisalo. Este debe ser de tipo: ${value}`, fileName, lineNumber);
        this.name = "InvalidInstanceException";
        this.param = param;
    }
}
