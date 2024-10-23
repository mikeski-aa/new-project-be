const { prisma } = require("../config/db");

async function createBudget() {
  const response = await prisma.budget.create({
    data: {
      userId: 1,
      name: "Monthly Budget",
      interval: "monthly",
      budgetValue: 5000.0,
    },
  });
}

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

async function putItem(budgetid, name, price) {
  const date = new Date();
  const response = await prisma.item.create({
    data: {
      budgetId: budgetid,
      name: name,
      price: price,
      date: date,
    },
  });
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
// putItem(2, "Third item", 213.39);

// updateUserGuestStatus();
