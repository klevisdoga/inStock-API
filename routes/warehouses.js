const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehousesFile = JSON.parse(fs.readFileSync("./data/warehouses.json"));
const inventoriesFile = JSON.parse(fs.readFileSync("./data/inventories.json"));
const { v4: uuid } = require("uuid");

const allWarehouses = warehousesFile.map(
  (warehouse) =>
    (warehouse = {
      name: warehouse.name,
      address:
        warehouse.address + " " + warehouse.city + " " + warehouse.country,
      contactName: warehouse.contact.name,
      contactPhone: warehouse.contact.phone,
      contactEmail: warehouse.contact.email,
      id: warehouse.id,
    })
);

// Gabe
router.route("/").get((req, res) => {
  res.status(200).json(allWarehouses);
});

router.route("/:warehouseid").get((req, res) => {
  const foundWarehouse = warehousesFile.find(
    (warehouse) => req.params.warehouseid === warehouse.id
  );
  const foundInventory = inventoriesFile.filter(
    (inventory) => req.params.warehouseid === inventory.warehouseID
  );

  const fullDetails = [
    { warehouse: foundWarehouse, inventory: foundInventory },
  ];

  console.log(fullDetails);
  res.status(200).json(fullDetails);
});

// Post warehouse object
router.post("/", (req, res) => {
  const newWarehouse = { ...req.body, id: uuid() };

  let updatedWarehouses = [...warehousesFile, newWarehouse];
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(updatedWarehouses));
  res.status(201).json(updatedWarehouses);
});

// Edit warehouse objects -- unfinished
router.put("/:warehouseId/edit", (req, res) => {
  // // const updateWarehouse = (id, rating)
  // const updatedWarehouses = warehousesFile.map(warehouse => {
  //   if (warehouse.id = id)
  // })
  // console.log(req.params);
  // console.log(req.body);
  // res.send("Success");
});

// // Delete warehouses objects

// const deleteWarehouse = (req, res) => {
//   const getId = req.params.id;
//   let deleted = warehouseData.filter((item) => {
//     return item.id !== getId;
//   });

// //   warehouseData = deleted;
// //   res.json(warehouseData);

//   return router.delete("/:id", deleteWarehouse);
// };
module.exports = router;
