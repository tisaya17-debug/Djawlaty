const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Search Tabs
const searchTabs = document.querySelectorAll('.search-tab');
const searchForm = document.getElementById('searchForm');

if (searchTabs.length > 0) {
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update form fields based on selected tab
      const tabType = tab.dataset.tab;
      updateSearchFields(tabType);
    });
  });
}

function updateSearchFields(type) {
  const fieldsContainer = document.getElementById('flightsFields');
  if (!fieldsContainer) return;
  
  switch(type) {
    case 'flights':
      fieldsContainer.innerHTML = `
        <div class="field-group">
          <label>From</label>
          <input type="text" placeholder="Departure city" name="from">
        </div>
        <div class="field-group">
          <label>To</label>
          <input type="text" placeholder="Destination city" name="to">
        </div>
        <div class="field-group">
          <label>Departure</label>
          <input type="date" name="departure">
        </div>
        <div class="field-group">
          <label>Return</label>
          <input type="date" name="return">
        </div>
        <div class="field-group">
          <label>Travelers</label>
          <select name="travelers">
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>3 Adults</option>
            <option>4+ Adults</option>
          </select>
        </div>
      `;
      break;
    case 'hotels':
      fieldsContainer.innerHTML = `
        <div class="field-group">
          <label>Destination</label>
          <input type="text" placeholder="City or hotel name" name="destination">
        </div>
        <div class="field-group">
          <label>Check-in</label>
          <input type="date" name="checkin">
        </div>
        <div class="field-group">
          <label>Check-out</label>
          <input type="date" name="checkout">
        </div>
        <div class="field-group">
          <label>Rooms</label>
          <select name="rooms">
            <option>1 Room</option>
            <option>2 Rooms</option>
            <option>3 Rooms</option>
            <option>4+ Rooms</option>
          </select>
        </div>
        <div class="field-group">
          <label>Guests</label>
          <select name="guests">
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4+ Guests</option>
          </select>
        </div>
      `;
      break;
    case 'restaurants':
      fieldsContainer.innerHTML = `
        <div class="field-group">
          <label>Location</label>
          <input type="text" placeholder="City or area" name="location">
        </div>
        <div class="field-group">
          <label>Cuisine</label>
          <select name="cuisine">
            <option value="">All Cuisines</option>
            <option>Italian</option>
            <option>Japanese</option>
            <option>French</option>
            <option>Indian</option>
            <option>Mexican</option>
          </select>
        </div>
        <div class="field-group">
          <label>Date</label>
          <input type="date" name="date">
        </div>
        <div class="field-group">
          <label>Time</label>
          <input type="time" name="time">
        </div>
        <div class="field-group">
          <label>Party Size</label>
          <select name="partySize">
            <option>2 People</option>
            <option>3 People</option>
            <option>4 People</option>
            <option>5+ People</option>
          </select>
        </div>
      `;
      break;
    case 'tours':
      fieldsContainer.innerHTML = `
        <div class="field-group">
          <label>Destination</label>
          <input type="text" placeholder="Country or region" name="destination">
        </div>
        <div class="field-group">
          <label>Start Date</label>
          <input type="date" name="startDate">
        </div>
        <div class="field-group">
          <label>Duration</label>
          <select name="duration">
            <option>Any Duration</option>
            <option>1-3 Days</option>
            <option>4-7 Days</option>
            <option>1-2 Weeks</option>
            <option>2+ Weeks</option>
          </select>
        </div>
        <div class="field-group">
          <label>Tour Type</label>
          <select name="tourType">
            <option>All Types</option>
            <option>Adventure</option>
            <option>Cultural</option>
            <option>Relaxation</option>
            <option>Family</option>
          </select>
        </div>
        <div class="field-group">
          <label>Group Size</label>
          <select name="groupSize">
            <option>Any Size</option>
            <option>Small (1-8)</option>
            <option>Medium (9-15)</option>
            <option>Large (16+)</option>
          </select>
        </div>
      `;
      break;
  }
}

// Search Form Submit
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const activeTab = document.querySelector('.search-tab.active');
    const tabType = activeTab ? activeTab.dataset.tab : 'flights';
    
    // Redirect to appropriate page
    window.location.href = `${tabType}.html`;
  });
}

// Favorite Button Toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.result-favorite')) {
    const btn = e.target.closest('.result-favorite');
    btn.classList.toggle('active');
  }
});

// Filter Toggle
const filterToggleBtn = document.getElementById('filterToggle');
const filtersPanel = document.getElementById('filtersPanel');

if (filterToggleBtn && filtersPanel) {
  filterToggleBtn.addEventListener('click', () => {
    filtersPanel.classList.toggle('hidden');
  });
}

// Price Range Slider
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

if (priceRange && priceValue) {
  priceRange.addEventListener('input', () => {
    priceValue.textContent = `$${priceRange.value}`;
  });
}

// Tabs Functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

if (tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Modal Functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Form Validation
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Booking Form
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(bookingForm)) {
      // Simulate booking submission
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      window.location.href = 'index.html';
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

// Provider Login Form
const providerLoginForm = document.getElementById('providerLoginForm');

if (providerLoginForm) {
  providerLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = providerLoginForm.querySelector('input[type="email"]').value;
    const password = providerLoginForm.querySelector('input[type="password"]').value;
    
    if (email && password) {
      // Simulate login
      window.location.href = 'provider-dashboard.html';
    } else {
      alert('Please enter your email and password.');
    }
  });
}

// Admin Login Form
const adminLoginForm = document.getElementById('adminLoginForm');

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = adminLoginForm.querySelector('input[type="email"]').value;
    const password = adminLoginForm.querySelector('input[type="password"]').value;
    
    if (email && password) {
      // Simulate login
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Please enter your email and password.');
    }
  });
}

// Smooth Scroll for Anchor Links
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

// Lazy Load Images
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
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
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize Date Inputs with Today's Date
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
  input.min = today;
});

// Sort Functionality
const sortSelect = document.getElementById('sortSelect');
const resultsGrid = document.querySelector('.results-grid');

if (sortSelect && resultsGrid) {
  sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const cards = Array.from(resultsGrid.children);
    
    cards.sort((a, b) => {
      const priceA = parseInt(a.querySelector('.result-price')?.textContent.replace(/\D/g, '') || 0);
      const priceB = parseInt(b.querySelector('.result-price')?.textContent.replace(/\D/g, '') || 0);
      const ratingA = parseFloat(a.querySelector('.result-card-rating span')?.textContent || 0);
      const ratingB = parseFloat(b.querySelector('.result-card-rating span')?.textContent || 0);
      
      switch(sortValue) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'rating':
          return ratingB - ratingA;
        default:
          return 0;
      }
    });
    
    cards.forEach(card => resultsGrid.appendChild(card));
  });
}

// Sidebar Active State
const currentPage = window.location.pathname.split('/').pop();
const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
const dropdownTriggers = document.querySelectorAll('[data-dropdown]');

dropdownTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = trigger.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('active');
    }
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
    menu.classList.remove('active');
  });
});

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
const buttons = document.querySelectorAll(".role-btn");
const providerFields = document.getElementById("provider-fields");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // remove active from all buttons
        buttons.forEach(b => b.classList.remove("active"));

        // activate clicked button
        btn.classList.add("active");

        // show/hide provider fields
        if (btn.dataset.role === "provider") {
            providerFields.style.display = "block";
        } else {
            providerFields.style.display = "none";
        }
    });
});
// FIELD BUTTONS (Provider fields)
const fieldButtons = document.querySelectorAll(".field-btn");

fieldButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // remove active from all field buttons
        fieldButtons.forEach(b => b.classList.remove("active"));
        // add active to clicked button
        btn.classList.add("active");

    });
});
document.addEventListener("DOMContentLoaded", function () {

    // ===== SIGN UP ROLE SYSTEM =====

    const roleButtons = document.querySelectorAll(".role-btn");
    const providerFields = document.getElementById("provider-fields");
    const roleInput = document.getElementById("role");

    if (roleButtons.length > 0 && roleInput) {

        roleButtons.forEach(btn => {
            btn.addEventListener("click", () => {

                roleButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                roleInput.value = btn.dataset.role;

                if (providerFields) {
                    if (btn.dataset.role === "provider") {
                        providerFields.style.display = "block";
                    } else {
                        providerFields.style.display = "none";
                    }
                }

            });
        });

    }


    // ===== FIELD SYSTEM =====

    const fieldButtons = document.querySelectorAll(".field-btn");
    const fieldInput = document.getElementById("field");

    if (fieldButtons.length > 0 && fieldInput) {

        fieldButtons.forEach(btn => {
            btn.addEventListener("click", () => {

                fieldButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                fieldInput.value = btn.textContent;

            });
        });

    }

});