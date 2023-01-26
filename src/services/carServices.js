let autos = require('../database/Cars.json');
const fs = require('fs');
const path = require('path');
let clientes = require('../database/clients.json')

let concesionaria = {
    autos: autos,
    clientes: clientes,
    fileName: path.resolve(__dirname, '../database/Cars.json'),
    FileNameCli: path.resolve(__dirname, '../database/clients.json'),
    leerAutos: function(){
        let listadoAutosEnJson = fs.readFileSync(this.fileName);
        let listadoAuto = JSON.parse(listadoAutosEnJson);
        return listadoAuto
    },
    buscarAutoPorPat: function(patente){
        // leer autos
        let listadoAuto =this.leerAutos()
        

        //recorrer array y modificar auto
        let encontrado = false
        for (let i = 0; i< listadoAuto.length; i++ ){
            
            if (listadoAuto[i].patente == patente){
                listadoAuto[i].vendido = true
                encontrado = true
            }

        }
        //
        let grabado = JSON.stringify(listadoAuto)

        // grabar modificacion
        fs.writeFileSync(this.fileName, grabado)
        
         
         if (encontrado == true) {
             return 'auto vendido exitosamente'}else {
                return 'auto no encontrado'
             }
    },
    grabarAuto: function(auto){
         // leer listado
         let listadoAutos = this.leerAutos()

        // agregar en el listado
        listadoAutos.push(auto);
        console.log(listadoAutos)

        //parsearlo y grabarlo
        let listadoAutosJson = JSON.stringify(listadoAutos);
        fs.writeFileSync(this.fileName, listadoAutosJson)
        return 'auto guardado exitosamente'

    },
    buscarAutosAVender: function(){
         // leer listado
         let listadoAutos = this.leerAutos();
         //filtrar a vender
         let autosAVender = listadoAutos.filter( auto => auto.vendido == false)
         
         return autosAVender
    },
    buscarAutosAVender0: function(){
        let autosAVender = this.buscarAutosAVender()
        console.log(autosAVender)
        //filtrar los cero
        let autosAVender0 = autosAVender.filter( function(auto) {
                return  (auto.km == 0)
                
        })
        console.log('ahora filtro sobre esta lista los cero')
        return autosAVender0
   },
   listaDeVentas: function(){
    let listaAutos = this.leerAutos();
    
    let listaVendidos = listaAutos.filter(auto => auto.vendido == true)
    
    let arrayDeVentas = []
    for (let i = 0; i< listaVendidos.length; i++){
        arrayDeVentas.push(listaVendidos[i].precio)
    }
    return arrayDeVentas
   },
   totalVentas: function(){
    let listaVentas=this.listaDeVentas()
    let total =listaVentas.reduce(function(acum=0,venta){
        
        return acum + venta
    })
    return total
   },
   encontrarCli: function(dni){
    let arrayClientesJson = fs.readFileSync(this.FileNameCli)
    let arrayClientes = JSON.parse(arrayClientesJson)
    let clienteSel = arrayClientes.filter(function(cliente){
        return cliente.dni == dni
    })
    return clienteSel
   },
   encontrarAuto: function(patente){
    let listadoAuto =this.leerAutos()
    let autoBuscado = listadoAuto.filter(function(auto) {
        return auto.patente == patente})
        return autoBuscado
        
   },
   puedeComprar: function(dni, patente){
    let resultado = false
    let clienteSel = this.encontrarCli(dni)
    let autoSel = this.encontrarAuto(patente)
    console.log(clienteSel[0].capPagoCuotas)
    console.log(autoSel[0].precio/12)
   
    if (((clienteSel[0].capPagoCuotas)>=((autoSel[0].precio)/12)) && (clienteSel[0].capPagoTotal >= autoSel[0].precio)) {
        resultado = true
    } 
   return resultado
   },
   autosQuePuedeComprar: function(dni) {
    let clienteSel = this.encontrarCli(dni);
    let listaAutosAVender = this.buscarAutosAVender();
    listaAutosQPuedeComprar = listaAutosAVender.filter(function(auto){
        return (((clienteSel[0].capPagoCuotas)>=((auto.precio)/12)) && (clienteSel[0].capPagoTotal >= auto.precio))

    })

    return listaAutosQPuedeComprar

   }

}
module.exports = concesionaria