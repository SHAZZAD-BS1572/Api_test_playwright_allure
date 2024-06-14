const { test, expect } = require("@playwright/test");
const postRequestBodydata = require("../test-data/post_request_body.json");


test("Create GET api request in playwright", async ({ request }) => {

  const postAPIresponse = await request.post('/booking', { data: postRequestBodydata })
  const postAPIresponseBody = await postAPIresponse.json()

  const bID = postAPIresponseBody.bookingid;
  // create GET api request using playwright
  const getAPIResponse = await request.get(`/booking/${bID}`);

  // validate status code
  console.log(await getAPIResponse.json());
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
});
