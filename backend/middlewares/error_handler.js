function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  else
    next(err);
}

function logErrors (err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler (err, req, res, next) {
    res.status(500).json({
        message: "Ha ocurrido un error interno del servidor"
    })
}

module.exports = { boomErrorHandler, logErrors, errorHandler }