const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error_handler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Server activo');
});

routerApi(app);

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
})