const { prisma } = require("../config/db");

async function createOrder(storeid, tval) {
  try {
    const response = await prisma.stockorder.create({
      data: {
        storeId: storeid,
        totalvalue: +tval,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating an order");
  }
}

async function createOrderItem(orderId, sku, quantityordered) {
  try {
    const response = await prisma.ordereditem.create({
      data: {
        orderId: +orderId,
        sku: sku,
        quantityordered: +quantityordered,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating an order item");
  }
}

module.exports = { createOrder, createOrderItem };
