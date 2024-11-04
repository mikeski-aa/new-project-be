const asyncHandler = require("express-async-handler");
const { genPassword } = require("../utils/passportUtils");
const {
  createNewUser,
  getGuestInfo,
  createGuestUserAccount,
} = require("../services/userCalls");
const jwt = require("jsonwebtoken");
const {
  getStores,
  getStore,
  addStore,
  deleteStore,
  updateStore,
} = require("../services/storeCalls");
const { body, query, param, validationResult } = require("express-validator");
const { json } = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  revertQuantityUpdate,
} = require("../services/productCalls");
const {
  generateReport,
  addSoldProducts,
  deleteEodReport,
  deleteEodReportItems,
  getReportInfo,
} = require("../services/reportCalls");

const {
  createOrder,
  createOrderItem,
  getOrders,
} = require("../services/orderCalls");

const { items, carItems } = require("../populateDB/fakeItems");
const { putProduct, createStore } = require("../services/sampleDataForGuest");

exports.postRegister = asyncHandler(async (req, res, next) => {
  // validate input via middleware
  const hash = await genPassword(req.body.password);

  // call service to create new user
  const response = await createNewUser(req.body.username, hash);

  console.log(response);
  res.json(response);
});

exports.postLogin = asyncHandler(async (req, res, next) => {
  console.log("post login function entered");
  console.log(req.user.username);
  const token = jwt.sign(
    { username: req.user.username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  // define user object to return
  const returnObject = {
    username: req.user.username,
    id: req.user.id,
    isGuest: req.user.isGuest,
  };

  return res.json({ token: token, user: returnObject });
});

// get login data back to frontend
exports.getLogin = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

exports.postGuestCreate = asyncHandler(async (req, res, next) => {
  // call service to create guest account

  const token = jwt.sign(
    { username: process.env.GUEST_USER },
    process.env.TOKEN_SECRET
  );

  const guestInfo = await getGuestInfo(process.env.GUEST_USER);

  const returnObject = {
    username: guestInfo.username,
    id: guestInfo.id,
    isGuest: guestInfo.isGuest,
  };

  return res.json({ token: token, user: returnObject });
});

// TO DO:
// probably need to handle inputs to make sure they are valid
exports.getStores = [
  query("userid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    console.log("HELLO????");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("query validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }
    const stores = await getStores(req.query.userid);
    console.log("here");
    return res.json(stores);
  }),
];

// TO DO:
// probably need to handle inputs to make sure they are valid
exports.getStore = [
  query("storeid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }
    const store = await getStore(req.query.storeid);

    return res.json(store);
  }),
];

// error handling needs to be added
exports.postStore = [
  body("name").isLength({ min: 1, max: 30 }),
  body("location").isLength({ min: 1, max: 30 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }

    // call db service
    const newStore = await addStore(
      req.body.name,
      req.body.location,
      req.body.userId
    );

    return res.json(newStore);
  }),
];

// error handling needs to be added
// this should also delete all store items right?
exports.deleteStore = [
  body("userId").isNumeric(),
  body("storeId").isNumeric(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("body validation failed");
      // res.status(400).json({ message: "Input validation failed" });
      return false;
    }

    // call db service
    const storeDelete = await deleteStore(req.body.userId, req.body.storeId);

    return res.json(storeDelete);
  }),
];

exports.updateStore = [
  body("name").isLength({ min: 1, max: 30 }),
  body("location").isLength({ min: 1, max: 30 }),
  body("userid").isLength({ min: 1 }),
  body("storeid").isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const response = await updateStore(
      req.body.userid,
      req.body.storeid,
      req.body.name,
      req.body.location
    );

    return res.json(response);
  }),
];

// add new product or products to a specific store
exports.postProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body.items);

  const response = await addProduct(req.body.items);
  console.log(response);

  return res.json(response);
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const response = await deleteProduct(req.query.itemid);

  return res.json(response);
});

// we need to generate a new report
// add items to that report
// we also need to remove item quantity from the actual list of DB items
exports.createReport = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const generatedReport = await generateReport(
    req.body.storeId,
    req.body.totalValue
  );

  const addItems = await addSoldProducts(
    req.body.soldItems,
    generatedReport.id
  );

  // update store.
  // for (let x = 0; x < req.body.soldItems.length; x++) {
  //   await updateProduct(
  //     req.body.soldItems[x].sku,
  //     req.body.soldItems[x].quantitySold,
  //     req.body.storeId
  //   );
  // }

  const updatePromiseAll = req.body.soldItems.map((item) =>
    updateProduct(item.sku, item.quantitySold, item.quantity, req.body.storeId)
  );

  await Promise.all(updatePromiseAll);

  console.log(addItems);

  return res.json(generatedReport);
});

// these two controllers take care of revert and delete
exports.revertProductQuantitySold = asyncHandler(async (req, res, next) => {
  console.log(req.body.soldProducts);
  // const response = await revertQuantityUpdate()

  const updatePromiseAll = req.body.soldProducts.map((product) =>
    revertQuantityUpdate(
      product.sku,
      product.quantitySold,
      product.storeId,
      product.price,
      product.purchasePrice,
      product.category,
      product.name
    )
  );

  const response = await Promise.all(updatePromiseAll);

  return res.json(response);
});

exports.deleteReportAndItems = asyncHandler(async (req, res, next) => {
  console.log(req.body.reportid);

  await deleteEodReportItems(req.body.reportid);
  const respose = await deleteEodReport(req.body.reportid);
  return res.json(respose);
});

exports.orderCreation = asyncHandler(async (req, res, next) => {
  console.log(req.body.orderProducts);

  const totalValue = req.body.orderProducts.reduce(
    (total, current) => total + current.purchasePrice * current.quantity,
    0
  );

  console.log(totalValue);

  const response = await createOrder(
    req.body.orderProducts[0].storeId,
    totalValue
  );

  const mappedItems = req.body.orderProducts.map((item) =>
    createOrderItem(response.id, item.sku, item.quantity)
  );

  const mappedresponse = await Promise.all(mappedItems);
  console.log(response);
  console.log(mappedresponse);
  res.json("xd");
});

exports.getOrdersForStore = asyncHandler(async (req, res, next) => {
  console.log(req.query.storeid);
  const ordersForStore = await getOrders(req.query.storeid);

  console.log(ordersForStore);
  return res.json(ordersForStore);
});

exports.getReportData = asyncHandler(async (req, res, next) => {
  const reportsForStore = await getReportInfo(req.query.storeid);

  console.log("REPORTS FOR STORE /////////////////");
  console.log(reportsForStore);
  return res.json(reportsForStore);
});

// creates a new guest account every time someone clicks guest login.
exports.createGuestAccountBase = asyncHandler(async (req, res, next) => {
  const response = await createGuestUserAccount();
  const userid = response.id;

  const defaultStores = [
    { storename: "My sample store", location: "Manchester" },
    { storename: "My second store", location: "Sheffield" },
  ];

  // create fake stores
  const storeResponses = defaultStores.map((store) =>
    createStore(userid, store.storename, store.location)
  );
  const storePromise = await Promise.all(storeResponses);
  console.log(storePromise);

  // add items to fake stores
  const storeItems = await Promise.all([
    putProduct(items, storePromise[0].id),
    putProduct(carItems, storePromise[1].id),
  ]);

  const dates = [
    "01-17-2022",
    "03-21-2022",
    "05-09-2022",
    "07-15-2022",
    "09-12-2022",
    "11-18-2022",
    "01-23-2023",
    "03-05-2023",
    "05-14-2023",
    "07-11-2023",
    "09-23-2023",
    "11-08-2023",
    "02-13-2024",
    "04-17-2024",
    "06-08-2024",
    "08-14-2024",
    "10-19-2024",
    "12-25-2024",
    "03-01-2022",
    "06-10-2023",
  ];

  const reportStoreOne = dates.map((date) =>
    generateReport(
      storePromise[0].id,
      Math.floor(Math.random() * (700 - 105 + 1) + 105),
      date
    )
  );

  const reportCreated = await Promise.all(reportStoreOne);
  console.log(reportCreated);

  // const generatedReport = await generateReport(
  //   req.body.storeId,
  //   req.body.totalValue
  // );

  console.log(storeItems);

  const token = jwt.sign(
    { username: response.username },
    process.env.TOKEN_SECRET
  );

  const returnObject = {
    username: response.username,
    id: response.id,
    isGuest: response.isGuest,
  };

  return res.json({ token: token, user: returnObject });
});
