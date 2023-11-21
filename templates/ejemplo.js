const commonAfip = require('./commonAfip');

module.exports = function (str) {
  const commonData = commonAfip(str);

  const specificData = {
    // Datos específicos adicionales
  };

  const objpdf = {
    ...commonData,
    razonSocial: "COOPERATIVA DE TRABAJO OTRA", // Define la razón social específica
  };

  return objpdf;
};