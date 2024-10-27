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
      isGuest: true,
    },
  });
}

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

putProduct(carItems, 2);
putProduct(items, 1);

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
