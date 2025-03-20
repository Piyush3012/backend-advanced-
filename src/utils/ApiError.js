//this is the inheritance of the error class provided by nodejs to make the standaridize of the api error which we get

class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong ",
        errors=[],//this is list of the errors
        stack="",//this is the error stack

    ){
        super(message)
        this.statusCode = statusCode
        this.data=null//to be learned
        this.message=message
        this.success=false;
        this.errors=errors


        if (stack) {// this is written to understand the in which files we need to check for the errors
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }


    }//this is the creation of the constructor and we are overwriting the constructor as well we are writing our constructor
}

export {ApiError}