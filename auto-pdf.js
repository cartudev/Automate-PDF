const fs = require('fs');
const pdf = require('pdf-parse');
const readlineSync = require('readline-sync');
const carpetaPDFs = './carpeta_origen';
const carpetaDestino = './carpeta_destino';
const archivosPDF = fs.readdirSync(carpetaPDFs);


 
class PDFParser {
    constructor(str) {
      this.str = str;
      this.pdfType = PDFParser.detectPDFType(str);
    }

    static detectPDFType(test){
        const objRS ={
            osdic: "OBRA SOCIAL DEL PERSONAL DIRECTIVO\nDE LA INDUSTRIA DE LA CONSTRUCCION", //OSDIC
            claroInternet: "Telmex Argentina S.A.", //CLARO
            ipLan: "NSS S.A.", //IPLAN
            perezDaniel: "PEREZ DANIEL ALBERTO", 
            romeroNicolas: "ROMERO NICOLAS"
        }

        for (const tipo in objRS) {
            if (test.includes(objRS[tipo])) {

              return tipo;
            }
        }
        
    }


    parsePDF() {
        if (this.pdfType === 'perezDaniel') {
          return require('./templates/perezDaniel')(this.str);

        }
        else if (this.pdfType === 'romeroNicolas') {
          return require('./templates/romeroNicolas')(this.str);
        }

        else if (this.pdfType === 'osdic') {
          return require('./templates/osdic')(this.str);
        }

        else if (this.pdfType === 'claroInternet') {
          return require('./templates/claroInternet')(this.str);
        }
        else if (this.pdfType === 'ipLan') {
          return require('./templates/ipLan')(this.str);
        }
         else {
            throw new Error('Tipo de PDF no válido');
        }
        // Agrega más casos según sea necesario
    }
}
/* 
let dataBuffer = fs.readFileSync('./pruebaspdfs/FAC A 0002-0269 092022 PEREZ DANIEL.pdf'); //funciona
// let dataBuffer = fs.readFileSync('./pruebaspdfs/FAC A 002-1249 092023 OSDIC.pdf'); //funciona


pdf(dataBuffer)
  .then(data => {
    const pdfText = data.text;
    const pdfParser = new PDFParser(pdfText);
    const parsedData = pdfParser.parsePDF();
    // Realiza acciones con parsedData
    console.log(parsedData)
  })
  .catch(error => {
    console.error('Error al obtener el texto del PDF:', error);
  });
 */


  // Función para analizar un archivo PDF y devolver una promesa
 function analizarPDF(rutaArchivoOrigen, rutaArchivoDestino) {
  return new Promise(async (resolve, reject) => {
    // Procesar el archivo aquí
    console.log(`Procesando archivo: ${rutaArchivoOrigen}`);
    const dataBuffer = fs.readFileSync(rutaArchivoOrigen);

    // Realiza el análisis del PDF
    const parsedData = await pdf(dataBuffer)
    
    if (PDFParser.detectPDFType(parsedData.text)) {
      // El archivo fue parseado exitosamente
      console.log('Archivo parseado exitosamente.');
      
      // Mover el archivo al directorio de destino
      fs.renameSync(rutaArchivoOrigen, rutaArchivoDestino);
      console.log('Archivo movido a la carpeta de destino.');
      
      resolve(parsedData.text); // Resuelve la promesa con los datos analizados
    } else {
      console.log('No se pudo parsear el archivo.');
      reject('No se pudo parsear el archivo'); // Rechaza la promesa en caso de error
    }
  });
}

// Iterar sobre cada archivo en la carpeta de forma asincrónica
(async () => {
  for (const archivo of archivosPDF) {
    if (archivo.toLowerCase().endsWith('.pdf')) {
      const rutaArchivoOrigen = `${carpetaPDFs}/${archivo}`;
      const rutaArchivoDestino = `${carpetaDestino}/${archivo}`;

      try {
        const parsedData = await analizarPDF(rutaArchivoOrigen, rutaArchivoDestino);
        const pdfParser = new PDFParser(parsedData);
        const ObjGenerated = pdfParser.parsePDF();
        console.log(ObjGenerated)
    // Realiza acciones con parsedData
      } catch (error) {
        console.error(error);
      }

      // Esperar una tecla para continuar con el siguiente archivo
      readlineSync.question('Presiona Enter para continuar con el siguiente archivo...');
    }
  }

  console.log('Proceso completado.');
})(); 
