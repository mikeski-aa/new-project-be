const { prisma } = require("../config/db");

async function getStores(id) {
  try {
    const response = await prisma.store.findMany({
      where: {
        userId: +id,
      },
      include: {
        items: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStores };
