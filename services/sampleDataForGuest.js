const { prisma } = require("../config/db");
const { items, carItems } = require("../populateDB/fakeItems");

async function createStore(userid, storename, location) {
  try {
    const response = await prisma.store.create({
      data: {
        userId: userid,
        name: storename,
        location: location,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function testProductFill(storeid, item) {
  const newPrice = parseFloat(item.Price.toFixed(2));
  const newPurchasePrice = parseFloat(item.PurchasePrice.toFixed(2));

  const response = await prisma.product.create({
    data: {
      storeId: storeid,
      name: item.Name,
      price: newPrice,
      category: item.Category,
      quantity: item.Quantity,
      sku: item.SKU,
      purchasePrice: newPurchasePrice,
    },
  });

  console.log(response);
}

async function putProduct(item, storeId) {
  let test = await Promise.all(
    item.map((product) => testProductFill(storeId, product))
  );

  console.log(test);
}

module.exports = { putProduct, createStore };
