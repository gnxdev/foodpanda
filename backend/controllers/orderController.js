import Orders from "../models/Orders.js";
import OrderDiscounts from "../models/OrderDiscounts.js";
import Orderline from "../models/Orderline.js";
import OrderlineDiscounts from "../models/OrderlineDiscounts.js";
import OrderlineToppings from "../models/OrderlineToppings.js";
import ToppingDiscounts from "../models/ToppingDiscount.js";
import Sponsorships from "../models/Sponsorships.js";
import DeliveryFee from "../models/DeliveryFee.js";
import {getSequelizeInstance} from '../config/database/SequelizeInstance.js';

// Import the Sequelize instance for the foodpanda database
const sequelize = getSequelizeInstance({database: 'foodpanda'});
// util to get client IP
const getClientIP = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

// add child toppings
const insertToppingRecursive = async (
  toppingData,
  orderlineId,
  parentId = null
) => {
  const topping = await OrderlineToppings.create({
    topping_id: toppingData.id,
    orderline_id: orderlineId,
    parent_topping_id: parentId,
    name: toppingData.name,
    type: toppingData.type || null,
    price: toppingData.price || null,
    quantity: toppingData.quantity || null,
    remote_code: toppingData.remoteCode || null,
  });

  // Discounts
  if (toppingData.discounts?.length) {
    for (const discount of toppingData.discounts) {
      const toppingDiscount = await ToppingDiscounts.create({
        orderline_topping_id: topping.id,
        name: discount.name || null,
        amount: discount.amount || null,
      });

      for (const sponsor of discount.sponsorships || []) {
        await Sponsorships.create({
          toppings_discount_id: toppingDiscount.id,
          name: sponsor.sponsor || null,
          amount: sponsor.amount || null,
        });
      }
    }
  }

  for (const child of toppingData.children || []) {
    await insertToppingRecursive(child, orderlineId, topping.id);
  }
};

/*
Use to check if request reaches the server
route - /api/v1/foodpanda/test
*/
export const index = (req, res) => {
  const clientIP = getClientIP(req);
  console.log(`Request from IP: ${clientIP}`);
  res.json({
    message: "Congrats! You reached this endpoint.",
    client_ip: clientIP,
  });
};

/*
Use to test database connection
route - /api/v1/foodpanda/testdb
*/
export const testDB = async (req, res) => {
    try {
        await sequelize.authenticate()
        // Get MySQL version and selected database name
        const [[versionResult], [dbResult]] = await Promise.all([
            sequelize.query('SELECT VERSION() AS `version`'),
            sequelize.query('SELECT DATABASE() AS `database`'),
        ]);

        console.log('MySQL Version:', versionResult.version);
        console.log('Selected Database:', dbResult.database);

        res.status(200).json({
            message: "Database connected",
            success: true,
            payload: {
                version: versionResult[0]?.version,
                database: dbResult[0]?.database,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to connect to the database: ${error}`
        })
        console.log('Unable to connect to the database: ', error);
    }
}



/*
Order dispatch Webhook (Receive Orders)
route - /api/v1/foodpanda/order/:remoteId
*/
export const receiveOrder = async (req, res) => {
  try {
    const remoteId = req.params.remoteId;
    const clientIP = getClientIP(req);

    console.log(`Request from IP: ${clientIP}, Remote ID: ${remoteId}`);
    const data = req.body;

    const order = await Orders.create({
      token: data.token,
      code: data.code,
      cus_email: data.customer?.email,
      cus_first_name: data.customer?.firstName,
      cus_last_name: data.customer?.lastName,
      cus_phone: data.customer?.mobilePhone,
      cus_flag: (data.customer?.flags || []).join(","),
      grand_total: data.price?.grandTotal,
      pay_restaurant: data.price?.payRestaurant,
      rider_tip: data.price?.riderTip,
      vat_total: data.price?.vatTotal,
      total_net: data.price?.totalNet,
      collect_from_customer: data.price?.collectFromCustomer,
      payment_type: data.payment?.type,
      payment_status: data.payment?.status,
      expedition_type: data.expeditionType,
      expected_delivery_time: data.delivery?.expectedDeliveryTime,
      express_delivery: data.delivery?.expressDelivery,
      rider_pickup_time: data.delivery?.riderPickupTime,
      pickup_time: data.pickup?.pickupTime,
      pickup_code: data.pickup?.pickupCode,
      building: data.delivery?.address?.building,
      city: data.delivery?.address?.city,
      company: data.delivery?.address?.company,
      delivery_area: data.delivery?.address?.deliveryArea,
      delivery_instructions: data.delivery?.address?.deliveryInstructions,
      delivery_main_area: data.delivery?.address?.deliveryMainArea,
      entrance: data.delivery?.address?.entrance,
      flat_number: data.delivery?.address?.flatNumber,
      floor: data.delivery?.address?.floor,
      intercom: data.delivery?.address?.intercom,
      latitude: data.delivery?.address?.latitude,
      longitude: data.delivery?.address?.longitude,
      postcode: data.delivery?.address?.postcode,
      street: data.delivery?.address?.street,
      number: data.delivery?.address?.number,
      comments: data.comments?.customerComment,
      country_code: data.localInfo?.countryCode,
      currency_symbol: data.localInfo?.currencySymbol,
      platform: data.localInfo?.platform,
      platform_key: data.localInfo?.platformKey,
      invoice_carrier_type: data.invoicingInformation?.carrierType,
      invoice_carrier_value: data.invoicingInformation?.carrierValue,
      corporate_tax: data.corporateTaxId,
      test: data.test || false,
      short_code: data.shortCode,
      platform_restaurant_id: data.platformRestaurant?.id,
      accepted_url: data.callbackUrls?.orderAcceptedUrl,
      rejected_url: data.callbackUrls?.orderRejectedUrl,
      picked_up: data.callbackUrls?.orderPickedUpUrl,
      prepared_url: data.callbackUrls?.orderPreparedUrl,
      expire_at: data.expiryDate,
      raw_payload: JSON.stringify(req.body),
      created_at: data.createdAt,
    });

    for (const discount of data.discounts || []) {
      const orderDiscount = await OrderDiscounts.create({
        order_id: order.id,
        name: discount.name,
        amount: discount.amount,
      });

      for (const sponsor of discount.sponsorships || []) {
        await Sponsorships.create({
          order_discount_id: orderDiscount.id,
          name: sponsor.sponsor,
          amount: sponsor.amount,
        });
      }
    }

    for (const fee of data.price?.deliveryFees || []) {
      await DeliveryFee.create({
        order_id: order.id,
        name: fee.name,
        value: fee.value,
      });
    }

    for (const product of data.products || []) {
      const orderline = await Orderline.create({
        order_id: order.id,
        product_id: product.id,
        category_name: product.categoryName,
        name: product.name,
        paid_price: product.paidPrice,
        quantity: product.quantity,
        remote_code: product.remoteCode,
        unit_price: product.unitPrice,
        comment: product.comment,
        variation_name: product.variation?.name,
      });

      for (const discount of product.discounts || []) {
        await OrderlineDiscounts.create({
          orderline_id: orderline.id,
          name: discount.name,
          amount: discount.amount,
        });
      }

      for (const topping of product.toppings || []) {
        await insertToppingRecursive(topping, orderline.id);
      }
    }
    
    res.status(201).json({ remoteResponse: { remoteOrderId: "POS_RESTAURANT_0001_ORDER_000001"} });
  } catch (err) {
    console.error("Order processing failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/*
Retrieve Orders Webhook (Display Orders to Client)
route - /api/v1/foodpanda/orders/raw
*/
export const getOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      attributes: ['id', 'raw_payload']
    })
    // Parse raw_payload JSON string
    const payload = orders.map(order => {
      

      const parsedPayload = typeof order.raw_payload === 'string'
        ? JSON.parse(order.raw_payload)
        : order.raw_payload;

      return {
        id: order.id,
        platform: 'foodpanda',
        raw_payload: parsedPayload
      };
    });
    const count = payload.length;
    res.status(200).json({
      count,
      payload
    })
  } catch (err) {
    console.error("Order processing failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

