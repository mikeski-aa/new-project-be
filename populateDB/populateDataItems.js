const { response } = require("express");
const { prisma } = require("../config/db");

async function createStore() {
  const response = await prisma.store.create({
    data: {
      userId: 1,
      name: "My Store",
      location: "Sheffield",
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

async function putProduct(storeid, name, price, category, quantity, sku) {
  const response = await prisma.product.create({
    data: {
      storeId: storeid,
      name: name,
      price: price,
      category: category,
      quantity: quantity,
      sku: sku,
    },
  });

  console.log(response);
}

async function getItems(id) {
  const response = await prisma.budget.findFirst({
    where: {
      id: id,
    },
    include: {
      items: true,
    },
  });

  console.log(response);
}

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

async function testApi() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
}

// testApi();
