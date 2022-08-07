import db from "../db.js";

function formatDataUrl({url, visitCount, urlId, shortUrl}){
    return {id: urlId, shortUrl, url, visitCount};
}

export async function getUsers(req, res){
    try{
        const {userId} = res.locals;

        const userData = await db.query(
            `SELECT users.id, users.name, urls.url, urls.id AS "urlId", 
            urls."shortUrl", urls."visitCount" 
            FROM users 
            LEFT JOIN urls
            ON "userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id, urls.url, urls.id`,
            [userId]
        )

        let totalVisits = 0;
        userData.rows.forEach(userUrlData => totalVisits += parseInt(userUrlData.visitCount))

        const userStatistic = {
            id: userData.rows[0].id,
            name: userData.rows[0].name,
            visitCount: totalVisits ? totalVisits : "0",
            shortenedUrls: userData.rows[0].urlId ? userData.rows.map(formatDataUrl) : [] 
        }

        res.send(userStatistic).status(200);

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}