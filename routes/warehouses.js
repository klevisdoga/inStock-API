const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehousesFile = JSON.parse(fs.readFileSync('./data/warehouses.json'));
const inventoriesFile = JSON.parse(fs.readFileSync('./data/inventories.json'));


const allWarehouses = warehousesFile.map(warehouse => warehouse = {
    name: warehouse.name,
    address: warehouse.address + ' ' + warehouse.city +  ' ' + warehouse.country,
    contactName: warehouse.contact.name,
    contactPhone: warehouse.contact.phone, 
    contactEmail: warehouse.contact.email
});

router.route('/')
    .get((req,res) => {
        res.status(200).json(allWarehouses);
    })

router.route('/:warehouseid')
    .get((req, res) => {
        const foundWarehouse = warehousesFile.find(warehouse => req.params.warehouseid === warehouse.id)
        const foundInventory = inventoriesFile.filter(inventory => req.params.warehouseid === inventory.warehouseID)
        
        const fullDetails = [{warehouse: foundWarehouse, inventory: foundInventory}]

        console.log(fullDetails)
        res.status(200).json(fullDetails);
    })

module.exports = router;