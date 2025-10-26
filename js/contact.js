
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <strong>Message sent successfully!</strong> We'll get back to you within 24 hours.
                `;

                contactForm.parentNode.insertBefore(successMessage, contactForm);
                contactForm.reset();

                setTimeout(() => {
                    successMessage.remove();
                }, 5000);

            } catch (error) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Error sending message.</strong> Please try again or call us directly.
                `;

                contactForm.parentNode.insertBefore(errorMessage, contactForm);

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
