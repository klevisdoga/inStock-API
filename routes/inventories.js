const express = require("express");
const router = express.Router();
const fs = require("fs");
const inventoriesFile = JSON.parse(fs.readFileSync("./data/inventories.json"));

router.route("/")
    .get((req, res) => {
        console.log(inventoriesFile)
        res.json(inventoriesFile).status(200);
    })

router.route("/:inventoryid")
    .get((req, res) => {

        const foundInventory = inventoriesFile.find(
        (inventory) => req.params.inventoryid === inventory.id
        );

        console.log(foundInventory);
        res.status(200).json(foundInventory);

    })

module.exports = router;
