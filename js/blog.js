// Blog page functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SOCIAL SHARE FUNCTIONALITY
    // ============================================
    const socialShareButtons = document.querySelectorAll('.share-btn');
    
    socialShareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageTitle = document.title;
            const pageUrl = window.location.href;
            
            if (this.classList.contains('facebook')) {
                // Facebook share
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
                window.open(facebookUrl, 'facebook-share', 'width=580,height=400');
            } 
            else if (this.classList.contains('twitter')) {
                // Twitter share
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
                window.open(twitterUrl, 'twitter-share', 'width=580,height=400');
            }
        });
    });

    // ============================================
    // COMMENT FORM HANDLING
    // ============================================
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            const website = document.getElementById('website').value;
            const saveInfo = document.getElementById('save-info').checked;
            
            // Validate
            if (!name || !email || !comment) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If save info is checked, save to localStorage
            if (saveInfo) {
                localStorage.setItem('commentAuthor', name);
                localStorage.setItem('commentEmail', email);
                localStorage.setItem('commentWebsite', website);
            }
            
            // Create new comment element
            const commentsSection = document.querySelector('.comments-section');
            const newComment = createCommentElement(name, comment);
            
            // Insert the new comment
            commentsSection.appendChild(newComment);
            
            // Update comment count
            const commentCountElement = commentsSection.querySelector('h3');
            const currentCount = parseInt(commentCountElement.textContent);
            commentCountElement.textContent = `${currentCount + 1} Comments`;
            
            // Reset form
            commentForm.reset();
            
            // Scroll to new comment
            newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show success message
            showMessage('Your comment has been posted successfully!', 'success');
        });
        
        // Load saved info if exists
        loadSavedCommentInfo();
    }
    
    // ============================================
    // COMMENT REPLY FUNCTIONALITY
    // ============================================
    const replyButtons = document.querySelectorAll('.comment-reply');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const comment = this.closest('.comment');
            const authorName = comment.querySelector('.comment-author').textContent;
            const commentTextarea = document.getElementById('comment');
            
            // Scroll to comment form
            commentTextarea.focus();
            
            // Add reply text
            commentTextarea.value = `@${authorName} `;
        });
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ============================================
    // READ PROGRESS BAR
    // ============================================
    createReadProgressBar();
    
    // ============================================
    // IMAGE LAZY LOADING
    // ============================================
    lazyLoadImages();
    
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Create comment element
function createCommentElement(name, commentText) {
    const div = document.createElement('div');
    div.className = 'comment';
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    div.innerHTML = `
        <img src="images/avatars/default.jpg" alt="${name}" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${name}</span>
                <span class="comment-date">${dateStr} / ${timeStr}</span>
            </div>
            <p>${escapeHtml(commentText)}</p>
            <a href="#" class="comment-reply">Reply</a>
        </div>
    `;
    
    return div;
}

// Load saved comment info from localStorage
function loadSavedCommentInfo() {
    const savedName = localStorage.getItem('commentAuthor');
    const savedEmail = localStorage.getItem('commentEmail');
    const savedWebsite = localStorage.getItem('commentWebsite');
    
    if (savedName) document.getElementById('name').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    if (savedWebsite) document.getElementById('website').value = savedWebsite;
    
    if (savedName || savedEmail) {
        document.getElementById('save-info').checked = true;
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2c5f2d' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create read progress bar
function createReadProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'read-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2c5f2d, #4a8f4b);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Lazy load images
function lazyLoadImages() {
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
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);