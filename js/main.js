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
            url: 'data/noticias.json',
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

    // --- SLIDER DE GALERÍA ---
    if ($("#slider").length > 0) {
        let slides = $("#slider .slide");
        let current = 0;
        let slideInterval;
        
        function showSlide(idx) {
            // Quitar clase active de todas las slides
            slides.removeClass("active");
            
            // La nueva slide entra desde la derecha
            current = idx;
            slides.eq(current).addClass("active");
        }
        
        function nextSlide() {
            let next = (current + 1) % slides.length;
            showSlide(next);
        }
        
        function prevSlide() {
            let prev = (current - 1 + slides.length) % slides.length;
            showSlide(prev);
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 2000); // Cambiar cada 2 segundos
        }
        
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        $("#nextBtn").on("click", function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        $("#prevBtn").on("click", function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Inicializar primera slide
        slides.eq(0).addClass("active");
        startAutoSlide();
    }

    // --- LÓGICA DE PRESUPUESTO ---
    if ($("#formulario-presupuesto").length > 0) {
        
        function actualizarPresupuesto() {
            let base = parseInt($("#producto").val()) || 0;
            let meses = parseInt($("#plazo").val()) || 1;
            let extras = 0;

            $(".extra:checked").each(function() {
                extras += parseInt($(this).val());
            });

            if (base > 0) {
                let subtotal = base + extras;
                
                // Descuento del 10% si el plazo es mayor a 6 meses
                if (meses > 6) {
                    subtotal = subtotal * 0.9; 
                }
                
                $("#total").text(subtotal.toFixed(2));
            } else {
                $("#total").text("0");
            }
        }

        // Ejecutar cálculo cada vez que cambie algo
        $("#producto, #plazo, .extra").on("change keyup", function() {
            actualizarPresupuesto();
        });

        // VALIDACIÓN DEL FORMULARIO
        $("#formulario-presupuesto").on("submit", function(e) {
            let nombre = $("#nombre").val();
            let apellidos = $("#apellidos").val();
            let telefono = $("#telefono").val();
            let email = $("#email").val();
            let producto = $("#producto").val();
            let condiciones = $("#condiciones-privacidad").is(":checked");

            // Validaciones con expresiones regulares
            let nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{1,15}$/.test(nombre);
            let apellidosValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(apellidos);
            let telefonoValido = /^[0-9]{9}$/.test(telefono);
            let emailValido = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);

            if (!nombreValido) {
                alert("Nombre inválido. Solo letras y máximo 15 caracteres.");
                e.preventDefault();
                return;
            }
            if (!apellidosValido) {
                alert("Apellidos inválidos. Solo letras y máximo 40 caracteres.");
                e.preventDefault();
                return;
            }
            if (!telefonoValido) {
                alert("Teléfono inválido. Solo números y 9 dígitos.");
                e.preventDefault();
                return;
            }
            if (!emailValido) {
                alert("Correo electrónico inválido.");
                e.preventDefault();
                return;
            }
            if (producto == "0") {
                alert("Por favor, selecciona un producto.");
                e.preventDefault();
                return;
            }
            if (!condiciones) {
                alert("Debes aceptar las condiciones de privacidad.");
                e.preventDefault();
                return;
            }
            
            alert("Gracias " + nombre + ", tu solicitud de presupuesto ha sido enviada correctamente.");
        });
    }

    // --- MAPA LEAFLET (CONTACTO) ---
    if ($("#mapa").length > 0) {
        // Inicializar el mapa centrado en Madrid
        var map = L.map('mapa').setView([40.4167, -3.7033], 13);

        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Añadir un marcador (chincheta)
        L.marker([40.4167, -3.7033]).addTo(map)
            .bindPopup('<b>Mi Empresa S.A.</b><br>¡Ven a visitarnos!')
            .openPopup();
    }
});
