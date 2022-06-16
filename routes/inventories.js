const express = require("express");
const router = express.Router();
const fs = require("fs");
const inventoriesFile = JSON.parse(fs.readFileSync("./data/inventories.json"));
const {v4: uuid} = require('uuid')

router.route("/")
    .get((req, res) => {
        console.log(inventoriesFile)
        res.json(inventoriesFile).status(200);
    })
    .post((req, res) => {
        const newInventoryItem = {
            ...req.body,
            id: uuid()
        };

        let updatedInventoryItem = [...inventoriesFile, newInventoryItem];
        fs.writeFileSync(
            "./data/inventories.json",
            JSON.stringify(updatedInventoryItem)
        );
        res.status(201).json(updatedInventoryItem);
    });

router.route("/:inventoryid")
    .get((req, res) => {

        const foundInventory = inventoriesFile.find(
            (inventory) => req.params.inventoryid === inventory.id
        );

        console.log(foundInventory);
        res.status(200).json(foundInventory);

    })

router.delete("/:inventoryId/delete", (req, res) => {
    const { inventoryId } = req.params;

    const deleteInventory = inventoriesFile.filter(
        (inventory) => inventory.id !== inventoryId
    );

    fs.writeFileSync("./data/inventories.json", JSON.stringify(deleteInventory));

    res.status(204).json(deleteInventory);
});

module.exports = router;
