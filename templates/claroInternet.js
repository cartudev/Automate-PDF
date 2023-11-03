module.exports = function(str) {
    return {
      tipoFactura: tipoFactura(str),
      numeroFactura: numeroFactura(str),
      fechaFactura: fechaFactura(str),
      numeroCae: numeroCae(str),
      fechaCae: fechaCae(str),
      datosFacturados: datosFacturados(str),
      razonSocial: razonSocial(),
      rsSoft: rsSoft(),
      fechaContable: fechaContable(str),
      condicionCompra: condicionCompra(),
      descripcionCuenta: descripcionCuenta()
    };
  }
  
  function tipoFactura(str) {
    return str.match(/(?=.+\n.+\nFactura\n)./)[0]
  }
  
  function numeroFactura(str) {
    return str.match(/(?<=Factura N.\n.+\n.+\n).+/)[0]
  }
  
  function fechaFactura(str) {
    return str.match(/(?<=Fecha de Emisión.\n.+\n.+\n).+/)[0].replaceAll('.', '')
  }
  
  function numeroCae(str) {
    return str.match(/(?<=C\.A\.E\.\sN.\s)\d+/)[0]
  }
  
  function fechaCae(str) {
    return str.match(/(?<=C\.A\.E\.\sN.\s\d+\sVto\.\s)\d{2}\.\d{2}\.\d{4}/)[0].replaceAll('.', '')
  }
  
  function datosFacturados(str) {
    let object = str.match(/(((?<=IVA.)\d+\.?\d?(?=\%))|(Importe.\w+))|((?<=\$)\d+\,?\d+)/g)
    let obj = {
        'Importe Neto': str.match(/(?<=Detalle de impuestosMonto BaseAlic\.Monto ImpuestoDetalle de impuestosMonto BaseAlic\.Monto Impuesto\nIVA. +)(\d+\,\d{2}|\d+.\d+\,\d{2})/)[0].replaceAll('.', '').replaceAll(',', '.'),
        'Importe Total': str.match(/(?<=TOTAL A PAGAR\$ +)(\d+\,\d{2}|\d+.\d+\,\d{2})/)[0].replaceAll('.', '').replaceAll(',', '.')
    }
    obj[str.match(/(?<=Detalle de impuestosMonto BaseAlic\.Monto ImpuestoDetalle de impuestosMonto BaseAlic\.Monto Impuesto\nIVA. +(\d+\,\d{2}|\d+.\d+\,\d{2}) +)\d+\,\d+/)[0]] = str.match(/(?<=Detalle de impuestosMonto BaseAlic\.Monto ImpuestoDetalle de impuestosMonto BaseAlic\.Monto Impuesto\nIVA. +(\d+\,\d{2}|\d+.\d+\,\d{2}) +\d+\,\d+.+%. +)(\d+\,\d{2}|\d+.\d+\,\d{2})/)[0].replaceAll('.', '').replaceAll(',', '.')
    return obj
}
  function razonSocial(){
    return "Telmex Argentina S.A."
  }
  function rsSoft(){
    return "TELMEX ARGENTINA SA"
  }  
  function condicionCompra(){
    return "3"
  }  
  function descripcionCuenta(){
    return "GASTOS DE INTERNET"
  }  

  function fechaContable(str) {
    
    let ano = parseInt(str.match(/(?<=Fecha de Emisión.\n.+\n.+\n\d{2}.\d{2}.)\d{4}/)[0])
    let mes = parseInt(str.match(/(?<=Fecha de Emisión.\n.+\n.+\n\d{2}.)\d{2}/)[0])
    mes = (mes +1)%13
    if(mes === 0){mes = 1; ano = ano + 1};
    if(mes.toString().length == 1){mes = '0' + mes.toString()}
    else{mes = mes.toString()};
    ano = ano.toString();
    let dia = '01'

    return dia+mes+ano
  
  
}