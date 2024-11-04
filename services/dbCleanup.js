const { prisma } = require("../config/db");

async function findUsersUnderHours() {
  const newDate = new Date();
  // we create a current date and take 3 hours away
  newDate.setHours(newDate.getHours() - 2);
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
      console.log(deletedUsers[x].stores[0].id, deletedUsers[x].stores[1].id);
      await getReportsForStores(deletedUsers[x].stores[0].id);
    }

    return deletedUsers;
  } catch (error) {
    error;
    console.log(error);
  }
}

async function getReportsForStores(id) {
  const report = await prisma.eodreport.findMany({
    where: {
      storeId: +id,
    },
  });

  console.log(report);
}

findUsersUnderHours();

module.exports = { findUsersUnderHours };
