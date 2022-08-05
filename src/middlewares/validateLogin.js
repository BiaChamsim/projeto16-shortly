import loginSchema from "../schemas/loginSchema.js";

function validateLogin(req, res, next){
   
    const user = req.body;   

    const {error} = loginSchema.validate(user, {abortEarly:false });
    if(error){
        const erros = error.details.map(erro=> erro.message)
        return res.status(422).send(erros)
    }

    next()
}

export default validateLogin;