
/* =========================
   SISTEMA DE VISITAS
========================= */

const paginasObligatorias = [
    "gorgeous.html",
    "gallery.html",
    "poem.html",
    "playlist.html"
];

const paginaActual = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

const claveVisita = "paginaVisitada_";
const clavePopup = "popupSorpresaMostrado";

/* Comprueba si se visitaron todas las páginas */

function todasLasPaginasVisitadas() {
    return paginasObligatorias.every(function (pagina) {
        return sessionStorage.getItem(claveVisita + pagina) === "true";
    });
}

/* Registra la visita a una página obligatoria */

if (paginasObligatorias.includes(paginaActual)) {
    sessionStorage.setItem(claveVisita + paginaActual, "true");
}

/* Muestra el popup cuando se completa el recorrido */

function comprobarDesbloqueo() {
    if (paginaActual === "surprise.html" &&
        !todasLasPaginasVisitadas()) {
        window.location.replace("youchoose.html");
        return;
    }

    if (paginaActual !== "youchoose.html") {
        return;
    }

    const popup = document.getElementById("popup-sorpresa");

    if (
        popup &&
        todasLasPaginasVisitadas() &&
        sessionStorage.getItem(clavePopup) !== "true"
    ) {
        popup.hidden = false;
        sessionStorage.setItem(clavePopup, "true");
    }
}

/* También comprueba cuando se vuelve a una página */

window.addEventListener("pageshow", comprobarDesbloqueo);

comprobarDesbloqueo();
