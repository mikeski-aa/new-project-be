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

  const itemsWithoutId = soldItems.map(({ id, ...rest }) => rest);
  const itemsWithoutQuantity = itemsWithoutId.map(
    ({ quantity, ...rest }) => rest
  );
  try {
    const response = await prisma.soldproduct.createMany({
      data: itemsWithoutQuantity,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteEodReportItems(reportid) {
  try {
    const response = await prisma.soldproduct.deleteMany({
      where: {
        reportId: +reportid,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteEodReport(reportid) {
  try {
    const response = await prisma.eodreport.delete({
      where: {
        id: +reportid,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getReportInfo(storeid) {
  try {
    const response = await prisma.eodreport.findMany({
      where: {
        storeId: +storeid,
      },
      include: {
        soldProducts: true,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  generateReport,
  addSoldProducts,
  deleteEodReportItems,
  deleteEodReport,
  getReportInfo,
};
