$(document).ready(function() {
    
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
});
