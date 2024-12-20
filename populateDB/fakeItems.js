const items = [
  {
    SKU: "BIKE001",
    Name: "Mountain Bike",
    Price: 899.99,
    Category: "Bikes",
    Quantity: 5,
    PurchasePrice: 629.99,
  },
  {
    SKU: "BIKE002",
    Name: "Road Bike",
    Price: 1299.99,
    Category: "Bikes",
    Quantity: 3,
    PurchasePrice: 909.99,
  },
  {
    SKU: "BIKE003",
    Name: "Hybrid Bike",
    Price: 699.99,
    Category: "Bikes",
    Quantity: 7,
    PurchasePrice: 489.99,
  },
  {
    SKU: "BIKE004",
    Name: "Kids' Bike",
    Price: 299.99,
    Category: "Bikes",
    Quantity: 10,
    PurchasePrice: 209.99,
  },
  {
    SKU: "BIKE005",
    Name: "BMX Bike",
    Price: 399.99,
    Category: "Bikes",
    Quantity: 8,
    PurchasePrice: 279.99,
  },
  {
    SKU: "ACCS001",
    Name: "Helmet",
    Price: 49.99,
    Category: "Accessories",
    Quantity: 15,
    PurchasePrice: 34.99,
  },
  {
    SKU: "ACCS002",
    Name: "Bike Lights",
    Price: 29.99,
    Category: "Accessories",
    Quantity: 20,
    PurchasePrice: 20.99,
  },
  {
    SKU: "ACCS003",
    Name: "Bike Lock",
    Price: 39.99,
    Category: "Accessories",
    Quantity: 12,
    PurchasePrice: 27.99,
  },
  {
    SKU: "ACCS004",
    Name: "Bike Pump",
    Price: 14.99,
    Category: "Accessories",
    Quantity: 25,
    PurchasePrice: 10.49,
  },
  {
    SKU: "ACCS005",
    Name: "Water Bottle",
    Price: 9.99,
    Category: "Accessories",
    Quantity: 30,
    PurchasePrice: 6.99,
  },
  {
    SKU: "ACCS006",
    Name: "Bike Rack",
    Price: 79.99,
    Category: "Accessories",
    Quantity: 6,
    PurchasePrice: 55.99,
  },
  {
    SKU: "ACCS007",
    Name: "Bike Basket",
    Price: 24.99,
    Category: "Accessories",
    Quantity: 18,
    PurchasePrice: 17.49,
  },
  {
    SKU: "APPA001",
    Name: "Cycling Jersey",
    Price: 59.99,
    Category: "Apparel",
    Quantity: 10,
    PurchasePrice: 41.99,
  },
  {
    SKU: "APPA002",
    Name: "Cycling Shorts",
    Price: 49.99,
    Category: "Apparel",
    Quantity: 12,
    PurchasePrice: 34.99,
  },
  {
    SKU: "APPA003",
    Name: "Cycling Gloves",
    Price: 24.99,
    Category: "Apparel",
    Quantity: 15,
    PurchasePrice: 17.49,
  },
  {
    SKU: "APPA004",
    Name: "Cycling Shoes",
    Price: 129.99,
    Category: "Apparel",
    Quantity: 4,
    PurchasePrice: 90.99,
  },
  {
    SKU: "ACCS008",
    Name: "Bike Repair Kit",
    Price: 19.99,
    Category: "Accessories",
    Quantity: 20,
    PurchasePrice: 13.99,
  },
  {
    SKU: "ACCS009",
    Name: "Bike Chain",
    Price: 12.99,
    Category: "Accessories",
    Quantity: 30,
    PurchasePrice: 9.09,
  },
  {
    SKU: "ACCS010",
    Name: "Bike Tires",
    Price: 39.99,
    Category: "Accessories",
    Quantity: 8,
    PurchasePrice: 27.99,
  },
  {
    SKU: "ACCS011",
    Name: "Inner Tubes",
    Price: 7.99,
    Category: "Accessories",
    Quantity: 25,
    PurchasePrice: 5.59,
  },
];

const carItems = [
  {
    SKU: "CAR001",
    Name: "Engine Oil",
    Price: 29.99,
    Category: "Engine",
    Quantity: 100,
    PurchasePrice: 19.49,
  },
  {
    SKU: "CAR002",
    Name: "Brake Pads",
    Price: 59.99,
    Category: "Brakes",
    Quantity: 50,
    PurchasePrice: 38.99,
  },
  {
    SKU: "CAR003",
    Name: "Spark Plugs",
    Price: 19.99,
    Category: "Engine",
    Quantity: 75,
    PurchasePrice: 12.99,
  },
  {
    SKU: "CAR004",
    Name: "Air Filter",
    Price: 24.99,
    Category: "Engine",
    Quantity: 60,
    PurchasePrice: 16.24,
  },
  {
    SKU: "CAR005",
    Name: "Fuel Filter",
    Price: 16.99,
    Category: "Engine",
    Quantity: 80,
    PurchasePrice: 11.04,
  },
  {
    SKU: "CAR006",
    Name: "Battery",
    Price: 99.99,
    Category: "Electrical",
    Quantity: 30,
    PurchasePrice: 64.99,
  },
  {
    SKU: "CAR007",
    Name: "Headlights",
    Price: 79.99,
    Category: "Lighting",
    Quantity: 40,
    PurchasePrice: 51.99,
  },
  {
    SKU: "CAR008",
    Name: "Taillights",
    Price: 69.99,
    Category: "Lighting",
    Quantity: 50,
    PurchasePrice: 45.49,
  },
  {
    SKU: "CAR009",
    Name: "Tires",
    Price: 129.99,
    Category: "Wheels & Tires",
    Quantity: 20,
    PurchasePrice: 84.49,
  },
  {
    SKU: "CAR010",
    Name: "Rims",
    Price: 299.99,
    Category: "Wheels & Tires",
    Quantity: 15,
    PurchasePrice: 194.99,
  },
  {
    SKU: "CAR011",
    Name: "Windshield Wipers",
    Price: 14.99,
    Category: "Exterior",
    Quantity: 100,
    PurchasePrice: 9.74,
  },
  {
    SKU: "CAR012",
    Name: "Floor Mats",
    Price: 39.99,
    Category: "Interior",
    Quantity: 80,
    PurchasePrice: 25.99,
  },
  {
    SKU: "CAR013",
    Name: "Steering Wheel Cover",
    Price: 19.99,
    Category: "Interior",
    Quantity: 60,
    PurchasePrice: 12.99,
  },
  {
    SKU: "CAR014",
    Name: "Seat Covers",
    Price: 59.99,
    Category: "Interior",
    Quantity: 40,
    PurchasePrice: 38.99,
  },
  {
    SKU: "CAR015",
    Name: "Car Wash Kit",
    Price: 24.99,
    Category: "Maintenance",
    Quantity: 120,
    PurchasePrice: 16.24,
  },
  {
    SKU: "CAR016",
    Name: "First Aid Kit",
    Price: 19.99,
    Category: "Safety",
    Quantity: 50,
    PurchasePrice: 12.99,
  },
  {
    SKU: "CAR017",
    Name: "Fire Extinguisher",
    Price: 29.99,
    Category: "Safety",
    Quantity: 30,
    PurchasePrice: 19.49,
  },
  {
    SKU: "CAR018",
    Name: "Car Jump Starter",
    Price: 49.99,
    Category: "Electrical",
    Quantity: 20,
    PurchasePrice: 32.49,
  },
  {
    SKU: "CAR019",
    Name: "GPS Navigation System",
    Price: 199.99,
    Category: "Electronics",
    Quantity: 10,
    PurchasePrice: 129.99,
  },
  {
    SKU: "CAR020",
    Name: "Rearview Camera",
    Price: 99.99,
    Category: "Electronics",
    Quantity: 15,
    PurchasePrice: 64.99,
  },
];

function purchasePrice(items) {
  for (let x = 0; x < items.length; x++) {
    items[x] = {
      ...items[x],
      PurchasePrice: Math.round(items[x].Price * 0.65 * 100) / 100,
    };
  }

  console.log(items);
}

module.exports = { items, carItems };
