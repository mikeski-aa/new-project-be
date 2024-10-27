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

async function deleteProduct(productid) {
  try {
    const response = await prisma.product.delete({
      where: {
        id: +productid,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { addProduct, deleteProduct };
