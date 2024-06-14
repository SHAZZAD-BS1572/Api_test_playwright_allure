const { test, expect } = require("@playwright/test");
const postRequestBodydata = require("../test-data/post_request_body.json");

test("Create POST api request using JSON file in playwright", async ({request}) => {

const postAPIresponse = await request.post('/booking',{data: postRequestBodydata})
const postAPIresponseBody = await postAPIresponse.json()
console.log(postAPIresponseBody)
expect(postAPIresponse.ok()).toBeTruthy()
expect(postAPIresponse.status()).toBe(200)
expect(postAPIresponseBody.booking).toHaveProperty("firstname", "Md")
expect(postAPIresponseBody.booking).toHaveProperty("lastname", "Shazzad")
expect(postAPIresponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")

});
