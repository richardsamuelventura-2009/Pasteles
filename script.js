// 1. Base de datos simulada de los primeros 5 productos
const productos = [
    {
        id: 1,
        nombre: "Pastel de Chocolate",
        precio: 45
    },
    {
        id: 2,
        nombre: "Torta de Fresa",
        precio: 50
    },
    {
        id: 3,
        nombre: "Pastel de Vainilla",
        precio: 40
    },
    {
        id: 4,
        nombre: "Pastel Red Velvet",
        precio: 55
    },
    {
        id: 5,
        nombre: "Pastel de Tres Leches",
        precio: 60
    }
];

// 2. Estado inicial del carrito
let carrito = [];

// 3. Relación con los elementos de los archivos HTML
const carritoElementos =
    document.getElementById("carrito-elementos");

const carritoTotal =
    document.getElementById("carrito-total");

const btnVaciar =
    document.getElementById("btn-vaciar");

// 4. Función para agregar producto
function agregarAlCarrito(idProducto) {

    const producto = productos.find(
        item => item.id === idProducto
    );

    if (!producto) {
        return;
    }

    const productoCarrito = carrito.find(
        item => item.id === idProducto
    );

    if (productoCarrito) {

        productoCarrito.cantidad++;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });

    }

    actualizarInterfazCarrito();
}

// 5. Cambiar cantidad de producto
function cambiarCantidad(idProducto, cambio) {

    const producto = carrito.find(
        item => item.id === idProducto
    );

    if (producto) {

        producto.cantidad += cambio;

        if (producto.cantidad <= 0) {

            eliminarDelCarrito(idProducto);

            return;
        }
    }

    actualizarInterfazCarrito();
}

// 6. Eliminar un producto
function eliminarDelCarrito(idProducto) {

    carrito = carrito.filter(
        item => item.id !== idProducto
    );

    actualizarInterfazCarrito();
}

// 7. Función vaciar carrito
btnVaciar.addEventListener("click", () => {

    carrito = [];

    actualizarInterfazCarrito();

});

// 8. Función mostrar carrito
function actualizarInterfazCarrito() {

    carritoElementos.innerHTML = "";

    if (carrito.length === 0) {

        carritoElementos.innerHTML =
            "<p>El carrito está vacío</p>";

        carritoTotal.innerText = "0.00";

        return;
    }

    let cuentaTotal = 0;

    carrito.forEach(item => {

        // Calculamos el subtotal
        const subtotal =
            item.precio * item.cantidad;

        cuentaTotal += subtotal;

        // Creamos el div del producto
        const itemDiv =
            document.createElement("div");

        itemDiv.classList.add(
            "item-carrito"
        );

        itemDiv.innerHTML = `
            <div class="item-detalles">

                <h4>${item.nombre}</h4>

                <p>
                    S/${item.precio} c/u
                </p>

            </div>

            <div>

                <button
                    class="btn-cantidad"
                    onclick="cambiarCantidad(${item.id}, -1)">
                    -
                </button>

                <span>
                    ${item.cantidad}
                </span>

                <button
                    class="btn-cantidad"
                    onclick="cambiarCantidad(${item.id}, 1)">
                    +
                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarDelCarrito(${item.id})">
                    Eliminar
                </button>

            </div>
        `;

        carritoElementos.appendChild(itemDiv);

    });

    carritoTotal.innerText =
        cuentaTotal.toFixed(2);
}

// 9. Inicio del sistema
actualizarInterfazCarrito();