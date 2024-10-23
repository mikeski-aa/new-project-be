const { prisma } = require("../config/db");

async function getBudgets(id) {
  try {
    const response = await prisma.budget.findMany({
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

module.exports = { getBudgets };
