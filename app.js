
const Car = require('./src/models/car');
const { listaDeVentas } = require('./src/services/carServices');
let conces = require('./src/services/carServices');

let argumentos = process.argv

switch (argumentos[2]) {
    case 'listar':
        let listadoAuto = conces.leerAutos()
        console.log('Listado de autos de la concesionaria');
        console.log('------- -- ----- -- -- -------------');
      //  console.log(listadoAuto)
         listadoAuto.forEach( auto => {
          console.log(`Marca: ${auto.marca} - Modelo: ${auto.modelo} - Color: ${auto.color} - Año: ${auto.anio} - Kilometros: ${auto.km} - Precio: ${auto.precio} - Cuotas: ${auto.cuotas} - Patente: ${auto.patente} - Vendido ${auto.vendido}`)
       });
        break;

    case 'vender':
        let mensaje1 = conces.buscarAutoPorPat(argumentos[3]);
        console.log(mensaje1)
        break;
    case 'agregar':
        // crear nuevo auto
        let auto = new Car(argumentos[3], argumentos[4], argumentos[5],parseInt(argumentos[6]), parseInt(argumentos[7]), parseInt(argumentos[8]), parseInt(argumentos[9]), argumentos[10], argumentos[11]);
        
        let mensaje = conces.grabarAuto(auto)
        console.log(mensaje);
       
       break;
    case 'autos a vender':
        let autosAVender = conces.buscarAutosAVender();
        console.log(autosAVender)
        break;
    
    case 'autos a vender 0':
        let autosAVender0 = conces.buscarAutosAVender0();
        console.log(autosAVender0)
        break;
    
    case 'monto ventas':
        let arrayVentas = conces.listaDeVentas();
        console.log('esta es la lista con montos de autos vendidos');
        arrayVentas.forEach(function(venta){ console.log(venta)})
        break;

    case 'total ventas':
        let sumaTotal = conces.totalVentas();
        console.log(`La suma total en ventas de automóviles es: ${sumaTotal}`)
        break;

    case 'puede comprar':
    let puedeComprar = conces.puedeComprar(argumentos[3], argumentos[4])
    console.log(puedeComprar)
    break;

    case 'autos que puede comprar':
    let autosQuePuedeComprar = conces.autosQuePuedeComprar(argumentos[3])
    console.log(autosQuePuedeComprar)
    break;

    
}



