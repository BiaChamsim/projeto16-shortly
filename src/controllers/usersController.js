import db from "../db.js";

export async function getUsers(req, res){
    try{
        const {userId} = res.locals;

        const userData = await db.query(
            `SELECT * FROM users 
            WHERE id = $1`,
            [id]
        )



    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}