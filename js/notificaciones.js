// notificaciones.js — Notification API
// Esta es la API del NAVEGADOR (no del sistema push completo, que necesitaría
// un servidor con claves VAPID). Sirve para mostrar avisos del lado del cliente
// y para entender el permiso que el usuario debe conceder.

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");

  boton.addEventListener("click", () => {
    // "Notification" no existe en todos los navegadores/contextos; lo comprobamos primero
    if (!("Notification" in window)) {
      mensaje.textContent = "Este navegador no soporta notificaciones.";
      return;
    }

    // Notification.requestPermission() abre el diálogo del navegador
    // ("bloquear" / "permitir"). Devuelve una promesa con la respuesta del usuario.
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        // Creamos una notificación de prueba. title, luego un objeto con opciones.
        new Notification("Wilbert's Smokehouse", {
          body: "¡Listo! Te avisaremos cuando haya nuevas ofertas.",
          icon: "icons/icon.svg",
        });
        mensaje.textContent = "Notificaciones activadas.";
      } else {
        mensaje.textContent = "No diste permiso para notificaciones.";
      }
    });
  });
});
// Avisa al recuperar la conexión; el envío del carrito sigue siendo simulado.
async function notificarCarritoSincronizado() {
  mostrarAvisoSincronizacion();
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const opciones = {
    body: "Volvió la conexión. Tu carrito se sincronizó.",
    icon: "icons/icon.svg",
    tag: "carrito-sincronizado",
  };

  try {
    const registro = "serviceWorker" in navigator
      ? await navigator.serviceWorker.getRegistration()
      : null;
    if (registro && registro.active) {
      await registro.showNotification("Wilbert's Smokehouse", opciones);
    } else {
      new Notification("Wilbert's Smokehouse", opciones);
    }
  } catch (error) {
    // El mensaje del carrito sigue visible aunque el navegador no permita el aviso.
    console.warn("No se pudo mostrar el aviso de sincronización:", error);
  }
}
let temporizadorSincronizacion;
function mostrarAvisoSincronizacion(texto = "✓ Volvió la conexión. Tu carrito se sincronizó.") {
  let aviso = document.getElementById("aviso-sincronizacion");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso-sincronizacion";
    aviso.className = "aviso-sincronizacion";
    aviso.setAttribute("role", "status");
    aviso.setAttribute("aria-live", "polite");
    aviso.setAttribute("aria-atomic", "true");
    document.body.appendChild(aviso);
  }
  clearTimeout(temporizadorSincronizacion);
  aviso.textContent = texto;
  aviso.hidden = false;
  temporizadorSincronizacion = setTimeout(() => {
    aviso.hidden = true;
  }, 5000);
}
// Windows avisa una vez por producto hasta que se quite por completo del carrito.
const productosNotificados = new Set();
// El aviso en la página se mantiene en cada agregado, también sin conexión.
async function notificarProductoAgregado(producto) {
  const texto = `${producto.nombre} se agregó al carrito.`;
  mostrarAvisoSincronizacion(`✓ ${texto}`);
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const claveProducto = String(producto.id);
  if (productosNotificados.has(claveProducto)) return;
  productosNotificados.add(claveProducto);

  const opciones = {
    body: texto,

    icon: "icons/icon.svg",
  };
  try {
    const registro = "serviceWorker" in navigator
      ? await navigator.serviceWorker.getRegistration()
      : null;
    if (registro && registro.active) {
      await registro.showNotification("Wilbert's Smokehouse", opciones);
    } else {
      new Notification("Wilbert's Smokehouse", opciones);
    }
  } catch (error) {
    productosNotificados.delete(claveProducto);
    console.warn("No se pudo mostrar la notificación del producto:", error);
  }
}
// Quitar el producto permite avisar otra vez si se vuelve a agregar.
function permitirNuevaNotificacionProducto(id) {
  productosNotificados.delete(String(id));
}