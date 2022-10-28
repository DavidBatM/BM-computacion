//Definimos variables

/*compra = precio*cantidad;
desc = compra*0.05;
pago = compra-desc; */

let costoDelCarrito = 0;
let desc = 0;
let productosCarrito; //esto es un array vacio


/* element.innerHTML = "<button>Boton y codigo</button>" //lo que escribo ahi en el HTML */
function sumarAlCarrito(id){
    let producto = buscarProducto(id); 
    agregarProductoAlCarrito(producto); 
    calcularDescuento(); 
    mostrarCarrito(); //si no pones los partentesis la funcion no se ejecuta
    //la funcion tiene demasiados pasos, ver como sacar estos ultimos y llamarlos.
    //hacer una nueva funcion que sea render(que imprima en el dom el carrito) 1. leer el array del carrito y reducirlo al total y despues hacer el condicional con descuento 2.y la cargo al inicio(en el caso de tener items, sino arranca la funcion de 0)
    localStorageSave();
}
function localStorageSave() {
    console.log(productosCarrito);
    let productosCarritoJson = JSON.stringify(productosCarrito);
    console.log(productosCarritoJson);
    localStorage.setItem("productosCarrito",productosCarritoJson);   
}

function buscarProducto(id) {
    console.log(id);
    let producto = Productos[id];
    console.log(producto);
    return producto
}
function agregarProductoAlCarrito(producto_cualquiera) {
    productosCarrito.push(producto_cualquiera);
    costoDelCarrito = costoDelCarrito + producto_cualquiera.precio;
}

function calcularDescuento() {
    if(costoDelCarrito >= 5000){
        desc = costoDelCarrito*0.05;        
    }
    else{
        desc = 0;
    }
}

function mostrarProductos(){
    /* ARRAY DE PRODUCTOS */
    const productos = fetch('/CatalogoProductos.json').then(
        (response) => {
            
            response.json()
            let gridStore = document.getElementById("gridStore");
            for (const producto of response){  // OF ES PARA ARRAY (IN ES PARA STRINGS)
                let codigoHTML = `
                <section class="producto${producto.id}"><div class="imgSizeTienda"><img src="./imgs/sobre nosotros/20211101_1902232 - copia.jpg" alt="" class="imgTienda"></div><div class="cat"><p>${producto.nombre} $${producto.precio}</p><button onclick="sumarAlCarrito(${producto.id})">Agregar al carrito</button></div></section>`;
                gridStore.innerHTML = gridStore.innerHTML + codigoHTML;
            }
        }
    )
    .then(
        (data) => console.log(data)
    );;
}

function obtenerProductosLocalStorage() {
    if (localStorage.getItem("productosCarrito") === null) {
        productosCarrito = [];        
    }
    else{
        let productosCarritoJson = localStorage.getItem("productosCarrito");
        productosCarrito = JSON.parse(productosCarritoJson);
        productosCarrito.forEach(producto => {
            costoDelCarrito = costoDelCarrito + producto.precio;                        
        });
        calcularDescuento();
    }    
}

function mostrarCarrito() {
    let element = document.getElementById("pMonto");
    element.innerHTML = "El costo de tu compra es " + costoDelCarrito; //escribe en el HTML lo que identificamos aca
    let element2 = document.getElementById("pDesc");
    if(desc >0){
        element2.innerHTML = "El descuento es de " + desc;
        element2.innerHTML = element2.innerHTML + " El precio final es de " + (costoDelCarrito-desc);
    } else {
        element2.innerHTML= "";
    }
}
function vaciarCarrito() {  
    costoDelCarrito = 0;
    desc = 0;
    productosCarrito = [];
    localStorageSave();
    mostrarCarrito();
}
function pago() {
    if (costoDelCarrito >0) {
        Swal.fire(
            'Pagado!',
            'Tu compra se ha realizado con exito!',
            'success'
        )
        costoDelCarrito = 0;
        desc = 0;
        productosCarrito = [];
        localStorageSave();
        mostrarCarrito();
        return
    }
    Swal.fire(
        'Ups!',
        'No hay productos en tu carrito aun...',
        'error'
    )        

}


//cuando cargo la pagina hacer una funcion que carge el carrito y muestre los productos que ya tenes
obtenerProductosLocalStorage();
mostrarProductos();
mostrarCarrito();

pago.addEventListener("mouseover", () => console.log("mouseover"));
pago.addEventListener("mouseover", () => {
    pago.className= "azul";
});
pago.addEventListener("mouseout", () => {
    pago.className= "red";
});

//sumar donde ver los productos y como eliminarlos