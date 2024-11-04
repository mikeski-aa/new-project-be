const { response } = require("express");
const { prisma } = require("../config/db");
const { items, carItems } = require("../populateDB/fakeItems");

async function createStore() {
  const response = await prisma.store.create({
    data: {
      userId: 1,
      name: "My Other Store",
      location: "Manchester",
    },
  });
  console.log(response);
}

// createStore();

async function updateUserGuestStatus() {
  const response = await prisma.user.update({
    where: {
      username: "GuestUser",
    },
    data: {
      isGuest: false,
    },
  });
}

// updateUserGuestStatus();

async function testProductFill(storeid, item) {
  const newPrice = parseFloat(item.Price.toFixed(2));
  const newPurchasePrice = parseFloat(item.PurchasePrice.toFixed(2));

  const response = await prisma.product.create({
    data: {
      storeId: storeid,
      name: item.Name,
      price: newPrice,
      category: item.Category,
      quantity: item.Quantity,
      sku: item.SKU,
      purchasePrice: newPurchasePrice,
    },
  });

  console.log(response);
}

async function putProduct(item, storeId) {
  let test = await Promise.all(
    item.map((product) => testProductFill(storeId, product))
  );

  console.log(test);
}

// putProduct(carItems, 2);
// putProduct(items, 1);

async function getProducts(id) {
  const response = await prisma.store.findFirst({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  });

  console.log(response);
}

// getProducts(1);

// getItems(2);
// createBudget();
// putItem(2, "New item", 3.45);
// putItem(2, "Second item", 19.89);
// putItem(2, "Feb test", 87.53, "2024-02-05");
// putItem(2, "Mar test", 35.35, "2024-03-05");
// putItem(2, "June test", 3.1, "2024-04-05");
// putItem(2, "July test", 99.2, "2024-05-05");
// putItem(2, "Aug test", 15.39, "2024-06-05");
// putItem(2, "Sept test", 4.22, "2024-07-05");

// updateUserGuestStatus();

// function mapTest(items, id) {
//   items.map((item) => (item.reportId = id));

//   console.log(items);
// }

// mapTest(items, 2);

async function dummyReports(storeid, value, date) {
  const newDate = new Date(date);

  const report = await prisma.eodreport.create({
    data: {
      storeId: storeid,
      totalSaleValue: value,
      date: newDate,
    },
  });

  console.log(report);
}

// dummyReports(8, 2321, "02-03-2025");
// dummyReports(8, 57547, "02-05-2024");
// dummyReports(8, 57547, "02-08-2024");

async function getstoreinfo() {
  const response = await prisma.user.findMany({
    where: {
      isGuest: true,
    },
    include: {
      stores: true,
    },
  });

  // console.log(response);

  for (let x = 0; x < response.length; x++) {
    if (response[x].stores.length > 0) {
      console.log("one store");
      console.log(response[x].stores[0].id);
      console.log(response[x].stores[1].id);
      // then for each ID we delete the stockorder and eodreport
    } else {
      console.log(response[x]);
    }
  }
}

async function deleteUserATest() {
  const del = await prisma.user.delete({
    where: {
      id: 8,
    },
  });

  console.log(del);
  // returned object from del:
  // {
  //   id: 6,
  //   username: 'guestc086f4f2-587f-4910-9179-803bbec9e3ac',
  //   hash: '0042f1b4-7d20-47c4-a185-99b0561b8229',
  //   isGuest: true,
  //   date: 2024-11-04T11:21:29.966Z
  // }
}

// deleteUserATest();

getstoreinfo();
