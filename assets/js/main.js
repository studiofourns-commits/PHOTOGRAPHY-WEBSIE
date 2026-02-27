/**
 * Main JavaScript for Studio Four.ns
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass', 'py-4');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('glass', 'py-4');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        let isMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileNav.classList.remove('translate-x-full');
                mobileMenuBtn.innerHTML = '<i class="ph ph-x text-3xl"></i>';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                mobileNav.classList.add('translate-x-full');
                mobileMenuBtn.innerHTML = '<i class="ph ph-list text-3xl"></i>';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add active class to trigger CSS transition
            entry.target.classList.add('active');
            
            // Unobserve once animated
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add immediate page load animation for top-level elements
    setTimeout(() => {
        const initialReveal = document.querySelectorAll('.fade-up-element:not(.reveal)');
        initialReveal.forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Simple Gallery Filter (if gallery page exists)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-accent', 'text-dark', 'border-accent');
                    b.classList.add('border-white/20', 'text-light');
                });
                
                btn.classList.remove('border-white/20', 'text-light');
                btn.classList.add('bg-accent', 'text-dark', 'border-accent');

                const filter = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300); // match transition duration
                    }
                });
            });
        });
    }
});
