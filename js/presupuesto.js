$(document).ready(function() {
    
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
});
