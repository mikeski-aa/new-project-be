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

async function checkItemExists(sku, storeid) {
  try {
    const response = await prisma.product.findUnique({
      where: {
        uniqKey: {
          sku: sku,
          storeId: +storeid,
        },
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// product.sku,
// product.quantitySold,
// product.storeId,
// product.price,
// product.purchasePrice,
// product.category,
// product.name

async function revertQuantityUpdate(
  sku,
  numberSold,
  storeid,
  price,
  purchasePrice,
  category,
  name
) {
  // first we need to check if item exists -> i.e it has not been deleted;
  const test = await checkItemExists(sku, storeid);

  if (test == null) {
    console.log("NULL DETECTED WHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT");

    try {
      const response = await prisma.product.create({
        data: {
          quantity: numberSold,
          sku: sku,
          storeId: storeid,
          price: price,
          purchasePrice: purchasePrice,
          name: name,
          category: category,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    console.log(test);
    try {
      const response = await prisma.product.update({
        where: {
          uniqKey: {
            sku: sku,
            storeId: +storeid,
          },
        },
        data: {
          quantity: {
            increment: numberSold,
          },
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  revertQuantityUpdate,
};
