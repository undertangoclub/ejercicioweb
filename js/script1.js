document.addEventListener('DOMContentLoaded', function() {
    var whatsappButton = document.querySelector('.btn-whatsapp');
    if (whatsappButton) {
        // Posición inicial del botón en el centro de la pantalla
        var buttonX = window.innerWidth / 2;
        var buttonY = window.innerHeight / 2;
        var targetX = buttonX;
        var targetY = buttonY;

        // Velocidad de movimiento del botón
        var speed = 0.04;

        // Actualizar la posición inicial del botón de WhatsApp
        whatsappButton.style.position = 'fixed';
        whatsappButton.style.left = buttonX + 'px';
        whatsappButton.style.top = buttonY + 'px';

        // Función para suavizar el movimiento del botón
        function updateButtonPosition() {
            requestAnimationFrame(updateButtonPosition);

            // Calcular la diferencia entre la posición actual y la nueva posición
            var dx = targetX - buttonX;
            var dy = targetY - buttonY;

            // Mover el botón hacia la nueva posición
            buttonX += dx * speed;
            buttonY += dy * speed;

            // Actualizar la posición del botón
            whatsappButton.style.left = buttonX + 'px';
            whatsappButton.style.top = buttonY + 'px';
        }

        // Escuchar el movimiento del mouse para actualizar la posición destino del botón
        document.addEventListener('mousemove', function(e) {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        // Iniciar la actualización de posición
        updateButtonPosition();

        // Agregar event listener para el click en el botón de WhatsApp
        whatsappButton.addEventListener('click', function() {
            alert('Redirigiendo a la página de compra de entradas...');
            // Redirigir al usuario a la URL de WhatsApp
            window.location.href = 'https://wa.me/543757618270';
        });
    } else {
        console.error('El botón de WhatsApp no se encontró.');
    }
});
