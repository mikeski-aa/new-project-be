const { prisma } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

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

async function createGuestUserAccount() {
  const username = "guest" + uuidv4();
  try {
    const response = await prisma.user.create({
      data: {
        username: username,
        isGuest: true,
        hash: uuidv4(),
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { createNewUser, getGuestInfo, createGuestUserAccount };
