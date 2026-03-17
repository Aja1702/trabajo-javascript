$(document).ready(function() {
    
    // --- MAPA LEAFLET CON GEOLOCALIZACIÓN ---
    if ($("#mapa").length > 0) {
        
        // Coordenadas de tu negocio (Madrid)
        const businessLat = 40.4167;
        const businessLng = -3.7033;
        
        // Función para inicializar el mapa
        function initMap(userLat, userLng) {
            // Crear mapa centrado entre usuario y negocio
            const latCenter = (userLat + businessLat) / 2;
            const lngCenter = (userLng + businessLng) / 2;
            
            var map = L.map('mapa').setView([latCenter, lngCenter], 10);

            // Añadir capa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Marcador del negocio
            var businessMarker = L.marker([businessLat, businessLng]).addTo(map)
                .bindPopup('<b>Mi Empresa S.A.</b><br>¡Ven a visitarnos!')
                .openPopup();

            // Marcador del usuario
            var userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup('<b>Tu ubicación</b><br>Punto de partida');

            // Dibujar línea de ruta
            var routeLine = L.polyline([
                [userLat, userLng],
                [businessLat, businessLng]
            ], {
                color: '#1abc9c',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
            }).addTo(map);

            // Ajustar vista para mostrar ambos puntos
            map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
            
            // Actualizar información de ruta
            $("#ruta-info").html(
                '<strong>Ruta calculada:</strong> Desde tu ubicación hasta nuestra oficina en Madrid'
            );
        }
        
        // Función para mostrar mapa estático si no hay geolocalización
        function initStaticMap() {
            var map = L.map('mapa').setView([businessLat, businessLng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([businessLat, businessLng]).addTo(map)
                .bindPopup('<b>Mi Empresa S.A.</b><br>Calle Falsa 123, Madrid')
                .openPopup();
                
            $("#ruta-info").html(
                '<strong>Ubicación de nuestra oficina:</strong> Calle Falsa 123, Madrid'
            );
        }
        
        // Intentar obtener ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Éxito: obtener coordenadas del usuario
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    initMap(userLat, userLng);
                },
                function(error) {
                    // Error o usuario denegó permisos
                    console.log("Geolocalización no disponible o denegada");
                    initStaticMap();
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            // Navegador no soporta geolocalización
            initStaticMap();
        }
    }
});
