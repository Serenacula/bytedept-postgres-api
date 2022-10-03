describe(`database api tests`, () => {
    test(`api works`, async () => {
        const response = await fetch(`http://localhost:3000/app_events`)

        console.log(response.status)

        expect(response).toBeTruthy()
    })

    test(`bot_id works`, async () => {
        const response = await fetch(
            `http://localhost:3000/app_events?bot_id=gerald`
        )

        console.log(response.status)

        expect(response).toBeTruthy()
    })

    test(`month works`, async () => {
        const response = await fetch(
            `http://localhost:3000/app_events?month=feb`
        )

        console.log(response.status)

        expect(response).toBeTruthy()
    })
})
