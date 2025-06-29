
        // Download resume function
        function downloadResume() {
            // In a real implementation, this would download your actual resume file
            // For now, it shows an alert - replace with actual file path
            
            // Example of how to trigger an actual download:
            const link = document.createElement('a');
            link.target = '_blank';
            link.href = 'https://drive.google.com/file/d/1YBUzxYFDAB2_61DqYjmIRAehMd2ybs45/view?usp=sharing';

            link.download = 'Chandraket_Resume.pdf';
            link.click();
        }

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const Name = formData.get('name');
            const Email = formData.get('email');
            const Subject = formData.get('subject');
            const Message = formData.get('message');
            
            // Display success message (in a real app, you'd send this to a server)
            fetch("https://formspree.io/f/mpzgbrgg", {
                method: "POST",
                body: JSON.stringify({
                    Name,
                    Email,
                    Subject,
                    Message
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    alert(`Thank you, ${Name}! Your message has been received. I'll get back to you soon.`);
                } else {
                    alert(`Oops! Something went wrong. Please try again later.`);
                }
            });

            // Reset form
            contactForm.reset();
        });

        // Smooth scrolling for navigation links (fallback for older browsers)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'none';
            }
        });

        // Add animation on scroll
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

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
   