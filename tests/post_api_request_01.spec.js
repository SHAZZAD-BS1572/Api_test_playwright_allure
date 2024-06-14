// Load playwright module
const {test,expect}= require("@playwright/test")

test('Create Post api request using static request body',async({request})=>{

const postAPIresponse=await request.post('/booking',{
  data:{
    
      "firstname": "Md",
      "lastname": "Shazzad",
      "totalprice": 1000,
      "depositpaid": true,
      "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
      },
      "additionalneeds": "super bowls"
  
  }
})

const postAPIresponseBody = await postAPIresponse.json()

console.log(postAPIresponseBody)
expect(postAPIresponse.ok()).toBeTruthy()
expect(postAPIresponse.status()).toBe(200)
expect(postAPIresponseBody.booking).toHaveProperty("firstname", "Md")
expect(postAPIresponseBody.booking).toHaveProperty("lastname", "Shazzad")
expect(postAPIresponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")


})



//Validate status code

// Validate Json api response

//Validate nested Json objects