const { prisma } = require("../config/db");

async function addProduct(storeid, product) {
  try {
    const response = await prisma.product.createMany({
      data: {
        storeId: +storeid,
        name: product.name,
        price: +product.price,
        category: product.category,
        quantity: +product.quantity,
        sku: product.sku,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { addProduct };
