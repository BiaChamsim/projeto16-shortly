import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

function validateToken(req, res, next){
    const { authorization } = req.headers;
    
    try{
        const token = authorization.replace("Bearer ", "");
        const tokenData = jwt.verify(token, process.env.PRIVATE_KEY_JWT)

        const userId = tokenData.userId
        res.locals.userId = userId
        next()

    }catch{
        res.sendStatus(401);
    }
    
}

export default validateToken;

