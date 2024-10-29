const { prisma } = require("../config/db");

async function createNewUser(username, hash) {
  try {
    const response = await prisma.user.create({
      data: {
        username: username,
        hash: hash,
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getGuestInfo(name) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        username: name,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { createNewUser, getGuestInfo };
