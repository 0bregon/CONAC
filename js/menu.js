// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Elementos del menú
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navbar = document.querySelector('.navbar');
    const menuLinks = document.querySelectorAll('.menu-list a');

    // Abrir / cerrar menú móvil
    function toggleMenu() {
        const isOpen = menuList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar al hacer clic en el overlay
    menuOverlay.addEventListener('click', toggleMenu);

    // Cerrar al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Navbar sticky con fondo al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Marcar página activa automáticamente según la URL actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});