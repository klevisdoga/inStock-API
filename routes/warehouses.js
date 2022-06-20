const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehousesFile = JSON.parse(fs.readFileSync("./data/warehouses.json"));
const inventoriesFile = JSON.parse(fs.readFileSync("./data/inventories.json"));
const { v4: uuid } = require("uuid");

// Warehouse — Get, Post
router
  .route("/")
  .get((req, res) => {
    res.status(200).json(warehousesFile);
  })
  // Post warehouse object
  .post((req, res) => {
    const newWarehouse = {
      id: uuid(),
      ...req.body,
    };

    let updatedWarehouses = [...warehousesFile, newWarehouse];
    fs.writeFileSync(
      "./data/warehouses.json",
      JSON.stringify(updatedWarehouses)
    );
    res.status(201).json(updatedWarehouses);
  });

router.route("/:warehouseid").get((req, res) => {
  const foundWarehouse = warehousesFile.find(
    (warehouse) => req.params.warehouseid === warehouse.id
  );
  const foundInventory = inventoriesFile.filter(
    (inventory) => req.params.warehouseid === inventory.warehouseID
  );

  const fullDetails = [
    {
      warehouse: foundWarehouse,
      inventory: foundInventory,
    },
  ];

  console.log(fullDetails);
  res.status(200).json(fullDetails);
});

// Warehouse — Delete
router.delete("/:warehouseId/delete", (req, res) => {
  const { warehouseId } = req.params;

  const deleteWarehouse = warehousesFile.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(deleteWarehouse));

  res.status(204).json(deleteWarehouse);
});

// Warehouse — Edit
router.put("/:warehouseId/edit", (req, res) => {
  const { warehouseId } = req.params;
  const warehouseInfo = req.body;

  let editWarehouse = warehousesFile.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  const newData = editWarehouse.flat();
  const updatedWarehouse = {
    id: warehouseId,
    ...warehouseInfo,
  };
  newData.push(updatedWarehouse);

  console.log(newData);

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(newData));

  res.status(201).json(newData);
});

module.exports = router;
