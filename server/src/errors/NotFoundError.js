const AppError = require("./AppError");

class NotFoundError extends AppError {
    constructor(message = "Resouce not found"){
        super(message, 404);
    }
}

module.exports = NotFoundError;