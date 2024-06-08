const expresiones = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,30}$/
    // Letras y espacios, pueden llevar acentos.
}

function validarEmail() {
    const nombreInput = document.getElementById("email");
    const nombreValue = nombreInput.value.trim(); // Elimina espacios en blanco al principio y al final

    if (!expresiones.email.test(nombreValue)) {
        // La entrada no cumple con la expresión regular
        nombreInput.setCustomValidity("El email ingresado no es válido. Debe contener letras o símbolos antes y después del arroba ('@'), seguído de un punto ('.').");
    } else {
        // La entrada es válida, borra el mensaje de error personalizado
        nombreInput.setCustomValidity("");
    }
}


// Función para verificar la conexión
function checkConnection() {
    const online = navigator.onLine; // Verifica si hay conexión

    // Desactiva/Activa los enlaces y botones
    const links = document.querySelectorAll("a");
    links.forEach((element) => {
        if (online) {
            element.classList.remove("disabled");
            element.removeEventListener("click", preventClick);
        } else {
            element.classList.add("disabled");
            element.addEventListener("click", preventClick);
        }
    });

    // Pausa/reanuda los elementos de audio y video
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((element) => {
        if (online) {
            element.play();
        } else {
            element.pause();
        }
    });

    // Muestra un toast con íconos
    const toast = document.getElementById("toast");
    if (online) {
        toast.innerText = "Conexión activa 🌐";
    } else {
        toast.innerText = "Conexión perdida ❌";
    }
}

// Función para prevenir clics en enlaces desactivados
function preventClick(event) {
    event.preventDefault();
}

// Verifica la conexión al cargar la página
window.addEventListener("load", checkConnection);

// Verifica la conexión cuando cambia el estado
window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);

    // Verificar conexión inicial
    checkConnection2();
    // Función para verificar la conexión
    function checkConnection2() {
        const online = navigator.onLine;
        const video = document.getElementById("youtubeVideo");
        if (online) {
            video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            showToast("Conexión activa 🌐");
        } else {
            video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            showToast("Conexión perdida ❌");
        }
    }

    // Inicializar el reproductor de YouTube
    function onYouTubeIframeAPIReady() {
        new YT.Player('youtubeVideo');
    }

    // Cargar la API de YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

