const { prisma } = require("../config/db");
const { report } = require("../routes");

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
        reports: {
          orderBy: {
            date: "asc",
          },
          include: {
            soldProducts: {
              orderBy: {
                sku: "asc",
              },
            },
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
    return respose;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// delete specific items from store order
async function deleteOrderItems(id) {
  try {
    const response = await prisma.ordereditem.deleteMany({
      where: {
        orderId: +id,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// deleting store needs to delete store items and also reports
async function deleteStore(userid, storeid) {
  console.log("i am here");
  try {
    const test = await prisma.stockorder.findMany({
      where: {
        storeId: +storeid,
      },
    });

    const orderReportId = [];
    test.map((item) => orderReportId.push(item.id));

    const itemsDeleted = orderReportId.map((id) => deleteOrderItems(id));

    await Promise.all(itemsDeleted);

    console.log(orderReportId);

    const deleteSoldProduct = await prisma.soldproduct.deleteMany({
      where: {
        storeId: +storeid,
      },
    });

    const deleteReports = await prisma.eodreport.deleteMany({
      where: {
        storeId: +storeid,
      },
    });

    const deleteItems = await prisma.product.deleteMany({
      where: {
        storeId: +storeid,
      },
    });

    const deleteOrderedStock = await prisma.stockorder.deleteMany({
      where: {
        storeId: +storeid,
      },
    });

    // checks user owns store
    const response = await prisma.store.delete({
      where: {
        id: +storeid,
        userId: +userid,
      },
    });

    return response;
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
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStores, getStore, addStore, deleteStore, updateStore };
