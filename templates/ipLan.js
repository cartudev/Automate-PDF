module.exports = function(str) {
    return {
      tipoFactura: tipoFactura(str),
      numeroFactura: numeroFactura(str),
      fechaFactura: fechaFactura(str),
      numeroCae: numeroCae(str),
      fechaCae: fechaCae(str),
      datosFacturados: datosFacturados(str),
      razonSocial: razonSocial()
    };
  }
  
  function tipoFactura(str) {
    return str.match(/(?<=FACTURA\n)./)[0]
  }
  
  function numeroFactura(str) {
    return str.match(/(?<=FACTURA\n.+\n.+\n.+\n.+\n.+\nN. ).+/)[0]
  }
  
  function fechaFactura(str) {
    return str.match(/(?=.+\n.+\nFecha de emisión\:)\d{2}\/\d{2}\/\d{4}/)[0]
  }
  
  function numeroCae(str) {
    return str.match(/(?<=C\.A\.E\.\: )\d+/)[0]
  }
  
  function fechaCae(str) {
    return str.match(/(?<=C\.A\.E\.\: \d+\nFecha de vencimiento\.\: )\d{2}\/\d{2}\/\d{4}/)[0]
  }
  
  function datosFacturados(str) {
    let object = str.match(/(((?<=IVA.)\d+\.?\d?(?=\%))|(Importe.\w+))|((?<=\$)\d+\,?\d+)/g)
    let obj = {
        'Abono': str.match(/(?<=Abono)\d+.\d{2}/)[0],
        'Tasas Municipales': str.match(/(?<=Tasas Municipales)\d+.\d{2}/)[0],
        'Importe Neto': str.match(/(?<=Importe Neto U\$S)(\d+\.\d{2}|\d+\,\d+\.\d{2})/)[0].replaceAll(',', ''),
        'Importe Total': str.match(/(?<=TOTAL\n.+\n.+\n.+\n.+\nU\$S)\d+\.\d{2}/)[0]
    }
    obj[str.match(/(?<=IVA\s+\()\d+/)[0]] = str.match(/(?<=IVA\s+\(\d+\%\))\d+\.\d{2}/)[0]
    return obj
}
  function razonSocial(){
    return "NSS S.A."
  }
  

  