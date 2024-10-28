const { prisma } = require("../config/db");

async function generateReport(storeid, totalValue) {
  try {
    const response = await prisma.eodreport.create({
      data: {
        storeId: +storeid,
        totalSaleValue: +totalValue,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function addSoldProducts(soldItems) {
  try {
    const response = await prisma.soldProduct.createMany({
      data: soldItems,
    });

    console.log(response);

    return;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { generateReport, addSoldProducts };
