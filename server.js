const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {

    try {

        const { data } = await axios('https://jsonplaceholder.typicode.com/users');

        return res.send(data);

    } catch (error) {

        console.error(error);
        return res.send({error: 'Error to request'});

    }

});


app.listen(3000);