const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehouseList = JSON.parse(fs.readFileSync("./warehouses.json"));
const  { warehouseData } = require("../data/data")


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

module.exports = router