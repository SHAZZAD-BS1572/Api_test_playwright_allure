const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");
var dynamicPostRequest = require("../test-data/dynamic_request_body.json");
import { stringFormat } from "../utils/common";

test("Query parameter in playwright api testing", async ({request}) => {
  // create test data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int(1000);
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  var updatedRequestBody = stringFormat(
    JSON.stringify(dynamicPostRequest),
    "Md",
    "SHAZZAD",
    "apple"
  );

  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(updatedRequestBody),
  });

  // validate status code
  console.log(await postAPIResponse.json());

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  // validate api response json obj
  const postAPIResponseBody = await postAPIResponse.json();

  const bID = postAPIResponseBody .bookingid;
  // create GET api request using playwright
  const getAPIResponse = await request.get(`/booking/`,
    {
      params:{
        "firstname": "Md"
      }
    }
  );

  // validate status code
  console.log(await getAPIResponse.json());
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
});
