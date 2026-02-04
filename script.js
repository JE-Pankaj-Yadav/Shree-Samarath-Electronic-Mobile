/*
==========================================
SHREE SAMARATH ELECTRONIC & MOBILE WEBSITE
Main JavaScript File
==========================================
This file contains all interactive functionality for the website.
*/

// ========== MOBILE MENU TOGGLE FUNCTIONALITY ==========
// Select mobile menu button and navigation links
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Add click event listener to mobile menu button
mobileMenuBtn.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation links
    navLinks.classList.toggle('active');
    
    // Change the menu icon based on menu state
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>'  // Show close icon when menu is open
        : '<i class="fas fa-bars"></i>';  // Show hamburger icon when menu is closed
});

// ========== CLOSE MOBILE MENU ON LINK CLICK ==========
// Select all navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    // Add click event listener to each link
    link.addEventListener('click', () => {
        // Remove 'active' class to close the mobile menu
        navLinks.classList.remove('active');
        // Reset the menu button to hamburger icon
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ========== WHATSAPP FORM SUBMISSION FUNCTIONALITY ==========
// Select the WhatsApp contact form
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Get form input values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const product = document.getElementById('product').value;
    const message = document.getElementById('message').value;
    
    // ========== FORMAT MESSAGE FOR WHATSAPP ==========
    let whatsappMessage = `Hello Shree Samarath,\n\n`;  // Greeting
    whatsappMessage += `My name is ${name}.\n`;         // Customer name
    whatsappMessage += `My phone number is ${phone}.\n`; // Phone number
    
    // Add product interest if selected
    if (product) {
        whatsappMessage += `I'm interested in: ${product}.\n`;
    }
    
    // Add custom message if provided
    if (message) {
        whatsappMessage += `Message: ${message}\n`;
    }
    
    // Closing message
    whatsappMessage += `\nPlease contact me for more details.`;
    
    // ========== ENCODE MESSAGE FOR URL ==========
    // Encode the message to be URL-safe
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // ========== CREATE WHATSAPP URL ==========
    // Construct the WhatsApp URL with phone number and message
    const whatsappURL = `https://wa.me/918451863681?text=${encodedMessage}`;
    
    // ========== OPEN WHATSAPP ==========
    // Open WhatsApp in a new browser tab
    window.open(whatsappURL, '_blank');
    
    // ========== RESET FORM ==========
    // Clear all form fields after submission
    this.reset();
});

// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
// Select all anchor links that start with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event listener to each anchor link
    anchor.addEventListener('click', function(e) {
        // Prevent default anchor link behavior
        e.preventDefault();
        
        // Get the target section ID from the href attribute
        const targetId = this.getAttribute('href');
        
        // If href is just "#", do nothing
        if(targetId === '#') return;
        
        // Find the target element on the page
        const targetElement = document.querySelector(targetId);
        
        // If target element exists
        if(targetElement) {
            // Scroll to the target element with smooth behavior
            window.scrollTo({
                top: targetElement.offsetTop - 80,  // Adjust for fixed header height
                behavior: 'smooth'                  // Smooth scrolling animation
            });
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
// Add scroll event listener to window
window.addEventListener('scroll', function() {
    // Select the header element
    const header = document.querySelector('header');
    
    // Check if page has been scrolled more than 100 pixels
    if (window.scrollY > 100) {
        // Add shadow and solid background when scrolled
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        // Default styling at top of page
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// ========== OPTIMIZED HOVER EFFECTS ==========
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all interactive elements that should have hover effects
    const elements = document.querySelectorAll('.category-card, .why-choose-card, .service-card, .partner-card, .brand-item, .finance-partner-logo');
    
    // ========== ADD STAGGERED ANIMATION DELAYS ==========
    // Add sequential animation delays for entrance effects
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;  // Each element animates 0.1s after previous
        
        // ========== DESKTOP HOVER EFFECTS ==========
        // Only apply hover effects on devices that support hover
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            // Add mouse enter event for smooth transitions
            el.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            
            // Add mouse leave event
            el.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        }
    });
    
    // ========== TOUCH DEVICE OPTIMIZATIONS ==========
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        // Add touch feedback for mobile devices
        elements.forEach(el => {
            // Add touch start event (when user touches element)
            el.addEventListener('touchstart', function() {
                this.style.transition = 'transform 0.1s ease';  // Quick transition
                this.style.transform = 'scale(0.98)';           // Slightly shrink
            });
            
            // Add touch end event (when user stops touching)
            el.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';              // Return to normal size
                
                // Reset transition after a short delay
                setTimeout(() => {
                    this.style.transition = '';
                }, 100);
            });
        });
    }
});

// ========== PERFORMANCE OPTIMIZATION - SCROLL THROTTLING ==========
let scrollTimeout;  // Variable to store timeout reference

// Add scroll event listener with throttling
window.addEventListener('scroll', function() {
    // If no timeout is currently running
    if (!scrollTimeout) {
        // Set a timeout to run after 10ms
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;  // Reset timeout reference
            
            // Select header element
            const header = document.querySelector('header');
            
            // Apply scroll effects only if scrolled more than 100px
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }, 10);  // Run every 10ms max, not on every scroll event
    }
});
