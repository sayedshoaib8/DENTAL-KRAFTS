/**
 * DENTAL KRAFTS - Premium Dental Clinic Demo
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTreatmentsModal();
  initGalleryAndLightbox();
  initFAQAccordion();
  initAppointmentForm();
  initSmoothScroll();
});

/* ==========================================================================
   NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle mobile drawer
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    function openDrawer() {
      drawer.classList.add('active');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================================================
   TREATMENTS MODAL
   ========================================================================== */
const treatmentsData = {
  cleaning: {
    title: "Dental Cleaning & Prophylaxis",
    category: "Preventive Dentistry",
    description: "Professional cleaning removes plaque and tartar buildup from hard-to-reach areas between teeth and along the gumline. Regular cleanings protect gum health, brighten your natural smile, and prevent periodontal complications before they begin.",
    steps: [
      "Gentle ultrasonic and hand scaling to remove stubborn calculus and plaque",
      "Stain removal and specialized polishing for a smooth tooth surface",
      "Comprehensive periodontal gum assessment and oral hygiene recommendations"
    ]
  },
  whitening: {
    title: "Teeth Whitening",
    category: "Aesthetic Dentistry",
    description: "Our conservative teeth brightening approaches are tailored to your enamel sensitivity and desired shade. Using clinically supervised lightening gels, we help eliminate dietary stains from coffee, tea, and aging while preserving tooth enamel integrity.",
    steps: [
      "Enamel shade documentation and sensitivity baseline evaluation",
      "Protective barrier application to safeguard delicate gum tissues",
      "Application of professional-grade whitening agent followed by shade review"
    ]
  },
  rootcanal: {
    title: "Root Canal Treatment",
    category: "Endodontic Care",
    description: "When the dental pulp deep inside a tooth becomes inflamed or infected due to decay or injury, root canal treatment removes the diseased tissue, disinfects the inner chamber, and seals it carefully to preserve your natural tooth root.",
    steps: [
      "Clinical exam and digital imaging to assess root canal anatomy",
      "Gentle localized anesthesia to keep you comfortable throughout the visit",
      "Careful cleaning and disinfection of root canals, finished with a protective hermetic seal"
    ]
  },
  aligners: {
    title: "Clear Aligners",
    category: "Discreet Orthodontics",
    description: "A comfortable, discreet alternative to conventional metal braces. Custom clear plastic trays apply controlled, gentle forces to guide teeth into optimal alignment. They are removable for eating and brushing, fitting seamlessly into your daily lifestyle.",
    steps: [
      "Detailed oral assessment and accurate digital smile mapping",
      "Custom fabrication of sequential clear aligner trays",
      "Progressive wear schedule with routine clinical check-ins to monitor movement"
    ]
  },
  braces: {
    title: "Orthodontic Braces",
    category: "Structural Orthodontics",
    description: "Comprehensive orthodontic alignment designed to correct crowded teeth, spacing discrepancies, and bite misalignments. Modern brackets offer smaller profiles and refined mechanics for predictable structural alignment.",
    steps: [
      "Cephalometric analysis and functional bite evaluation",
      "Precise placement of orthodontic brackets and initial archwires",
      "Periodic scheduled adjustments and archwire progressions"
    ]
  },
  implants: {
    title: "Dental Implants",
    category: "Restorative Dentistry",
    description: "The gold standard for replacing missing teeth. A biocompatible titanium post integrates into the jawbone to serve as a sturdy artificial root, topped with a custom-crafted ceramic crown that looks, feels, and functions like a natural tooth.",
    steps: [
      "Bone density evaluation and restorative treatment planning",
      "Careful surgical placement of the biocompatible implant fixture",
      "Integration phase followed by custom abutment and lifelike crown placement"
    ]
  },
  wisdom: {
    title: "Wisdom Tooth Treatment",
    category: "Oral Surgery & Relief",
    description: "Third molars often lack sufficient space to erupt normally, causing localized pain, swelling, crowding, or food impaction. We offer thorough evaluations and gentle planned surgical removal when necessary for your comfort.",
    steps: [
      "Diagnostic radiograph to inspect tooth angle, nerve proximity, and impaction level",
      "Personalized plan to alleviate acute inflammation or schedule extraction",
      "Clear, attentive post-procedure instructions and scheduled follow-up"
    ]
  },
  cosmetic: {
    title: "Cosmetic Dentistry & Smile Design",
    category: "Smile Enhancement",
    description: "From conservative composite resin bonding to custom ceramic veneers, cosmetic treatments address chipped enamel, uneven edges, gaps, and tooth discoloration to create a balanced, confident, and harmonious smile.",
    steps: [
      "Facial and dental aesthetic consultation with shade matching",
      "Conservative preparation and digital preview of planned modifications",
      "Precision bonding and artistic finishing for natural translucency"
    ]
  },
  general: {
    title: "General Dentistry & Consultations",
    category: "Comprehensive Care",
    description: "Routine check-ups, tooth-colored composite fillings, cracked tooth management, and proactive oral health screenings designed to preserve and protect your oral well-being across every stage of life.",
    steps: [
      "Thorough examination of teeth, gums, and oral soft tissues",
      "Digital x-ray imaging when needed for precise diagnostics",
      "Clear explanation of findings and collaborative discussion of care priorities"
    ]
  }
};

function initTreatmentsModal() {
  const modal = document.getElementById('treatmentModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const bookBtn = document.getElementById('modalBookBtn');
  const learnMoreBtns = document.querySelectorAll('[data-treatment-key]');

  if (!modal) return;

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-treatment-key');
      const data = treatmentsData[key];
      if (data) {
        populateAndOpenModal(data, key);
      }
    });
  });

  function populateAndOpenModal(data, key) {
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalDesc').textContent = data.description;

    const list = document.getElementById('modalStepsList');
    list.innerHTML = '';
    data.steps.forEach((step, idx) => {
      const li = document.createElement('li');
      li.className = 'modal-step-item';
      li.innerHTML = `
        <span class="modal-step-badge">${idx + 1}</span>
        <span>${step}</span>
      `;
      list.appendChild(li);
    });

    if (bookBtn) {
      bookBtn.setAttribute('data-target-treatment', key);
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      const targetTreatment = bookBtn.getAttribute('data-target-treatment');
      closeModal();

      // Scroll to appointment and select treatment
      const formSection = document.getElementById('appointment');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('treatmentSelect');
        if (select) {
          const mapping = {
            cleaning: 'Dental Cleaning',
            whitening: 'Teeth Whitening',
            rootcanal: 'Root Canal',
            aligners: 'Aligners',
            braces: 'Braces',
            implants: 'Dental Implants',
            wisdom: 'Wisdom Tooth Treatment',
            cosmetic: 'Cosmetic Dentistry',
            general: 'General Consultation'
          };
          if (mapping[targetTreatment]) {
            select.value = mapping[targetTreatment];
          }
        }
      }
    });
  }
}

/* ==========================================================================
   GALLERY & LIGHTBOX
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title')?.textContent || '';
      const tag = item.querySelector('.gallery-item-tag')?.textContent || '';

      if (lightbox && lightboxImg && lightboxCaption && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = `${title} (${tag})`;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    btn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-button');
          otherBtn?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   APPOINTMENT FORM VALIDATION
   ========================================================================== */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const feedback = document.getElementById('appointmentFeedback');

  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('prefDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name
    const nameInput = document.getElementById('fullName');
    const nameError = document.getElementById('nameError');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, nameError, 'Please enter your full name (minimum 2 characters).');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Phone
    const phoneInput = document.getElementById('phoneNumber');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^[0-9+\s\-()]{8,15}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      setError(phoneInput, phoneError, 'Please enter a valid phone number (e.g. 081699 92014 or 9820012345).');
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Email
    const emailInput = document.getElementById('emailAddress');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Date
    const dateError = document.getElementById('dateError');
    if (!dateInput.value) {
      setError(dateInput, dateError, 'Please select your preferred appointment date.');
      isValid = false;
    } else {
      clearError(dateInput, dateError);
    }

    // Time
    const timeInput = document.getElementById('prefTime');
    const timeError = document.getElementById('timeError');
    if (!timeInput.value) {
      setError(timeInput, timeError, 'Please choose a preferred time slot.');
      isValid = false;
    } else {
      clearError(timeInput, timeError);
    }

    // Treatment
    const treatmentInput = document.getElementById('treatmentSelect');
    const treatmentError = document.getElementById('treatmentError');
    if (!treatmentInput.value) {
      setError(treatmentInput, treatmentError, 'Please choose a dental treatment.');
      isValid = false;
    } else {
      clearError(treatmentInput, treatmentError);
    }

    if (isValid) {
      form.style.display = 'none';
      if (feedback) {
        feedback.classList.add('show');
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });

  function setError(input, errorElement, msg) {
    input.classList.add('error');
    if (errorElement) {
      errorElement.textContent = msg;
      errorElement.classList.add('show');
    }
  }

  function clearError(input, errorElement) {
    input.classList.remove('error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }

  // Reset button in feedback
  const resetBtn = document.getElementById('resetAppointmentBtn');
  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    feedback?.classList.remove('show');
  });
}

/* ==========================================================================
   SMOOTH SCROLL & DIRECT APPOINTMENT LINKING
   ========================================================================== */
function initSmoothScroll() {
  // Direct buttons to preselect treatments
  const exploreAlignersBtn = document.querySelector('[data-select-treatment="Aligners"]');
  exploreAlignersBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToAppointmentAndSelect('Aligners');
  });

  const bookRootCanalBtn = document.querySelector('[data-select-treatment="Root Canal"]');
  bookRootCanalBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToAppointmentAndSelect('Root Canal');
  });

  function scrollToAppointmentAndSelect(treatmentName) {
    const target = document.getElementById('appointment');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      const select = document.getElementById('treatmentSelect');
      if (select) {
        select.value = treatmentName;
      }
    }
  }
}
