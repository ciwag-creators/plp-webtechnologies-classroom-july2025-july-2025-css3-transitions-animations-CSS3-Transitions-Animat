// ===== DOM Elements =====
const animatedBox = document.getElementById('animatedBox');
const fadeBtn = document.getElementById('fadeBtn');
const slideBtn = document.getElementById('slideBtn');
const pulseBtn = document.getElementById('pulseBtn');
const spinBtn = document.getElementById('spinBtn');
const bounceBtn = document.getElementById('bounceBtn');
const flipBtn = document.getElementById('flipBtn');
const resetBtn = document.getElementById('resetBtn');
const flipCard = document.getElementById('flipCard');
const startLoader = document.getElementById('startLoader');
const stopLoader = document.getElementById('stopLoader');
const loader = document.getElementById('loader');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');

// ===== Reusable Animation Functions =====

// Function to apply animation with parameters
function applyAnimation(element, animationClass, duration = 1000) {
    // Local scope variables
    const previousAnimation = element.dataset.currentAnimation;
    
    // Remove previous animation class
    if (previousAnimation) {
        element.classList.remove(previousAnimation);
    }
    
    // Apply new animation
    element.classList.add(animationClass);
    element.dataset.currentAnimation = animationClass;
    
    // Remove animation class after duration if it's not infinite
    if (!animationClass.includes('infinite')) {
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }
    
    // Return the animation name for potential use
    return animationClass;
}

// Function to calculate animation delay based on element position
function calculateDelay(element, baseDelay = 0) {
    // This function demonstrates parameter usage and return value
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const distanceFromTop = rect.top;
    
    // Calculate delay based on position in viewport (local scope calculation)
    const delay = baseDelay + (distanceFromTop / viewportHeight) * 500;
    return Math.min(delay, 2000); // Maximum delay of 2 seconds
}

// Function to toggle animations with callback support
function toggleAnimation(element, animationClass, isEnabled, callback = null) {
    if (isEnabled) {
        element.classList.add(animationClass);
        if (callback && typeof callback === 'function') {
            // Use event listener to detect when animation ends
            element.addEventListener('animationend', callback, { once: true });
        }
    } else {
        element.classList.remove(animationClass);
    }
}

// Function to generate random color (demonstrates return value)
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ===== Event Listeners =====

// Box animation buttons
fadeBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'fade-in', 1500);
});

slideBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'slide-in', 1000);
});

pulseBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'pulse', 2000);
});

spinBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'spin', 1500);
});

bounceBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'bounce', 1000);
});

flipBtn.addEventListener('click', () => {
    applyAnimation(animatedBox, 'flip', 1500);
});

resetBtn.addEventListener('click', () => {
    // Reset all animations
    animatedBox.classList.remove('fade-in', 'slide-in', 'pulse', 'spin', 'bounce', 'flip');
    animatedBox.style.transform = '';
    animatedBox.style.opacity = '';
});

// Card flip
flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
    
    // Demonstrate function with return value
    const delay = calculateDelay(flipCard, 300);
    console.log(`Card flip animation triggered with delay calculation: ${delay}ms`);
});

// Loader controls
startLoader.addEventListener('click', () => {
    // Using the toggleAnimation function
    toggleAnimation(loader, 'loader', true);
    
    // Change dot colors randomly for visual effect
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.style.backgroundColor = getRandomColor();
    });
});

stopLoader.addEventListener('click', () => {
    toggleAnimation(loader, 'loader', false);
});

// Modal controls
openModal.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Global vs Local Scope Demonstration =====
const globalVariable = "I'm a global variable";

function scopeDemonstration() {
    // Local variable with the same name as a global variable
    const globalVariable = "I'm a local variable";
    console.log("Inside function:", globalVariable);
    
    // Function with block scope
    if (true) {
        const blockScopedVariable = "I'm block scoped";
        console.log("Inside block:", blockScopedVariable);
    }
    
    // This would cause an error - blockScopedVariable is not accessible here
    // console.log("Outside block:", blockScopedVariable);
}

// Call the function to demonstrate scope
scopeDemonstration();
console.log("Outside function:", globalVariable);

// ===== Initialize Page Animations =====
window.addEventListener('load', () => {
    // Animate sections with calculated delays
    const sections = document.querySelectorAll('.animation-section');
    
    sections.forEach((section, index) => {
        const delay = calculateDelay(section, index * 200);
        
        setTimeout(() => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Trigger reflow
            void section.offsetWidth;
            
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }, delay);
    });
});
