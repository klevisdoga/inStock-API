const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehousesFile = JSON.parse(fs.readFileSync('./data/warehouses.json'));

const allWarehouses = warehousesFile.map(warehouse => warehouse = {
    name: warehouse.name,
    address: warehouse.address + ' ' + warehouse.city +  ' ' + warehouse.country,
    contactName: warehouse.contact.name,
    contactPhone: warehouse.contact.phone, 
    contactEmail: warehouse.contact.email
});

router.get('/', (req,res) => {
    res.status(200).json(allWarehouses);
})

module.exports = router;