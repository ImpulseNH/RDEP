const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server activo');
});

routerApi(app);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
})