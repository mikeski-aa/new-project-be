const { prisma } = require("../config/db");

async function addProduct(products) {
  try {
    const response = await prisma.product.createMany({
      data: products,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { addProduct };
