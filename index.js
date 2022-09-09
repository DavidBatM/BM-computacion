//Definimos variables

/*compra = precio*cantidad;
desc = compra*0.05;
pago = compra-desc; */

var costoDelCarrito = 0;
var costoDelCarritoConDescuento = 0;

/* ARRAY DE PRODUCTOS */
const Productos = [
    {id: 1, nombre: "Placa rtx 3060", precio: 100}, //RESPETAR LOS ESPACIOS!!!!!!!!!
    {id: 2, nombre: "Placa rtx 3070", precio: 200},
    {id: 3, nombre: "Placa rtx 3080", precio: 300},
    {id: 4, nombre: "Placa rtx 309", precio: 400},
    {id: 5, nombre: "Placa rtx TI 3090", precio: 400},
];

/* element.innerHTML = "<button>Boton y codigo</button>" //lo que escribo ahi en el HTML */
function sumarAlCarrito(valor){
    costoDelCarrito = costoDelCarrito + valor;    
    if(costoDelCarrito >= 5000){
        var desc = costoDelCarrito*0.05;
        costoDelCarritoConDescuento = costoDelCarrito - desc;
        console.log("El descuento es de:" + desc);
        console.log("El monto final es de:" + costoDelCarritoConDescuento);
    }
    else{
        costoDelCarritoConDescuento = costoDelCarrito;
    }
    var element = document.getElementById("pMonto");
    element.innerHTML = "El costo de tu compra es " + costoDelCarritoConDescuento; //escribe en el HTML lo que identificamos aca
    if(desc >0){
    var element2 = document.getElementById("pDesc");
    element2.innerHTML = "El descuento efectuado es de " + desc;
    }    
}

function mostrarProductos(productos){
    var gridStore = document.getElementById("gridStore");
    for (let producto of productos){  // OF ES PARA ARRAY (IN ES PARA STRINGS)
        let codigoHTML = `
        <section class="producto${producto.id}"><div><img src="" alt=""></div><div><p>${producto.nombre} $${producto.precio}</p><button onclick="sumarAlCarrito(${producto.precio})">Agregar al carrito</button></div></section>`;
        gridStore.innerHTML = gridStore.innerHTML + codigoHTML;
    }
}

mostrarProductos(Productos);