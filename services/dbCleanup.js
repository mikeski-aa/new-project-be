const { prisma } = require("../config/db");

async function deleteUser() {
  const newDate = new Date();
  // we create a current date and take 3 hours away
  newDate.setHours(newDate.getHours() - 3);
  try {
    // if the date of user account is less than 3 hours
    const deletedUsers = await prisma.users.deleteMany({
      where: {
        date: {
          lte: newDate,
        },
        isGuest: true,
      },
    });

    return deletedUsers;
  } catch (error) {
    error;
    throw new Error(error);
  }
}

module.exports = { deleteUser };
