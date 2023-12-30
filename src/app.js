const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id
app.get('/api/v1/names/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const product = productNames.find((item) => item.id === productId);

    if (product !== undefined) {
        res.status(200).json({
            status: 'success',
            message: 'Product name fetched successfully',
            data: {
                name: {
                    id: product.id,
                    name: product.name
                }
            }
        });
    } else {
        res.status(404).json({
            status: 'failure',
            message: 'Not found!'
        });
    }

});


module.exports = app;