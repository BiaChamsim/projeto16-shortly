import db from "../db.js";

export async function getRanking(req,res){
    try{

        const ranking = await db.query(
            `SELECT users.id, users.name, 
            COUNT ("url") AS "linksCount",
            SUM("visitCount") AS "visitCount"
            FROM users 
            LEFT JOIN urls
            ON urls."userId" = users.id 
            GROUP BY users.id
            ORDER BY "visitCount" DESC LIMIT 10`
        );

        const topTenUsers = ranking.rows.map(userData => userData.visitCount ? userData : {...userData, visitCount: "0"})

        const ordenedTopten = [...topTenUsers].sort((a, b) => b.visitCount - a.visitCount)

        res.send(ordenedTopten).status(200)

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}