// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const header = document.querySelector('header');

    if (header) {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    }
  });
}

// Set Current Year in Footer
const yearElement = document.getElementById('currentYear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================================================
// FORM VALIDATION UTILITIES
// ============================================================================

// Email validation regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation (basic - allows common formats)
function isValidPhone(phone) {
  if (phone.trim() === '') return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

// Clear all error messages for a form
function clearErrors(formId) {
  const form = document.getElementById(formId);
  if (form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }
}

// Display error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

// ============================================================================
// APPLICATION FORM VALIDATION & SUBMISSION
// ============================================================================

const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('applicationForm');

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('courseSelect').value;
    const experience = document.getElementById('experience').value;

    // Validation flags
    let isValid = true;

    // Validate Full Name
    if (fullName === '') {
      showError('fullNameError', 'Please enter your full name');
      isValid = false;
    } else if (fullName.length < 3) {
      showError('fullNameError', 'Name must be at least 3 characters');
      isValid = false;
    }

    // Validate Email
    if (email === '') {
      showError('emailError', 'Please enter an email address');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Phone
    if (phone !== '' && !isValidPhone(phone)) {
      showError('phoneError', 'Please enter a valid phone number');
      isValid = false;
    }

    // Validate Course Selection
    if (course === '') {
      showError('courseSelectError', 'Please select a course');
      isValid = false;
    }

    // Validate Experience
    if (experience === '') {
      showError('experienceError', 'Please select your experience level');
      isValid = false;
    }

    // If form is valid, show success message and reset
    if (isValid) {
      // Hide form
      applicationForm.style.display = 'none';

      // Show success message
      const successDiv = document.getElementById('applicationSuccess');
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth' });
      }

      // Reset form for potential reuse
      setTimeout(() => {
        applicationForm.reset();
        applicationForm.style.display = 'block';
        successDiv.style.display = 'none';
      }, 5000);
    }
  });
}

// ============================================================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('contactForm');

    // Get form values
    const contactName = document.getElementById('contactName').value.trim();
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('subject').value;
    const contactMessage = document.getElementById('contactMessage').value.trim();

    let isValid = true;

    // Validate Name
    if (contactName === '') {
      showError('contactNameError', 'Please enter your name');
      isValid = false;
    } else if (contactName.length < 3) {
      showError('contactNameError', 'Name must be at least 3 characters');
      isValid = false;
    }

    // Validate Email
    if (contactEmail === '') {
      showError('contactEmailError', 'Please enter an email address');
      isValid = false;
    } else if (!isValidEmail(contactEmail)) {
      showError('contactEmailError', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Subject
    if (subject === '') {
      showError('subjectError', 'Please select a subject');
      isValid = false;
    }

    // Validate Message
    if (contactMessage === '') {
      showError('contactMessageError', 'Please enter a message');
      isValid = false;
    } else if (contactMessage.length < 10) {
      showError('contactMessageError', 'Message must be at least 10 characters');
      isValid = false;
    }

    // If form is valid, show success message and reset
    if (isValid) {
      // Hide form
      contactForm.style.display = 'none';

      // Show success message
      const successDiv = document.getElementById('contactSuccess');
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth' });
      }

      // Reset form for potential reuse
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successDiv.style.display = 'none';
      }, 5000);
    }
  });
}

// ============================================================================
// ELIGIBILITY CHECKER
// ============================================================================

const eligibilityForm = document.getElementById('eligibilityForm');

if (eligibilityForm) {
  eligibilityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('eligibilityForm');

    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const experienceLevel = parseInt(document.getElementById('experienceLevel').value);
    const completedCheckboxes = document.querySelectorAll('input[name="completedCourses"]:checked');
    const completedCourses = Array.from(completedCheckboxes).map(cb => cb.value);

    let isValid = true;

    // Validate age
    if (isNaN(age) || age < 1 || age > 120) {
      showError('ageError', 'Please enter a valid age');
      isValid = false;
    }

    // Validate experience level selection
    if (isNaN(experienceLevel) || experienceLevel === null) {
      showError('experienceLevelError', 'Please select an experience level');
      isValid = false;
    }

    if (!isValid) return;

    // Age check (minimum 18)
    if (age < 18) {
      const resultDiv = document.getElementById('eligibilityResult');
      const resultContent = document.getElementById('resultContent');
      resultContent.innerHTML = `
        <h3 style="color: #d9534f;">❌ Age Requirement Not Met</h3>
        <p>You must be at least 18 years old to enroll in our courses. Please check back when you're eligible!</p>
      `;
      resultDiv.style.display = 'block';
      return;
    }

    // Determine eligible courses
    const eligibleCourses = [];

    // Barista Fundamentals - available to everyone aged 18+
    eligibleCourses.push({
      name: 'Barista Fundamentals',
      level: 'Beginner',
      canEnroll: true
    });

    // Advanced Brewing Techniques - requires Barista Fundamentals completed
    eligibleCourses.push({
      name: 'Advanced Brewing Techniques',
      level: 'Intermediate',
      canEnroll: completedCourses.includes('barista'),
      requirement: 'Requires completion of Barista Fundamentals'
    });

    // Espresso Mastery - requires Barista Fundamentals completed
    eligibleCourses.push({
      name: 'Espresso Mastery',
      level: 'Intermediate',
      canEnroll: completedCourses.includes('barista'),
      requirement: 'Requires completion of Barista Fundamentals'
    });

    // Coffee Cupping & Sensory - requires both Advanced Brewing AND Espresso Mastery
    eligibleCourses.push({
      name: 'Coffee Cupping & Sensory Analysis',
      level: 'Advanced',
      canEnroll: completedCourses.includes('brewing') && completedCourses.includes('espresso'),
      requirement: 'Requires completion of Advanced Brewing Techniques AND Espresso Mastery'
    });

    // Build result HTML
    let resultHTML = '<h3 style="color: #5cb85c;">✓ Eligibility Check Complete</h3>';
    resultHTML += `<p><strong>Age:</strong> ${age} years old ✓</p>`;
    resultHTML += `<p><strong>Experience Level:</strong> ${experienceLevel > 0 ? experienceLevel + ' year(s)' : 'None'}</p>`;

    if (completedCourses.length > 0) {
      resultHTML += `<p><strong>Completed Courses:</strong> ${completedCourses.join(', ')}</p>`;
    }

    resultHTML += '<h4 style="margin-top: 1.5rem;">Your Eligible Courses:</h4>';
    resultHTML += '<ul style="list-style: none; padding: 0;">';

    eligibleCourses.forEach(course => {
      if (course.canEnroll) {
        resultHTML += `<li style="padding: 0.75rem; margin-bottom: 0.5rem; background: #d4edda; border-left: 4px solid #5cb85c; border-radius: 4px;">
          <strong>✓ ${course.name}</strong> <span style="color: #666;">(${course.level})</span>
        </li>`;
      } else {
        resultHTML += `<li style="padding: 0.75rem; margin-bottom: 0.5rem; background: #f8d7da; border-left: 4px solid #f5c6cb; border-radius: 4px;">
          <strong>⊘ ${course.name}</strong> <span style="color: #666;">(${course.level})</span>
          <br><small style="color: #856404;">${course.requirement}</small>
        </li>`;
      }
    });

    resultHTML += '</ul>';
    resultHTML += '<p style="margin-top: 1rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px;">Ready to apply? <a href="form.html" style="color: #0066cc; text-decoration: none; font-weight: bold;">Visit our application form →</a></p>';

    // Display result
    const resultDiv = document.getElementById('eligibilityResult');
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  });
}

