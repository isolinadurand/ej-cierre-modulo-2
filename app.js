
const Car = require('./src/models/car');
const { listaDeVentas } = require('./src/services/carServices');
let conces = require('./src/services/carServices');

let argumentos = process.argv

switch (argumentos[2]) {
    case 'listar':
        // muestra los autos en la bd de la consesionaria
        let listadoAuto = conces.leerAutos()
        console.log('Listado de autos de la concesionaria');
        console.log('------- -- ----- -- -- -------------');

         listadoAuto.forEach( auto => {
          console.log(`Marca: ${auto.marca} - Modelo: ${auto.modelo} - Color: ${auto.color} - Año: ${auto.anio} - Kilometros: ${auto.km} - Precio: ${auto.precio} - Cuotas: ${auto.cuotas} - Patente: ${auto.patente} - Vendido ${auto.vendido}`)
       });
        break;

    case 'vender':
        // cambia el campo de vendido de false a true recibe de parametro la patente
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
        // me muestra solamente los autos que tienen en vendido false
        let autosAVender = conces.buscarAutosAVender();
        console.log(autosAVender)
        break;
    
    case 'autos a vender 0':
        // me muestra los vendidos en false y que además son 0 km
        let autosAVender0 = conces.buscarAutosAVender0();
        console.log(autosAVender0)
        break;
    
    case 'monto ventas':
        // me muestra el valor por el cual los autos fueron vendidos
        let arrayVentas = conces.listaDeVentas();
        console.log('esta es la lista con montos de autos vendidos');
        arrayVentas.forEach(function(venta){ console.log(venta)})
        break;

    case 'total ventas':
        // me suma y muestra el total de los autos vendidos
        let sumaTotal = conces.totalVentas();
        console.log(`La suma total en ventas de automóviles es: ${sumaTotal}`)
        break;

    case 'puede comprar':
        // muestra si un cliente puede pagar un auto
    let puedeComprar = conces.puedeComprar(argumentos[3], argumentos[4])
    console.log(puedeComprar)
    break;

    case 'autos que puede comprar':
        // de acuerdo a los ingresos del cliente muestra que autos puede comprar
    let autosQuePuedeComprar = conces.autosQuePuedeComprar(argumentos[3])
    console.log(autosQuePuedeComprar)
    break;

    
}



