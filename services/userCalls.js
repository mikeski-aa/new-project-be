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
    return { error: error };
  }
}

module.exports = { createNewUser };
