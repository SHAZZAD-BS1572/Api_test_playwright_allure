const { test, expect } = require("@playwright/test");

import { faker } from "@faker-js/faker";

const { DateTime } = require("luxon");

test("Create POST api request using dynamic request body in playwright", async ({request}) => {
  const firstname = faker.person.firstName()
  const lastname = faker.person.lastName()
  const totalPrice = faker.number.int(1000)

  const checkinDate = DateTime.now().toFormat('yyyy-MM-dd')
  const checkoutDate = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd')
  const postAPIresponse=await request.post('/booking',{
    data:{
      
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalPrice,
        "depositpaid": true,
        "bookingdates": {
            "checkin": checkinDate,
            "checkout": checkoutDate
        },
        "additionalneeds": "super bowls"
    
    }
  })
  
  const postAPIresponseBody = await postAPIresponse.json()
  
  console.log(postAPIresponseBody)
  expect(postAPIresponse.ok()).toBeTruthy()
  expect(postAPIresponse.status()).toBe(200)
  expect(postAPIresponseBody.booking).toHaveProperty("firstname", firstname)
  expect(postAPIresponseBody.booking).toHaveProperty("lastname", lastname)
  expect(postAPIresponseBody.booking.bookingdates).toHaveProperty("checkin",checkinDate)

});
