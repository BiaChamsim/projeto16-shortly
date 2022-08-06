import postUrlSchema from "../schemas/postUrlSchema.js";

function validateUrl(req, res, next){
    const { url } = req.body;

    const {error} = postUrlSchema.validate({url}, {abortEarly:false});
    if(error){
        const erros = error.details.map(erro => erro.message)
        return res.send(erros).status(422)
    }

    next()
}

export default validateUrl;