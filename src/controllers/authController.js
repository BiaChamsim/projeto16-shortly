import bcrypt from 'bcrypt';
import db from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function signUp(req, res){
    try{
        const {name, email, password} = req.body;

        const userData = await db.query(
            `SELECT * FROM USERS 
            WHERE email = $1`, 
            [email]
        )

        if(userData.rows.length !== 0){
            return res.sendStatus(409);
        }

        const passwordHash = bcrypt.hashSync(password, 10)

        await db.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`, 
            [name, email, passwordHash]
        )   
        
        res.sendStatus(201);

    }catch(error){
        console.log(error)
        return res.sendStatus(500);
    }

}

export async function login(req, res){
    
    const {email, password} = req.body;

    const userData = await db.query(
        `SELECT * FROM USERS 
        WHERE email = $1`, 
        [email]
    )

    if(userData.rows.length === 0){
        return res.sendStatus(401);
    }

    const isValidPassword = bcrypt.compareSync(password, userData.rows[0].password);
    if(!isValidPassword) return res.sendStatus(401);

    const config = {expiresIn:60*60}
    const token = jwt.sign({userId:userData.rows[0].id}, process.env.PRIVATE_KEY_JWT, config)
    
    res.send({token}).status(200);

}