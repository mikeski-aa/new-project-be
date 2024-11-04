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
  console.log(orderId, sku, quantityordered);
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

async function getOrders(storeid) {
  console.log("yes");
  try {
    const response = await prisma.stockorder.findMany({
      where: {
        storeId: +storeid,
      },
      include: {
        itemsordered: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return response;
  } catch (error) {
    throw new Error("Error fetching orders");
  }
}

async function createOrderForDate(storeid, tval, date) {
  const newDate = new Date(date);
  try {
    const response = await prisma.stockorder.create({
      data: {
        storeId: storeid,
        totalvalue: +tval,
        date: newDate,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating an order");
  }
}

module.exports = {
  createOrder,
  createOrderItem,
  getOrders,
  createOrderForDate,
};
