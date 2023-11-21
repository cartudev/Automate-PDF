const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const download = require('download');
const archiver = require('archiver');
const keypress = require('keypress');
const readline = require('readline');



// Ruta al archivo JAR de SikuliX
const sikuliJarPath = './module_sikuli/sikulixide-2.0.5.jar';

// URL de descarga del archivo JAR de SikuliX
const sikuliJarUrl = 'https://launchpadlibrarian.net/526041591/sikulixide-2.0.5.jar';

// Ruta a la carpeta que contiene los scripts de SikuliX
const sikuliScriptsFolder = './module_sikuli/scripts/';




async function generateModel(obj, num) {
    return new Promise(async (resolve, reject) => {
      
      // Ruta de la carpeta que contiene los archivos que deseas comprimir
      const carpetaOrigen = './module_sikuli/sikuli_model_base';

      fs.ensureDirSync(sikuliScriptsFolder)
      // Ruta del archivo ZIP resultante
      const archivoZip = './module_sikuli/scripts/sikuli_model_base'+num+'.zip';
  
      // Ruta de la carpeta temporal donde se copiarán los archivos
      const carpetaTemporal = './temp';
  
      // Origen Script
      //const fileScript = carpetaTemporal + '/sikuli_model_base.py';
  
      const archivoOriginal = carpetaTemporal + '/sikuli_model_base.py';
      const archivoRenombrado = carpetaTemporal + '/sikuli_model_base'+num+'.py';


      fs.ensureDirSync(carpetaTemporal);
  
      // Copia los archivos a una carpeta temporal
      fs.copySync(carpetaOrigen, carpetaTemporal);
  
      async function renombrarArchivo(archivoOriginal, archivoRenombrado) {
        try {
          await fs.rename(archivoOriginal, archivoRenombrado);
          console.log('Archivo renombrado con éxito.');
        } catch (error) {
          console.error('Error al cambiar el nombre del archivo:', error);
        }
      }
      
      await renombrarArchivo(archivoOriginal, archivoRenombrado);

      try {
        await fsedit(archivoRenombrado, obj);
  
        // Crear un flujo de salida para el archivo ZIP
        const output = fs.createWriteStream(archivoZip);
  
        // Crear un objeto archiver
        const archive = archiver('zip', {
          zlib: { level: 0 } // Nivel de compresión máximo
        });
  
        // Enlazar el flujo de salida al archiver
        archive.pipe(output);
  
        // Agregar los archivos de la carpeta temporal al archivo ZIP
        archive.directory(carpetaTemporal, false);
  
        // Finalizar el archivo ZIP
        archive.finalize();
  
        output.on('close', () => {
          console.log('Archivo ZIP creado con éxito.');
  
          // Cambiar la extensión del archivo ZIP (opcional)
          const nuevoNombre = archivoZip.replace('.zip', '.skl');
          fs.rename(archivoZip, nuevoNombre, (err) => {
            if (err) {
              console.error('Error al cambiar la extensión:', err);
              reject(err);
            } else {
              console.log('Extensión cambiada a .skl');
              
              // Eliminar la carpeta temporal después de cambiar la extensión del archivo
              fs.removeSync(carpetaTemporal);
  
              resolve(); // Resuelve la Promise cuando ha finalizado
            }
          });
        });
      } catch (error) {
        console.error('Error al escribir en el archivo Python:', error);
        reject(error);
      }
    });
  }
  



    function variables(obj, num){
        let string = `
        
tipoFactura = '${obj.tipoFactura || 'A'}';
numeroFactura = '${obj.numeroFactura}'
fechaFactura = '${obj.fechaFactura}'
numeroCae = '${obj.numeroCae}'
fechaCae = '${obj.fechaCae}'

importeNeto = '${obj.datosFacturados.importeNeto}'
importeTotal = '${obj.datosFacturados.importeTotal}'
tipoIva1 = '${obj.datosFacturados.tipoIva1 || ''}'
cantidadIva1 = '${obj.datosFacturados.montoIva1 || ''}'
tipoIva2 = '${obj.datosFacturados.tipoIva2 || ''}'
cantidadIva2 = '${obj.datosFacturados.montoIva2 || ''}'
tipoIva3 = '${obj.datosFacturados.tipoIva3 || ''}'
cantidadIva3 = '${obj.datosFacturados.montoIva3 || ''}'

impuestoInterno = '${obj.datosFacturados.impuestoInterno || ''}'
percepcionIBCba = '${obj.datosFacturados.percepcionIBCba || ''}'
percepcionIBCaba = '${obj.datosFacturados.percepcionIBCaba || ''}'
percepcionMunCba = '${obj.datosFacturados.percepcionMunCba || ''}'


jurisdiccion = '${obj.jurisdiccion || 'cordoba'}'


razonSocial = '${obj.razonSocial}'
rsSoft = '${obj.rsSoft || obj.razonSocial}'
fechaContable = '${obj.fechaContable || obj.fechaFactura}'
condicionCompra = '${obj.condicionCompra || '3'}'
descripcionCuenta = '${obj.descripcionCuenta}'

numberPDF ='${num || 1}'
        `
        return string
    }

async function fsedit(file, str){

    fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo Python:', err);
        return;
    }

    // Busca el inicio y fin de las líneas a modificar
    const inicioComentario = '##Inicio variables';
    const finComentario = '##Final variables';
    const inicioIndice = data.indexOf(inicioComentario);
    const finIndice = data.indexOf(finComentario);

    if (inicioIndice !== -1 && finIndice !== -1) {
        // Extrae las líneas a modificar
        const lineasAModificar = data.substring(inicioIndice, finIndice + finComentario.length);
        
        // patrón para capturar el contenido entre los comentarios
        const patron = new RegExp(`${inicioComentario}([\\s\\S]*?)${finComentario}`);
    
        
        // Reemplaza las líneas originales con las modificadas
        data = data.replace(patron, `${inicioComentario}\n${str}\n${finComentario}`);

        // Escribe el contenido modificado en el archivo Python
        fs.writeFile(file, data, 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo Python:', err);
            return;
        }
        console.log('Archivo Python modificado con éxito.');
        });
    } else {
        console.log('No se encontraron las líneas a modificar.');
    }
    });
}




// Función principal para ejecutar SikuliX con múltiples scripts
async function ejecutarSikuliXConScripts() {
  // Comprobar y descargar el archivo JAR antes de continuar
  await descargarSikuliJar();

    // Obtener la lista de archivos en el directorio de scripts
    const listaDeScripts = obtenerScriptsEnDirectorio();

    // Construir el comando para ejecutar SikuliX con los scripts
    
    const scriptPaths = listaDeScripts.map(script => path.join(sikuliScriptsFolder, script));
    const scriptPathsWithPrefix = scriptPaths.map(scriptPath => `./${scriptPath}`);
    const command = `java -jar ${sikuliJarPath} -r ${scriptPathsWithPrefix.join(' ')}`;

    // Ejecutar el comando
    return new Promise((resolve, reject) => {
      // Ejecutar el comando
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar SikuliX: ${error.message}`);
          reject(error);
        } else {
          console.log(`SikuliX ejecutado exitosamente. Salida: ${stdout}`);
          resolve();
        }
      });
    });
  }
  

// Función para descargar el archivo JAR si no existe
// Función para descargar el archivo JAR si no existe
// Función para descargar el archivo JAR si no existe
async function descargarSikuliJar() {
  // Devuelve una Promesa que se resolverá después de la descarga
  return new Promise(async (resolve) => {
    // Crear una interfaz de lectura
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Pregunta al usuario
    rl.question('Presiona "Enter" para aceptar o "Escape" para cancelar...', async function (answer) {
      if (answer.trim().toLowerCase() === '') {
        console.log('Descarga aceptada.');

        // Verificar si Java está instalado
        const javaVersion = await obtenerVersionJava();
        if (!javaVersion) {
          console.error('Java no está instalado. Por favor, instala Java antes de continuar.');
          process.exit();
        }

        // Descargar SikuliX JAR
        if (!fs.existsSync(sikuliJarPath)) {
          console.log('Descargando SikuliX JAR...');
          // Ajusta la ruta de descarga según sea necesario
          await download(sikuliJarUrl, '/module_sikuli/');
          console.log('SikuliX JAR descargado con éxito.');
        }

        // Cerrar la interfaz de lectura
        rl.close();

        resolve(); // Resolver la Promesa después de la descarga
      } else {
        console.log('Descarga cancelada.');
        process.exit();
      }
    });
  });
}

function obtenerScriptsEnDirectorio() {
  const archivosEnDirectorio = fs.readdirSync(sikuliScriptsFolder);
  return archivosEnDirectorio.filter(archivo => archivo.endsWith('.skl'));
}

async function obtenerVersionJava() {
  return new Promise((resolve, reject) => {
    exec('java -version', (error, stdout, stderr) => {
      if (error) {
        console.log('Error al ejecutar java -version:', stderr);
        resolve(null);
      } else {
        resolve(true);
      }
    });
  });
}

// Llamar a la función principal para ejecutar SikuliX con múltiples scripts
//ejecutarSikuliXConScripts();



module.exports = {generateModel, variables, ejecutarSikuliXConScripts}