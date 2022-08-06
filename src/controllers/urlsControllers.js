import { nanoid } from "nanoid";
import db from "../db.js";


export async function shortenUrl(req, res){
    try{
        const userId = res.locals.userId
        const { url } = req.body;

        const urlExistance = await db.query(
            `SELECT * from urls WHERE url = $1`, 
            [url]
        )
        
        if(urlExistance.rows.length !== 0){
            return res.sendStatus(409)
        }

        const shortUrl = nanoid();

        await db.query(
            `INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`,
            [url, userId, shortUrl]
        )     

        res.send({shortUrl}).status(201)

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}

export async function getUrl(req, res){
    const {id} = req.params;
    try{
        const urls = await db.query(
            `SELECT id, "shortUrl", url
            FROM urls
            WHERE id = $1`,
            [id]
        )

        if(urls.rows.length === 0){
            return res.sendStatus(404)
        }

        res.status(200).send(urls.rows);


    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
    
}