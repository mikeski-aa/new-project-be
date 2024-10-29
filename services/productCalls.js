const { prisma } = require("../config/db");

async function addProduct(products) {
  try {
    const response = await prisma.product.createMany({
      data: products,
    });

    console.log("////////");
    console.log(response);
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

    return response;
  } catch (error) {
    console.log(error);
    return error;
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

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { addProduct, deleteProduct, updateProduct };
