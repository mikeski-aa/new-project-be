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

// first we need to map the report ID to the new items in order to correctly
// represent relationship in DB
async function addSoldProducts(soldItems, reportId) {
  soldItems.map((item) => (item.reportId = reportId));

  try {
    const response = await prisma.soldproduct.createMany({
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
