// POPUP MODAL
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup-modal');
    const closeBtn = document.querySelector('.close-modal');
    const dismissBtn = document.querySelector('.btn-dismiss');
    
    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('active');
    }, 3000);
    
    // Close popup
    function closePopup() {
        popup.classList.remove('active');
    }
    
    closeBtn.addEventListener('click', closePopup);
    dismissBtn.addEventListener('click', closePopup);
    
    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
});

// MOBILE MENU
const menuToggle = document.createElement('button');
menuToggle.className = 'mobile-menu-toggle';
menuToggle.innerHTML = '☰';
menuToggle.style.cssText = `
    display: none;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    padding: 10px 15px;
    font-size: 24px;
    border-radius: 5px;
`;

document.body.appendChild(menuToggle);

menuToggle.addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
});

// Show mobile menu button on small screens
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
    } else {
        menuToggle.style.display = 'none';
        document.querySelector('.menu')?.classList.remove('active');
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// DROPDOWN MENU
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// STICKY HEADER
 let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    lastScroll = currentScroll;
});

// PRODUCT SLIDER
function initProductSlider() {
    const sliders = document.querySelectorAll('.product-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

initProductSlider();

// WISHLIST FUNCTIONALITY
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateWishlistUI() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        const productId = btn.closest('.product-card')?.dataset.productId;
        if (wishlist.includes(productId)) {
            btn.innerHTML = '♥';
            btn.style.color = '#e00d0d';
        }
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('wishlist-btn')) {
        const productCard = e.target.closest('.product-card');
        const productId = productCard?.dataset.productId || Date.now().toString();
        const productName = productCard.querySelector('h3')?.textContent;
        
        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
            e.target.innerHTML = '♡';
            e.target.style.color = '';
            showNotification(`${productName} removed from wishlist`);
        } else {
            wishlist.push(productId);
            e.target.innerHTML = '♥';
            e.target.style.color = '#e00d0d';
            showNotification(`${productName} added to wishlist`);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
});

updateWishlistUI();

// NOTIFICATION
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #000;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// LAZY LOADING IMAGES
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// FORM VALIDATION
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]');
        
        if (email && !validateEmail(email.value)) {
            showNotification('Please enter a valid email address');
            return;
        }
        
        // If newsletter form
        if (form.classList.contains('newsletter-form')) {
            showNotification('Thank you for subscribing!');
            form.reset();
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// SCROLL REVEAL ANIMATION
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.product-card, .blog-card, .collection-item');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// BACK TO TOP BUTTON
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #000;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// COLLECTIONS CAROUSEL AUTO PLAY
function initCollectionsCarousel() {
    const carousel = document.querySelector('.collections-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.collection-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    showSlide(0);
    setInterval(nextSlide, 5000);
}

initCollectionsCarousel();
// COLLECTIONS CAROUSEL WITH NAVIGATION & FADE
function initCollectionsCarousel() {
    const carousel = document.querySelector('.collections-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.collection-slide');
    let currentSlide = 0;
    let autoPlayInterval;
    const transitionDuration = 400; 

    const prevArrow = document.createElement('button');
    prevArrow.className = 'slide-nav prev';
    prevArrow.innerHTML = '<i class="fas fa-angle-left"></i>'; 

    const nextArrow = document.createElement('button');
    nextArrow.className = 'slide-nav next';
    nextArrow.innerHTML = '<i class="fas fa-angle-right"></i>'; 

    carousel.appendChild(prevArrow);
    carousel.appendChild(nextArrow);

    function showSlide(index) {
        slides[index].style.display = 'flex';
        
        slides.forEach((slide, i) => {
            if (i === index) {
                setTimeout(() => {
                    slide.classList.add('active');
                }, 10); 
            } else if (slide.classList.contains('active')) {
                slide.classList.remove('active');
                
                setTimeout(() => {
                    slide.style.display = 'none';
                }, transitionDuration); 
            } else {
                slide.style.display = 'none';
                slide.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for arrows
    nextArrow.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevArrow.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Initialize
    slides.forEach(slide => slide.style.transition = `opacity ${transitionDuration/1000}s ease-in-out`); 
    showSlide(0);
    startAutoPlay();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

initCollectionsCarousel();

// INSTAGRAM GRID LIGHTBOX
const instagramImages = document.querySelectorAll('.instagram-grid img');

instagramImages.forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="close-lightbox">&times;</button>
                <img src="${this.src}" alt="">
            </div>
        `;
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    });
});

console.log('Eyelix Eyewear - Website loaded successfully!');

