const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehousesFile = JSON.parse(fs.readFileSync("./data/warehouses.json"));
const inventoriesFile = JSON.parse(fs.readFileSync("./data/inventories.json"));

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

// GET OBJECT BY ID

router.get('/:id', (req, res) => {
  const individualWarehouse = warehouseList.find(warehouse => warehouse.id === req.params.id)
  const { id, name, address, city, country } = individualWarehouse
  res.json({
      id: id,
      name: name,
      address: address,
      city: city,
      country: country,
      contact: {
          name: individualWarehouse.contact.name,
          position: individualWarehouse.contact.position,
          phone: individualWarehouse.contact.phone,
          email: individualWarehouse.contact.email
      }
  })
})

// Post warehouse object 
router.post('/', (req, res) => {
  warehouseList.push(req.body);
  res.status(201).send({status:'created'});
  res.json("");
})

// Edit warehouse objects

router.put(':id', (req, res) => {
  (e.id === req.params.id) 
  
  const individualWarehouse = warehouseList.find(warehouse => warehouse.id === req.params.id)
  const editWarehouse = req.body;

  editWarehouse.id.filter((warehouse) => warehouse.req === req.params.id);
  res.status(201).send({status:'edited'});
  res.json("");

  individualWarehouse;
})

// Delete warehouses objects

const deleteWarehouse = (req, res) => {
  const getID = req.params.id;
  let deleted = warehouseData.filter(item => {
      return item.id !== getId
  });
  warehouseData = deleted;
  res.json(warehouseData);

  return router.delete("/:id", deleteWarehouse);
}
module.exports = router;
