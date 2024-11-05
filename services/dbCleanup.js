const { prisma } = require("../config/db");

const { deleteStore } = require("../services/storeCalls");

async function findUsersUnderHours() {
  const newDate = new Date();
  // we create a current date and take 3 hours away
  newDate.setHours(newDate.getHours() - 1);
  try {
    // if the date of user account is less than 3 hours
    const deletedUsers = await prisma.user.findMany({
      where: {
        date: {
          lte: newDate,
        },
        isGuest: true,
      },
      include: {
        stores: true,
      },
    });

    console.log("deletedUsers");
    console.log(deletedUsers);

    for (let x = 0; x < deletedUsers.length; x++) {
      if (deletedUsers[x].stores.length > 0) {
        await deleteStore(deletedUsers[x].id, deletedUsers[x].stores[0].id);
        await deleteStore(deletedUsers[x].id, deletedUsers[x].stores[1].id);
      }
      await deleteUser(deletedUsers[x].id);
    }

    return deletedUsers;
  } catch (error) {
    error;
    console.log(error);
  }
}

async function deleteReportAndOrders(id) {
  const deleteSoldProduct = await prisma.soldproduct.deleteMany({
    where: {
      storeId: +id,
    },
  });

  const report = await prisma.eodreport.deleteMany({
    where: {
      storeId: +id,
    },
  });

  const order = await prisma.stockorder.deleteMany({
    where: {
      storeId: +id,
    },
  });

  console.log(order);
  console.log(report);
}

async function deleteProducts(storeid) {
  const products = await prisma.product.deleteMany({
    where: {
      storeId: +storeid,
    },
  });

  console.log(products);
}

async function deleteStores(id) {
  const store = await prisma.store.delete({
    where: {
      id: +id,
    },
  });

  console.log(store);
}

async function deleteUser(id) {
  const user = await prisma.user.delete({
    where: {
      id: +id,
    },
  });

  console.log(user);
}

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

// findUsersUnderHours();

module.exports = { findUsersUnderHours, deleteReportAndOrders, deleteProducts };
