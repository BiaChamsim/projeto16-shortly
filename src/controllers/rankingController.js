import db from "../db.js";

export async function getRanking(req,res){
    try{

        const ranking = await db.query(
            `SELECT users.id, users.name 
            COUNT ("url") AS "linksCount"
            SUM("visitCount") AS "visitCount"
            FROM users 
            JOIN urls
            ON urls."userId" = users.id 
            GROUP BY users.id
            ORDER BY "visitCount" DESC LIMIT 10`
        );

        res.send(ranking.rows).status(200)

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}