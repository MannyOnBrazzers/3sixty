
'use strict';

class EstimateFormHandler {
  constructor() {
    this.form = document.querySelector('.estimate-form');
    this.steps = document.querySelectorAll('.form-step');
    this.progressBar = document.querySelector('.progress-fill');
    this.progressSteps = document.querySelectorAll('.progress-steps .step');
    this.prevBtn = document.querySelector('.btn-prev');
    this.nextBtn = document.querySelector('.btn-next');
    this.submitBtn = document.querySelector('.btn-submit');

    this.currentStep = 1;
    this.totalSteps = this.steps.length;
    this.formData = {};
    this.uploadedFiles = [];
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.maxFiles = 10;

    this.init();
  }

  init() {
    if (!this.form) return;

    this.bindEvents();
    this.setupFileUpload();
    this.setupInsuranceToggle();
    this.updateProgress();
    this.validateCurrentStep();
  }

  bindEvents() {
    this.nextBtn.addEventListener('click', () => this.nextStep());
    this.prevBtn.addEventListener('click', () => this.prevStep());
    this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));

    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        input.dataset.touched = 'true';
        this.validateField(input);
      });
      input.addEventListener('input', () => {
        this.clearFieldError(input);
        if (input.dataset.touched === 'true') {
          this.validateField(input);
        }
      });
      input.addEventListener('change', () => {
        if (input.dataset.touched === 'true') {
          this.validateField(input);
        }
      });
    });

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
    }

    const vinInput = document.getElementById('vehicleVin');
    if (vinInput) {
      vinInput.addEventListener('input', (e) => this.formatVin(e));
    }
  }

  setupFileUpload() {
    const fileInput = document.getElementById('damagePhotos');
    const uploadArea = document.getElementById('photoUploadArea');
    const uploadedPhotos = document.getElementById('uploadedPhotos');

    if (!fileInput || !uploadArea) return;

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer.files);
      this.handleFileSelection(files);
    });

    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFileSelection(files);
    });
  }

  setupInsuranceToggle() {
    const insuranceInputs = document.querySelectorAll('input[name="insuranceClaim"]');
    const insuranceDetails = document.querySelector('.insurance-details');

    insuranceInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value === 'yes' && input.checked) {
          insuranceDetails.style.display = 'block';
          this.animateIn(insuranceDetails);
        } else {
          insuranceDetails.style.display = 'none';
        }
      });
    });
  }

  nextStep() {
    const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
    if (currentStepElement) {
      const requiredFields = currentStepElement.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        field.dataset.touched = 'true';
        this.validateField(field);
      });
    }

    if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
      this.saveStepData();
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.updateNavigation();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.updateNavigation();
    }
  }

  showStep(stepNumber) {
    this.steps.forEach(step => {
      step.classList.remove('active');
    });

    const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    if (currentStepElement) {
      currentStepElement.classList.add('active');
      this.animateIn(currentStepElement);

      const firstInput = currentStepElement.querySelector('input, select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  updateProgress() {
    const progress = (this.currentStep / this.totalSteps) * 100;
    this.progressBar.style.width = `${progress}%`;

    this.progressSteps.forEach((step, index) => {
      if (index < this.currentStep) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (index === this.currentStep - 1) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }

  updateNavigation() {
    this.prevBtn.disabled = this.currentStep === 1;

    if (this.currentStep === this.totalSteps) {
      this.nextBtn.style.display = 'none';
      this.submitBtn.style.display = 'inline-flex';
    } else {
      this.nextBtn.style.display = 'inline-flex';
      this.submitBtn.style.display = 'none';
    }
  }

  validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
    if (!currentStepElement) return false;

    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (field.dataset.touched === 'true') {
        if (!this.validateField(field)) {
          isValid = false;
        }
      } else if (field.value.trim() === '') {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    this.clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    if (field.type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }

    if (field.id === 'vehicleVin' && value && !this.isValidVin(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid 17-character VIN';
    }

    if (field.type === 'checkbox' && field.name === 'serviceType') {
      const checkedBoxes = document.querySelectorAll('input[name="serviceType"]:checked');
      if (checkedBoxes.length === 0) {
        isValid = false;
        errorMessage = 'Please select at least one service type';
      }
    }

    if (field.id === 'terms' && !field.checked) {
      isValid = false;
      errorMessage = 'You must agree to the terms and conditions';
    }

    if (!isValid) {
      this.displayFieldError(field, errorMessage);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  }

  isValidVin(vin) {
    if (vin.length !== 17) return false;
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  }

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    e.target.value = value;
  }

  formatVin(e) {
    e.target.value = e.target.value.toUpperCase();
  }

  displayFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');

    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  saveStepData() {
    const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
    if (!currentStepElement) return;

    const inputs = currentStepElement.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.checked) {
          if (this.formData[input.name]) {
            if (Array.isArray(this.formData[input.name])) {
              this.formData[input.name].push(input.value);
            } else {
              this.formData[input.name] = [this.formData[input.name], input.value];
            }
          } else {
            this.formData[input.name] = input.value;
          }
        }
      } else {
        this.formData[input.name] = input.value;
      }
    });
  }

  handleFileSelection(files) {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        this.showError(`${file.name} is not a valid image file`);
        return false;
      }

      if (file.size > this.maxFileSize) {
        this.showError(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }

      return true;
    });

    if (this.uploadedFiles.length + validFiles.length > this.maxFiles) {
      this.showError(`Maximum ${this.maxFiles} files allowed`);
      return;
    }

    validFiles.forEach(file => {
      this.uploadedFiles.push(file);
      this.createFilePreview(file);
    });

    this.updateUploadArea();
  }

  createFilePreview(file) {
    const uploadedPhotos = document.getElementById('uploadedPhotos');
    if (!uploadedPhotos) return;

    const filePreview = document.createElement('div');
    filePreview.className = 'file-preview';

    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.innerHTML = `
        <img src="${e.target.result}" alt="Damage photo preview" />
        <div class="file-info">
          <span class="file-name">${file.name}</span>
          <span class="file-size">${this.formatFileSize(file.size)}</span>
        </div>
        <button type="button" class="remove-file" aria-label="Remove ${file.name}">
          <span aria-hidden="true">×</span>
        </button>
      `;

      const removeBtn = filePreview.querySelector('.remove-file');
      removeBtn.addEventListener('click', () => {
        this.removeFile(file, filePreview);
      });
    };

    reader.readAsDataURL(file);
    uploadedPhotos.appendChild(filePreview);
  }

  removeFile(file, previewElement) {
    const index = this.uploadedFiles.indexOf(file);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
    }

    previewElement.remove();
    this.updateUploadArea();
  }

  updateUploadArea() {
    const uploadArea = document.getElementById('photoUploadArea');
    const fileInput = document.getElementById('damagePhotos');

    if (this.uploadedFiles.length >= this.maxFiles) {
      uploadArea.classList.add('max-files');
    } else {
      uploadArea.classList.remove('max-files');
    }

    fileInput.value = '';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');

    const currentStep = document.querySelector(`[data-step="${this.currentStep}"]`);
    currentStep.insertBefore(errorDiv, currentStep.firstChild);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const allInputs = this.form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
      input.dataset.touched = 'true';
    });

    let allValid = true;
    for (let step = 1; step <= this.totalSteps; step++) {
      const stepElement = document.querySelector(`[data-step="${step}"]`);
      if (stepElement) {
        const requiredFields = stepElement.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!this.validateField(field)) {
            allValid = false;
          }
        });
      }
    }

    if (!allValid) {
      this.showError('Please fill in all required fields before submitting.');
      return;
    }

    this.saveStepData();

    this.submitBtn.textContent = 'Submitting...';
    this.submitBtn.disabled = true;

    try {
      const formDataToSend = new FormData();

      Object.keys(this.formData).forEach(key => {
        if (Array.isArray(this.formData[key])) {
          this.formData[key].forEach(value => {
            formDataToSend.append(key, value);
          });
        } else {
          formDataToSend.append(key, this.formData[key]);
        }
      });

      this.uploadedFiles.forEach((file, index) => {
        formDataToSend.append(`photo_${index}`, file);
      });

      const result = await this.submitEstimateRequest(formDataToSend);

      if (result.success) {
        this.showSuccessMessage();
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      this.showError('There was an error submitting your request. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      this.submitBtn.textContent = 'Submit Estimate Request';
      this.submitBtn.disabled = false;
    }
  }

  async submitEstimateRequest(formData) {
    console.log('Estimate request data:', Object.fromEntries(formData));

    await new Promise(resolve => setTimeout(resolve, 2000));

    return { success: true };

    // Real implementation examples:

    // Using fetch API:
    // const response = await fetch('/api/estimates', {
    //   method: 'POST',
    //   body: formData
    // });
    // return response.json();

    // Using EmailJS for email-based submissions:
    // const templateParams = Object.fromEntries(formData);
    // return emailjs.send('service_id', 'template_id', templateParams)
    //   .then(() => ({ success: true }))
    //   .catch(error => ({ success: false, message: error.text }));
  }

  showSuccessMessage() {
    const form = this.form;
    const successMessage = document.getElementById('formSuccess');

    if (form && successMessage) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
      this.animateIn(successMessage);

      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'estimates',
          event_label: 'estimate_request_completed'
        });
      }
    }
  }

  animateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.estimate-form')) {
    window.estimateFormHandler = new EstimateFormHandler();
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EstimateFormHandler;
}
