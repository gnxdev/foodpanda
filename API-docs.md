# GenieX Foodpanda API

This guide outlines the process for authenticating and accessing the GenieX API to post orders from Foodpanda.

---

## 🔐 1. Obtain `access_token` and `refresh_token`

**Endpoint:**

```
POST https://api.geniex.tech/api/v1/auth/token
```

**Request Payload:**

```json
{
  "username": "client",
  "password": "secret"
}
```

**Response Payload:**

```json
{
  "success": true,
  "access_token": {
    "token": <YOUR_TOKEN_HERE>,
    "expires_in": "1h"
  },
  "refresh_token": {
    "token": <YOUR_TOKEN_HERE>,
    "expires_in": "30d"
  }
}
```

---

## 🔁 2. Refresh the `access_token` using `refresh_token`

**Endpoint:**

```
POST https://api.geniex.tech/api/v1/auth/refresh
```

**Request Payload:**

```json
{
  "refreshToken": <YOUR_TOKEN_HERE>
}
```

**Response Payload:**

```json
{
  "success": true,
  "accessToken": {
    "token": <YOUR_TOKEN_HERE>,
    "expires_in": "1h"
  }
}
```

---

## 📡 3. Use `access_token` to Call Protected APIs

Include the `access_token` in the `Authorization` header using the `Bearer` scheme:

**Example Header:**

```
Authorization: Bearer <ACCESS_TOKEN>
```

---

## 🛡️ Notes

- `access_token` is valid for 1 hour.
- `refresh_token` is valid for 30 days.


---

## 🛒 Orders

### 1. Dispatch Order Endpoint

**Endpoint:**  
```
POST https://api.geniex.tech/api/v1/foodpanda/order/{remoteId}
```

**Headers:**
```
Authorization: `Bearer <ACCESS_TOKEN>`
```

<details open>
<summary><b>Request payload</b> <i>(from Foodpanda Integration Middleware Docs)</summary>

```json
{
  "token": "5f373562-591a-4db9-8609-7eec7880f28d",
  "code": "n0s1-w0k1",
  "comments": {
    "customerComment": "Please hurry, I am hungry"
  },
  "createdAt": "2016-03-14T17:00:00.000Z",
  "customer": {
    "email": "s188sduisddsnjknsj",
    "firstName": "food",
    "lastName": "panda",
    "mobilePhone": "+49 99999999",
    "flags": [
      "string"
    ]
  },
  "delivery": {
    "address": {
      "postcode": "10117",
      "city": "Berlin",
      "street": "Oranienburger Staße",
      "number": "67"
    },
    "expectedDeliveryTime": "2016-03-14T17:50:00.000Z",
    "expressDelivery": false,
    "riderPickupTime": "2016-03-14T17:35:00.000Z"
  },
  "discounts": [
    {
      "name": "First Order",
      "amount": "9.00",
      "sponsorships": [
        {
          "sponsor": "PLATFORM",
          "amount": "3"
        },
        {
          "sponsor": "VENDOR",
          "amount": "3"
        },
        {
          "sponsor": "THIRD_PARTY",
          "amount": "3"
        }
      ]
    }
  ],
  "expeditionType": "pickup",
  "expiryDate": "2016-03-14T17:15:00.000Z",
  "extraParameters": {
    "property1": "string",
    "property2": "string"
  },
  "invoicingInformation": {
    "carrierType": "string",
    "carrierValue": "string"
  },
  "localInfo": {
    "countryCode": "DE",
    "currencySymbol": "€",
    "platform": "Foodpanda",
    "platformKey": "FP_DE"
  },
  "payment": {
    "status": "paid",
    "type": "paid"
  },
  "test": false,
  "shortCode": "42",
  "preOrder": false,
  "pickup": null,
  "platformRestaurant": {
    "id": "sq-abcd"
  },
  "price": {
    "deliveryFees": [
      {
        "name": "packaging fee",
        "value": 2.5
      }
    ],
    "grandTotal": "25.50",
    "payRestaurant": "25.50",
    "riderTip": "1.20",
    "totalNet": "19.45",
    "vatTotal": "2.50",
    "collectFromCustomer": "16.34"
  },
  "products": [
    {
      "categoryName": "Burgers",
      "name": "Double Cheese Burger",
      "paidPrice": "8.00",
      "quantity": "string",
      "remoteCode": "ID_FOR_DOUBLE_CHEESE_BURGER_ON_POS",
      "selectedToppings": [
        {
          "children": [],
          "name": "extra cheese",
          "price": "1.50",
          "quantity": 1,
          "id": "ID_FOR_EXTRA_CHEESE_ON_PLATFORM",
          "remoteCode": "ID_FOR_EXTRA_CHEESE_ON_POS",
          "type": "PRODUCT",
          "itemUnavailabilityHandling": "REMOVE",
          "discounts": [
            {
              "name": "First order",
              "amount": "1.50",
              "sponsorships": [
                {
                  "sponsor": "PLATFORM",
                  "amount": "0.50"
                },
                {
                  "sponsor": "VENDOR",
                  "amount": "0.50"
                },
                {
                  "sponsor": "THIRD_PARTY",
                  "amount": "0.50"
                }
              ]
            }
          ]
        }
      ],
      "unitPrice": "6.42",
      "comment": "No cheese please",
      "id": "ID_FOR_DOUBLE_CHEESE_BURGER_ON_PLATFORM",
      "itemUnavailabilityHandling": "CALL_CUSTOMER_AND_REPLACE",
      "variation": {
        "name": "Double Cheese Burger"
      },
      "discounts": [
        {
          "name": "First order",
          "amount": "1.50",
          "sponsorships": [
            {
              "sponsor": "PLATFORM",
              "amount": "1.50"
            },
            {
              "sponsor": "VENDOR",
              "amount": "1.50"
            },
            {
              "sponsor": "THIRD_PARTY",
              "amount": "1.50"
            }
          ]
        }
      ]
    }
  ],
  "corporateTaxId": "example-tax-id",
  "callbackUrls": {
    "orderAcceptedUrl": "string",
    "orderRejectedUrl": "string",
    "orderPickedUpUrl": "string",
    "orderPreparedUrl": "string",
    "orderProductModificationUrl": "string",
    "orderPreparationTimeAdjustmentUrl": "string"
  }
}
```
</details>

<details open>
<summary><b>Response Payload</b> <i>(from Foodpanda Integration Middleware Docs)</i></summary>

```json
{
  "remoteResponse": {
    "remoteOrderId": "POS_RESTAURANT_0001_ORDER_000001"
  }
}
```
</details>