const commonAfip = require('./commonAfip');

module.exports = function (str) {
  const commonData = commonAfip(str);

  const specificData = {
    // Datos específicos adicionales
  };

  const objpdf = {
    ...commonData,
    razonSocial: "OBRA SOCIAL DEL PERSONAL DIRECTIVO DE LA INDUSTRIA DE LA CONSTRUCCION", // Define la razón social específica
  };

  return objpdf;
};