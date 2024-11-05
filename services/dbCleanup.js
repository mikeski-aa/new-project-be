const { prisma } = require("../config/db");

async function findUsersUnderHours() {
  const newDate = new Date();
  // we create a current date and take 3 hours away
  newDate.setHours(newDate.getHours() - 3);
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

    console.log(deletedUsers);

    for (let x = 0; x < deletedUsers.length; x++) {
      const test = await prisma.stockorder.findMany({
        where: {
          storeId: +deletedUsers[x].stores[0].id,
        },
      });

      const orderReportId = [];
      test.map((item) => orderReportId.push(item.id));

      const itemsDeleted = orderReportId.map((id) => deleteOrderItems(id));

      await Promise.all(itemsDeleted);

      const testO = await prisma.stockorder.findMany({
        where: {
          storeId: deletedUsers[x].stores[1].id,
        },
      });

      const orderReportIdO = [];
      test.map((item) => orderReportIdO.push(item.id));

      const itemsDeletedO = orderReportIdO.map((id) => deleteOrderItems(id));

      await Promise.all(itemsDeletedO);

      await deleteReportAndOrders(deletedUsers[x].stores[0].id);
      await deleteReportAndOrders(deletedUsers[x].stores[1].id);
      await deleteProducts(deletedUsers[x].stores[0].id);
      await deleteProducts(deletedUsers[x].stores[1].id);
      await deleteStores(deletedUsers[x].stores[0].id);
      await deleteStores(deletedUsers[x].stores[1].id);
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
