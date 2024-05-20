class CustomError extends Error {
    constructor(message, statusCode, infoType, additionalInfo = {}) {
        super(message);
        this.statusCode = statusCode;
        this.infoType = infoType;
        this.additionalInfo = additionalInfo;
    }
}

module.exports = {
    CustomError
};
