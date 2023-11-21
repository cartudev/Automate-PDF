##Inicio variables
tipoFactura = '',
numeroFactura = ''
fechaFactura = ''
numeroCae = ''
fechaCae = ''

importeNeto = ''
importeTotal = ''
tipoIva1 = ''
cantidadIva1 = ''
tipoIva2 = ''
cantidadIva2 = ''
tipoIva3 = ''
cantidadIva3 = ''

impuestoInterno = ''
percepcionIBCba = ''
percepcionIBCaba = '' 
percepcionMunCba = ''


jurisdiccion = ''


razonSocial = ''
rsSoft = '',
fechaContable = '',
condicionCompra = '',
descripcionCuenta = ''

##Final variables


patron1 = "1700060511043.png"

string ="""
para probar debes ingresar a
https://docs.google.com/spreadsheets/d/1QVxjfhclI3OaVfrlXSvMEzZ3jH75WkDvR-oMfAWgszE/edit?usp=sharing
Razon social %s.
Tipo de factura %s.
Numero de factura %s.
Importe Neto %s.
Importe Total %s.
Desea continuar con la carga de información?
""" % (razonSocial, tipoFactura, numeroFactura,  importeNeto, importeTotal)

answer = popAsk(string)


def repeatRArrow():
    for i in range(int(numberPDF)):
        type(Key.RIGHT)


rsPos = -4, -104
tiPos = -4, 132
ftPos = -4, 159
def test():
    if wait(patron1, 10):
        posPatron = find(patron1).getTarget()
        click(posPatron.offset(-4, -104))
        repeatRArrow()
        
        # Espera hasta que la condición de check sea verdadera o hasta que pasen 100 segundos
        
        type(Key.ENTER)
        paste(rsSoft)
        type(Key.ENTER)
        type(fechaFactura[0] + fechaFactura[1] + Key.DIVIDE + fechaFactura[2] + fechaFactura[3] + Key.DIVIDE + fechaFactura[4] + fechaFactura[5] + fechaFactura[6] + fechaFactura[7])
        type(Key.ENTER)
        type(fechaCae[0] + fechaCae[1] + Key.DIVIDE + fechaCae[2] + fechaCae[3] + Key.DIVIDE + fechaCae[4] + fechaCae[5] + fechaCae[6] + fechaCae[7])
        click(posPatron.offset(-4, 3))
        repeatRArrow()
        type(Key.ENTER)
        if importeNeto != '':
            paste(importeNeto)
            type(Key.ENTER)
        if tipoIva1 != '':
            type(Key.ENTER)
            paste('iva del ' +tipoIva1+ "%")
            type(Key.ENTER)
        if cantidadIva1 != '':
            type(Key.ENTER)
            paste(cantidadIva1)
            type(Key.ENTER)
        if tipoIva2 != '':
            paste('iva del ' +tipoIva2+ "%")
            type(Key.ENTER)
        if cantidadIva2 != '':
            type(Key.ENTER)
            paste(cantidadIva2)
            type(Key.ENTER)
        if tipoIva3 != '':
            paste('iva del ' +tipoIva3+ "%")
            type(Key.ENTER)
        if cantidadIva3 != '':
            type(Key.ENTER)
            paste(cantidadIva3)
            type(Key.ENTER)
        click(posPatron.offset(-4, 160))               
        repeatRArrow()
        type(Key.ENTER)
        paste(importeTotal)

if answer:
    test()

    
#if wait(patron1, 10):
#   posPatron = find(patron1).getTarget()
#    click(posPatron.offset(-4, 160))               