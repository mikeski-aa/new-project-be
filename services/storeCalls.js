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
        products: {
          orderBy: {
            sku: "asc",
          },
        },
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function addStore(name, location, userId) {
  try {
    const respose = await prisma.store.create({
      data: {
        userId: +userId,
        name: name,
        location: location,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteStore(userid, storeid) {
  try {
    // checks user owns store
    const response = await prisma.store.delete({
      where: {
        id: +storeid,
        userId: +userid,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateStore(userid, storeid, name, location) {
  try {
    const response = await prisma.store.update({
      where: {
        id: +storeid,
        userId: +userid,
      },
      data: {
        name: name,
        location: location,
      },
    });

    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStores, getStore, addStore, deleteStore, updateStore };
