import { Client } from "pg"
import express from "express"
import bodyParser from "body-parser"
import { getMonthEnd, getMonthStart } from "./month"

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "test-4",
    user: "test",
    password: "test",
})

const app = express()
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log("app listening on port 3000")
})

client.connect()

app.get("/app_events", (request, response) => {
    console.log(
        `get request received: ${JSON.stringify(request.query, null, 4)}`
    )

    const bot_id = request.query.bot_id
    const month = request.query.month

    try {
        if (
            (bot_id && typeof bot_id !== "string") ||
            (month && typeof month !== "string")
        ) {
            throw Error(`received non-string query`)
        } else {
            let sqlQuery = "SELECT * FROM app_events"
            const queryValues = []
            const startOfMonth = month ? getMonthStart(month) : undefined
            const endOfMonth = month ? getMonthEnd(month) : undefined

            if (bot_id && month) {
                sqlQuery += ` WHERE (bot_id = $1::text) AND (created_at BETWEEN $2::date AND $3::date)`
                queryValues.push(bot_id, startOfMonth, endOfMonth)
            } else if (month) {
                sqlQuery += ` WHERE created_at BETWEEN $1::date AND $2::date`
                queryValues.push(startOfMonth, endOfMonth)
            } else if (bot_id) {
                sqlQuery += ` WHERE bot_id = $1::text`
                queryValues.push(bot_id)
            }

            sqlQuery += ` ORDER BY created_at ASC LIMIT 1000`

            console.log(`Query: ${sqlQuery}
            
            `)

            const queryWithParams = {
                text: sqlQuery,
                values: queryValues,
            }

            client.query(queryWithParams, (error, result) => {
                if (error) {
                    console.log(`QUERY ERROR: ${error}`)
                    throw error
                }
                response.send(result.rows)
            })
        }
    } catch (error) {
        console.log(error)
        response.status(400) // more status codes could be added here
        response.send(`error returned: ${error}`)
    }

    client.end
})
