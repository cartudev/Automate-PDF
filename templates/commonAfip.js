function commonAfip(str) {
    return {
      tipoFactura: tipoFactura(str),
      numeroFactura: numeroFactura(str),
      fechaFactura: fechaFactura(str),
      numeroCae: numeroCae(str),
      fechaCae: fechaCae(str),
      datosFacturados: datosFacturados(str),
      descripcionCuenta: descripcionCuenta()
    };
  }
  
  function tipoFactura(str) {
    return str.match(/(?<=FACTURA\n)\w/)[0];
  }
  
  function numeroFactura(str) {
    return str.match(/(?<=Punto de Venta:Comp. Nro:\n)\d+/)[0];
  }
  
  function fechaFactura(str) {
    return str.match(/^((\d\d)\/(\d\d)\/(\d\d\d\d))$/m)[0].replaceAll('/', '')
  }
  
  function numeroCae(str) {
    return str.match(/(?<=CAE N\°\:\n.+\n.+\n.+\n.+\n)\d+/)[0];
  }
  
  function fechaCae(str) {
    return str.match(/(?<=Fecha de Vto\. de CAE\:\n.+\n.+\n)\d{2}\/\d{2}\/\d{4}/)[0].replaceAll('/', '')
  }
  
  function datosFacturados(str) {
    const object = str.match(/(((?<=IVA.)\d+\.?\d?(?=\%))|(Importe.\w+))|((?<=\$)\d+\,?\d+)/g);
    const obj = {};
    let arr = []
    for (let i = 0; object.length > i; i++) {
      if (i % 2 === 0 && object[i + 1] !== '0,00') {

        obj['$'+object[i]] = object[i + 1].replaceAll(',', '.');
      }
    }
    for (var key in obj){
      let newKey = key.match(/(?<=\$).+/)[0]
      arr.push(newKey);
      arr.push(obj[key])
    }
    obj2 = {
      'montoIva1' : arr[3],
      'tipoIva1' : arr[2],
      'importeNeto' : arr[1],
      'importeTotal' : arr[5],
    }
    return obj2;
  }

  function descripcionCuenta(){
    return "PROVEEDOR"
  }  
  
  module.exports = commonAfip;
  