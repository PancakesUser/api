const express = require('express');
const app = express();
const api = require('./api/v1/ritmos');
let port = 3001;

app.use('/api/v1', api);


app.listen(port, () => {
    console.log('Conectado')
});

