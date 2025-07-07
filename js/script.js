// Custom JavaScript for Savory Bites Restaurant

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Form submission handling (example)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            const formName = this.getAttribute('id') || 'form';
            
            // Show Bootstrap modal or alert for success
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            
            // You would typically have this modal in your HTML
            // For now, we'll use a simple alert
            alert(`Thank you! Your ${formName} has been submitted. We'll contact you soon.`);
            
            // Reset form
            this.reset();
        });
    });
    
    // Menu navigation highlight
    const menuSections = document.querySelectorAll('#starters, #mains, #sides, #desserts, #drinks, #wine');
    const menuLinks = document.querySelectorAll('.menu-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadInstance = new LazyLoad({
            elements_selector: ".lazy"
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Reservation form handling
document.addEventListener('DOMContentLoaded', function() {
    const reservationForms = document.querySelectorAll('#reservation form, #reservationModal form');
    
    reservationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const date = this.querySelector('input[type="date"]').value;
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you, ${name}! Your reservation for ${date} has been received. We'll contact you shortly to confirm.`);
            
            // Hide modal if this is the modal form
            const modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
            if (modal) {
                modal.hide();
            }
            
            // Reset form
            this.reset();
        });
    });
});