$(document).ready(function() {
    
    // --- BANNER DE COOKIES ---
    if ($("#cookie-banner").length > 0) {
        // Comprobar si ya se acceptaron las cookies
        if (localStorage.getItem("cookiesAceptadas")) {
            $("#cookie-banner").hide();
        }
        
        // Evento al hacer click en aceptar
        $("#aceptar-cookies").on("click", function() {
            localStorage.setItem("cookiesAceptadas", "true");
            $("#cookie-banner").slideUp();
        });
    }

    // --- CARGA DE NOTICIAS MEDIANTE AJAX ---
    if ($("#contenedor-noticias").length > 0) {
        $.ajax({
            url: '../data/noticias.json',
            type: 'GET',
            dataType: 'json',
            success: function(noticias) {
                let htmlNoticias = "";
                
                $.each(noticias, function(indice, noticia) {
                    htmlNoticias += `
                        <div class="noticia-card">
                            <h3>${noticia.titulo}</h3>
                            <span class="fecha">${noticia.fecha}</span>
                            <p>${noticia.contenido}</p>
                        </div>
                    `;
                });
                
                $("#contenedor-noticias").html(htmlNoticias);
            },
            error: function() {
                $("#contenedor-noticias").html("<p>Error al cargar las noticias. Inténtelo más tarde.</p>");
            }
        });
    }

    // --- SUAVIZAR TRANSICIÓN DEL MENÚ ---
    $("#menu-fijo a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });
});
