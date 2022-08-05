import signupSchema from "../schemas/signupSchema.js";

function validateSignUp(req, res, next){

    const user = req.body;   

    const {error} = signupSchema.validate(user, {abortEarly:false });
    if(error){
        const erros = error.details.map(erro=> erro.message)
        return res.status(422).send(erros)
    }

    next()
}

export default validateSignUp;