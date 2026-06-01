let carrito = JSON.parse(localStorage.getItem("carritoCleanHomes")) || [];
let mensajeWhatsappPreparado = "";

document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
    activarBuscador();
});

function guardarCarrito() {
    localStorage.setItem("carritoCleanHomes", JSON.stringify(carrito));
}

function toggleCarrito() {
    const panel = document.getElementById("panel-carrito");
    panel.classList.toggle("abierto");
}

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarrito();

    mostrarToast();
    mostrarMensajeAgregado(nombre);

}

function mostrarMensajeAgregado(nombre) {
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-agregado";
    mensaje.textContent = `${nombre} agregado al carrito`;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 1800);
}

function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    const contador = document.getElementById("contador-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (!contenedor || !contador || !totalCarrito) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const subtotal = producto.precio * producto.cantidad;

            const item = document.createElement("div");
            item.className = "item-carrito";
            item.innerHTML = `
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: $${producto.precio.toLocaleString("es-CO")}</p>
                <p>Cantidad:
                    <button type="button" onclick="disminuirCantidad(${index})">-</button>
                    <strong>${producto.cantidad}</strong>
                    <button type="button" onclick="aumentarCantidad(${index})">+</button>
                </p>
                <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;

            contenedor.appendChild(item);
        });
    }

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalCarrito.textContent = `$${total.toLocaleString("es-CO")}`;
}

function aumentarCantidad(index) {
    carrito[index].cantidad += 1;
    guardarCarrito();
    actualizarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }

    guardarCarrito();
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

function generarOrdenWhatsapp() {
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const celular = document.getElementById("cliente-celular").value.trim();
    const direccion = document.getElementById("cliente-direccion").value.trim();
    const barrio = document.getElementById("cliente-barrio").value.trim();
    const observaciones = document.getElementById("cliente-observaciones").value.trim();

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (nombre === "" || celular === "" || direccion === "" || barrio === "") {
        alert("Por favor completa nombre, celular, dirección y barrio.");
        return;
    }

    const fecha = new Date().toLocaleString("es-CO");
    const numeroPedido = "PED-" + Date.now();

    let total = 0;

    mensajeWhatsappPreparado = `*Nueva orden de compra*%0A`;
    mensajeWhatsappPreparado += `*J.A CLEAN HOMES*%0A%0A`;
    mensajeWhatsappPreparado += `*Número de pedido:* ${numeroPedido}%0A`;
    mensajeWhatsappPreparado += `*Fecha:* ${fecha}%0A%0A`;
    mensajeWhatsappPreparado += `*Datos del cliente*%0A`;
    mensajeWhatsappPreparado += `Nombre: ${nombre}%0A`;
    mensajeWhatsappPreparado += `Celular: ${celular}%0A`;
    mensajeWhatsappPreparado += `Dirección: ${direccion}%0A`;
    mensajeWhatsappPreparado += `Barrio: ${barrio}%0A`;

    if (observaciones !== "") {
        mensajeWhatsappPreparado += `Observaciones: ${observaciones}%0A`;
    }

    mensajeWhatsappPreparado += `%0A*Productos:*%0A`;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensajeWhatsappPreparado += `- ${item.nombre} x ${item.cantidad} = $${subtotal.toLocaleString("es-CO")}%0A`;
    });

    mensajeWhatsappPreparado += `%0A*Total del pedido:* $${total.toLocaleString("es-CO")}%0A`;
    mensajeWhatsappPreparado += `%0APedido generado desde la página web.`;

    const resumen = document.getElementById("contenido-resumen");

    if (resumen) {
        resumen.innerHTML = `
            <p><strong>Cliente:</strong> ${nombre}</p>
            <p><strong>Celular:</strong> ${celular}</p>
            <p><strong>Dirección:</strong> ${direccion}</p>
            <p><strong>Barrio:</strong> ${barrio}</p>
            <hr>
            <p><strong>Productos:</strong></p>
            ${carrito.map(item => `
                <p>${item.nombre} x ${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString("es-CO")}</p>
            `).join("")}
            <hr>
            <p><strong>Total:</strong> $${total.toLocaleString("es-CO")}</p>
        `;

        document.getElementById("modal-resumen").classList.remove("oculto");
    } else {
        confirmarEnvioWhatsapp();
    }
}

function cerrarResumen() {
    document.getElementById("modal-resumen").classList.add("oculto");
}

function confirmarEnvioWhatsapp() {
    const numeroJairo = "573134730264";
    const url = `https://wa.me/${numeroJairo}?text=${mensajeWhatsappPreparado}`;
    window.open(url, "_blank");
}

function activarBuscador() {
    const buscador = document.getElementById("buscador-productos");
    const tarjetas = document.querySelectorAll(".card-producto");

    if (!buscador) return;

    buscador.addEventListener("input", function () {
        const texto = buscador.value.toLowerCase();

        tarjetas.forEach((tarjeta) => {
            const nombre = tarjeta.querySelector("h3").textContent.toLowerCase();
            const descripcion = tarjeta.querySelector("p").textContent.toLowerCase();

            if (nombre.includes(texto) || descripcion.includes(texto)) {
                tarjeta.classList.remove("oculto");
            } else {
                tarjeta.classList.add("oculto");
            }
        });
    });
}

function toggleInfo() {
    const panelInfo = document.getElementById("panel-info");
    panelInfo.classList.toggle("oculto");
}

function toggleEnvios() {
    const panelEnvios = document.getElementById("panel-envios");
    panelEnvios.classList.toggle("oculto");
}
function toggleFAQ(id) {

    const contenido = document.getElementById(id);

    contenido.classList.toggle("activo");
}
function mostrarToast(){

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}