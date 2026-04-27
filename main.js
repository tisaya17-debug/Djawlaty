// ================= NAVBAR =================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}


// ================= SEARCH =================
const searchTabs = document.querySelectorAll('.search-tab');
const searchForm = document.getElementById('searchForm');

if (searchTabs.length > 0) {
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateSearchFields(tab.dataset.tab);
    });
  });
}

function updateSearchFields(type) {
  const container = document.getElementById('flightsFields');
  if (!container) return;

  const fields = {
    flights: `
      <div class="field-group"><label>From</label><input type="text" name="from"></div>
      <div class="field-group"><label>To</label><input type="text" name="to"></div>
      <div class="field-group"><label>Departure</label><input type="date" name="departure"></div>
      <div class="field-group"><label>Return</label><input type="date" name="return"></div>
    `,
    hotels: `
      <div class="field-group"><label>Destination</label><input type="text" name="destination"></div>
      <div class="field-group"><label>Check-in</label><input type="date" name="checkin"></div>
      <div class="field-group"><label>Check-out</label><input type="date" name="checkout"></div>
    `,
    restaurants: `
      <div class="field-group"><label>Location</label><input type="text" name="location"></div>
      <div class="field-group"><label>Date</label><input type="date" name="date"></div>
      <div class="field-group"><label>Time</label><input type="time" name="time"></div>
    `,
    tours: `
      <div class="field-group"><label>Destination</label><input type="text" name="destination"></div>
      <div class="field-group"><label>Date</label><input type="date" name="date"></div>
    `
  };

  container.innerHTML = fields[type] || "";
}

if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const active = document.querySelector('.search-tab.active');
    window.location.href = `${active?.dataset.tab || 'flights'}.html`;
  });
}


// ================= COMMON VALIDATION =================
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      valid = false;
    } else {
      input.classList.remove('error');
    }
  });
  return valid;
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
let loginSelectedRole = null;

document.querySelectorAll(".role-btn").forEach(btn => {
  if (!loginForm) return;
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loginSelectedRole = btn.dataset.role;
  });
});

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[name="username"]')?.value.trim()
                  || loginForm.querySelector('input[type="text"]')?.value.trim();
    const password = loginForm.querySelector('input[name="password"]')?.value
                  || loginForm.querySelector('input[type="password"]')?.value;

    if (!username || !password || !loginSelectedRole) {
      alert("Veuillez remplir tous les champs et sélectionner un rôle.");
      return;
    }

    if (loginSelectedRole === "admin") window.location.href = "admin.html";
    else if (loginSelectedRole === "provider") window.location.href = "providers-dashboard.html";
    else window.location.href = "index.html";
  });
}


// ================= SIGNUP =================
const signupForm = document.getElementById("signupform");

if (signupForm) {

  const roleInput  = document.getElementById("role");
  const fieldInput = document.getElementById("field");

  let selectedRole  = "";
  let selectedField = "";

  // ── ROLE SELECTION ──────────────────────────────────────────────────────────
  document.querySelectorAll(".role-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRole = btn.dataset.role;

      // Write into hidden input immediately so it is included in POST
      if (roleInput) roleInput.value = selectedRole;

      const providerFields = document.getElementById("provider-fields");
      if (providerFields) {
        providerFields.style.display = selectedRole === "provider" ? "block" : "none";
      }

      if (selectedRole !== "provider") {
        selectedField = "";
        if (fieldInput) fieldInput.value = "";
      }

      document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ── FIELD SELECTION ─────────────────────────────────────────────────────────
  document.querySelectorAll(".field-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedField = btn.textContent.trim();

      // Write into hidden input immediately so it is included in POST
      if (fieldInput) fieldInput.value = selectedField;

      document.querySelectorAll(".field-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ── FORM VALIDATION & SUBMIT ────────────────────────────────────────────────
  signupForm.addEventListener("submit", (e) => {

    // Always intercept first to validate
    e.preventDefault();

    const fullName = signupForm.querySelector('[name="fullname"]')?.value.trim();
    const username = signupForm.querySelector('[name="username"]')?.value.trim();
    const email    = signupForm.querySelector('[name="email"]')?.value.trim();
    const password = signupForm.querySelector('[name="password"]')?.value;
    const confirm  = signupForm.querySelector('[name="confirm_password"]')?.value;

    // Read role/field from the hidden inputs — most reliable source
    const role  = roleInput?.value.trim()  || "";
    const field = fieldInput?.value.trim() || "";

    if (!fullName || !username || !email || !password || !confirm) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (!role) {
      alert("Veuillez sélectionner un rôle (Client ou Provider).");
      return;
    }

    if (role === "provider" && !field) {
      alert("Veuillez sélectionner votre domaine d'activité.");
      return;
    }

    // ✅ All validations passed — submit programmatically to send POST to PHP
    signupForm.submit();
  });
}


// ================= EXTRA =================

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Min date = today
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = new Date().toISOString().split('T')[0];
});


// ================= SORT + FILTER =================
document.addEventListener('DOMContentLoaded', () => {

  const sortSelect = document.getElementById('sortSelect');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  const gridSelectors = '.hotels-grid, .flights-list, .restaurants-grid, .tours-grid, .results-grid';
  const cardSelectors = '.hotel-card, .flight-card, .restaurant-card, .tour-card, .result-card';

  const getNumber = (text) => {
    if (!text) return 0;
    const num = text.replace(/[^0-9]/g, '');
    return num ? parseInt(num) : 0;
  };

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const sortBy = sortSelect.value;
      const resultsGrid = document.querySelector(gridSelectors);
      const allCards = Array.from(document.querySelectorAll(cardSelectors));

      if (!resultsGrid || allCards.length === 0) return;

      allCards.sort((a, b) => {
        const priceA  = getNumber(a.querySelector('.result-price, .price')?.textContent);
        const priceB  = getNumber(b.querySelector('.result-price, .price')?.textContent);
        const ratingA = getNumber(a.querySelector('.rating, .stars')?.textContent);
        const ratingB = getNumber(b.querySelector('.rating, .stars')?.textContent);

        if (sortBy === 'price-low')  return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating')     return ratingB - ratingA;
        return 0;
      });

      allCards.forEach(card => resultsGrid.appendChild(card));
    });
  }

  if (priceRange) {
    priceRange.addEventListener('input', () => {
      const currentPrice = parseInt(priceRange.value);
      if (priceValue) priceValue.textContent = `$${currentPrice}`;

      document.querySelectorAll(cardSelectors).forEach(card => {
        const priceElem = card.querySelector('.result-price, .price');
        const price = getNumber(priceElem?.textContent);
        card.style.display = price <= currentPrice ? 'block' : 'none';
      });
    });
  }
});


// ================= BOOKING =================
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Succès ! Votre réservation est confirmée.");
      window.location.href = "index.html";
    });
  }
});


// ================= PROVIDER TABLE =================
document.addEventListener('DOMContentLoaded', () => {
  const addForm   = document.getElementById('addProviderForm');
  const tableBody = document.querySelector('#providersTable tbody');

  if (addForm && tableBody) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('serviceName').value.trim();
      const service = document.getElementById('serviceType').value.trim();
      const date    = document.getElementById('serviceDate').value;

      if (!name || !service || !date) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const randomID = `#BK-2026-${Math.floor(Math.random() * 900) + 100}`;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${escapeHTML(randomID)}</td>
        <td>${escapeHTML(name)}</td>
        <td>${escapeHTML(service)}</td>
        <td>${escapeHTML(date)}</td>
        <td><span class="status-badge pending">Pending</span></td>
      `;

      tableBody.prepend(newRow);
      alert("Prestataire ajouté !");
      addForm.reset();
    });
  }
});

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}