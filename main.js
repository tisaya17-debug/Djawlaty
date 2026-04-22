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
      <div class="field-group"><label>Check-in</label><input type="date"></div>
      <div class="field-group"><label>Check-out</label><input type="date"></div>
    `,
    restaurants: `
      <div class="field-group"><label>Location</label><input type="text"></div>
      <div class="field-group"><label>Date</label><input type="date"></div>
      <div class="field-group"><label>Time</label><input type="time"></div>
    `,
    tours: `
      <div class="field-group"><label>Destination</label><input type="text"></div>
      <div class="field-group"><label>Date</label><input type="date"></div>
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
let selectedRole = null;

document.querySelectorAll(".role-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRole = btn.dataset.role;
  });
});

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!username || !password || !selectedRole) {
      alert("Fill all fields");
      return;
    }

    if (selectedRole === "admin") window.location.href = "admin.html";
    else if (selectedRole === "provider") window.location.href = "providers-dashboard.html";
    else window.location.href = "index.html";
  });
}


// ================= SIGNUP (FIXED CLEAN VERSION) =================
document.addEventListener("DOMContentLoaded", function () {

  const signupForm = document.getElementById("signupForm");
  const roleButtons = document.querySelectorAll(".role-btn");
  const fieldButtons = document.querySelectorAll(".field-btn");
  const providerFields = document.getElementById("provider-fields");
  const roleInput = document.getElementById("role");
  const fieldInput = document.getElementById("field");

  let selectedRole = null;
  let selectedField = null;

  // ROLE
  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      selectedRole = btn.dataset.role;
      if (roleInput) roleInput.value = selectedRole;

      if (providerFields) {
        providerFields.style.display =
          selectedRole === "provider" ? "block" : "none";
      }
    });
  });

  // FIELD
  fieldButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      fieldButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      selectedField = btn.textContent;
      if (fieldInput) fieldInput.value = selectedField;
    });
  });

  // SUBMIT
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = signupForm.querySelectorAll("input");

      const fullName = inputs[0].value.trim();
      const username = inputs[1].value.trim();
      const email = inputs[2].value.trim();
      const password = inputs[3].value;
      const confirm = inputs[4].value;

      if (!fullName || !username || !email || !password || !confirm) {
        alert("Fill all fields");
        return;
      }

      if (password !== confirm) {
        alert("Passwords not match");
        return;
      }

      if (!selectedRole) {
        alert("Select role");
        return;
      }

      if (selectedRole === "provider" && !selectedField) {
        alert("Select field");
        return;
      }

      localStorage.setItem("user", JSON.stringify({
        fullName,
        username,
        email,
        password,
        role: selectedRole,
        field: selectedField
      }));

      alert("Account created!");
      window.location.href = "login.html";
    });
  }

});


// ================= EXTRA =================

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// min date today
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = new Date().toISOString().split('T')[0];
});


// ================= SORT + FILTER =================
document.addEventListener('DOMContentLoaded', () => {

  const sortSelect = document.getElementById('sortSelect');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  const gridSelectors =
    '.hotels-grid, .flights-list, .restaurants-grid, .tours-grid, .results-grid';

  const cardSelectors =
    '.hotel-card, .flight-card, .restaurant-card, .tour-card, .result-card';

  const getNumber = (text) => {
    if (!text) return 0;
    const num = text.replace(/[^0-9]/g, '');
    return num ? parseInt(num) : 0;
  };

  // SORT
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {

      const sortBy = sortSelect.value;
      const resultsGrid = document.querySelector(gridSelectors);
      const allCards = Array.from(document.querySelectorAll(cardSelectors));

      if (!resultsGrid || allCards.length === 0) return;

      allCards.sort((a, b) => {

        const priceA = getNumber(a.querySelector('.result-price, .price')?.textContent);
        const priceB = getNumber(b.querySelector('.result-price, .price')?.textContent);

        const ratingA = getNumber(a.querySelector('.rating, .stars')?.textContent);
        const ratingB = getNumber(b.querySelector('.rating, .stars')?.textContent);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return ratingB - ratingA;

        return 0;
      });

      allCards.forEach(card => resultsGrid.appendChild(card));
    });
  }

  // FILTER PRICE
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
      alert("Success! Your booking is confirmed.");
      window.location.href = "index.html";
    });
  }
});


// ================= PROVIDER TABLE =================
document.addEventListener('DOMContentLoaded', () => {

  const addForm = document.getElementById('addProviderForm');
  const tableBody = document.querySelector('#providersTable tbody');

  if (addForm && tableBody) {

    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('serviceName').value;
      const service = document.getElementById('serviceType').value;
      const date = document.getElementById('serviceDate').value;

      const randomID = `#BK-2026-${Math.floor(Math.random() * 900) + 100}`;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${randomID}</td>
        <td>${name}</td>
        <td>${service}</td>
        <td>${date}</td>
        <td><span class="status-badge pending">Pending</span></td>
      `;

      tableBody.prepend(newRow);

      alert("Provider added!");
      addForm.reset();
    });
  }
});