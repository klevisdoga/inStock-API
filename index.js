const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const warehousesRoute = require('./routes/warehouses')
app.use('/warehouses', warehousesRoute)

app.listen(8080, () => {
    console.log('server is listening!')
})