const { prisma } = require("../config/db");

async function getStores(id) {
  try {
    const response = await prisma.store.findMany({
      where: {
        userId: +id,
      },
      include: {
        products: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getStore(storeId) {
  try {
    const response = await prisma.store.findFirst({
      where: {
        id: +storeId,
      },
      include: {
        products: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStores };
