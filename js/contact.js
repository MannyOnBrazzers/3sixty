document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Clear any existing messages
            const existingMessages = document.querySelectorAll('.form-message');
            existingMessages.forEach(msg => msg.remove());

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Create FormData object
                const formData = new FormData(contactForm);
                
                // Get the action URL from the form
                const actionUrl = contactForm.getAttribute('action');
                
                // Submit to Formspree
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-message success';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <strong>Message sent successfully!</strong> We'll get back to you within 24 hours.
                    `;

                    contactForm.parentNode.insertBefore(successMessage, contactForm);
                    contactForm.reset();

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Remove success message after 10 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 10000);

                } else {
                    // Handle Formspree errors
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Form submission failed');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                
                // Check if it's a network error or Formspree error
                if (error.message.includes('Failed to fetch') || !navigator.onLine) {
                    errorMessage.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Connection error.</strong> Please check your internet connection and try again, or call us directly at <a href="tel:4073078050">(407) 307-8050</a>.
                    `;
                } else if (error.message.includes('Formspree')) {
                    errorMessage.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Form configuration error.</strong> Please call us directly at <a href="tel:4073078050">(407) 307-8050</a> or email <a href="mailto:3sixtyautocollision@gmail.com">3sixtyautocollision@gmail.com</a>.
                    `;
                } else {
                    errorMessage.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Error sending message.</strong> Please try again or call us directly at <a href="tel:4073078050">(407) 307-8050</a>.
                    `;
                }

                contactForm.parentNode.insertBefore(errorMessage, contactForm);

                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Remove error message after 15 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 15000);
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Phone validation
        else if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        // Update field appearance
        if (isValid) {
            field.classList.remove('error');
            clearFieldError(field);
        } else {
            field.classList.add('error');
            displayFieldError(field, errorMessage);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        // Check if it's 10 or 11 digits (with country code)
        return digits.length >= 10 && digits.length <= 11;
    }

    function displayFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
});