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

async function updateProduct(sku, number, quantity, storeid) {
  const newQuant = quantity - number;
  try {
    const response = await prisma.product.update({
      where: {
        uniqKey: {
          sku: sku,
          storeId: +storeid,
        },
      },
      data: {
        quantity: newQuant,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addProduct, deleteProduct, updateProduct };
