const commonAfip = require('./commonAfip');

module.exports = function (str) {
  const commonData = commonAfip(str);

  const specificData = {
    // Datos específicos adicionales
  };

  const objpdf = {
    ...commonData,
    razonSocial: "ROMERO NICOLAS", // Define la razón social específica
  };

  return objpdf;
};