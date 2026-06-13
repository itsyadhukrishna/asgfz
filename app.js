/* ============================================================
   ASG FZE LLC — Aircraft Spare Parts & Components
   app.js | Main JavaScript
   ============================================================ */
'use strict';

/* ── TICKER DATA ── */
const TICKER_ITEMS = [
  'Boeing',
  'Airbus',
  'Airbus Eurocopter',
  'ATR',
  'AW Helicopter',
  'BEECHCRAFT',
  'Bell Helicopter',
  'BOMBARDIER',
  'Cessna',
  'Consumable Items',
  'EMBRAER',
  'Engine Parts',
  'General Items',
  'GROB G',
  'Sikorsky Helicopter',
  'SPARTAN',
];

/* ── CATEGORIES DATA ── */
const CATEGORIES = [
  { icon:'📡', ata:'ATA 23/34', name:'Avionics & Navigation', desc:'LRUs, VHF/HF radios, FMS, TCAS II, weather radar, ILS/VOR, transponders, ADIRU, and cockpit displays.', tags:['LRU','FMS','TCAS','ILS','ADIRU'] },
  { icon:'🔥', ata:'ATA 71-80', name:'Engine Components', desc:'Fan blades, combustor liners, turbine vanes, fuel nozzles, ignition, and gearboxes for CFM56, GE90, V2500, PW4000.', tags:['CFM56','GE90','V2500','PW4000'] },
  { icon:'🛩️', ata:'ATA 57',   name:'Airframe & Structures', desc:'Wing panels, fuselage skins, bulkheads, floor beams, control surfaces, fairings, and composite repair materials.', tags:['Composite','Structural','Control Surfaces'] },
  { icon:'⚙️', ata:'ATA 29',   name:'Hydraulic Systems', desc:'Hydraulic pumps, actuators, manifolds, accumulators, reservoirs, hoses, and fittings for all major types.', tags:['Pumps','Actuators','Eaton','Parker'] },
  { icon:'🛞', ata:'ATA 32',   name:'Landing Gear', desc:'MLG/NLG assemblies, wheels, brakes, brake control valves, torque links, shock struts, and downlocks.', tags:['Wheels','Brakes','Safran','Messier'] },
  { icon:'🔋', ata:'ATA 24',   name:'Electrical & Power', desc:'Generators, IDGs, APU starters, NiCad batteries, power distribution panels, circuit breakers, wiring.', tags:['IDG','APU','Batteries','Generators'] },
  { icon:'❄️', ata:'ATA 21',   name:'Air Conditioning / Bleed', desc:'ACM packs, heat exchangers, flow control valves, ozone converters, pack controllers.', tags:['ACM','Pressurization','Valves'] },
  { icon:'🛋️', ata:'ATA 25',  name:'Cabin & Interiors', desc:'PSUs, overhead bins, economy & business seats, galley inserts, lavatories, and IFE systems.', tags:['PSU','Galley','IFE','Seats'] },
  { icon:'🔩', ata:'ATA 05',   name:'Consumables & Hardware', desc:'Fasteners, seals, O-rings, gaskets, filters, lubricants, adhesives, and standard aviation hardware.', tags:['Fasteners','Seals','Filters'] },
];

/* ── PRODUCT IMAGES (Unsplash - aviation themed) ── */
const PRODUCT_IMAGES = {
  'Avionics':       'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=75',
  'Engine':         'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75',
  'Landing Gear':   'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75',
  'Hydraulics':     'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=75',
  'Electrical':     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
  'Air Conditioning':'https://images.unsplash.com/photo-1569605803663-e9337d901ff9?w=600&q=75',
  'Cabin Interiors':'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75',
};

/* ── SAMPLE PRODUCTS ── */
const SAMPLE_PRODUCTS = [
  {
    img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=700&q=75',
    pn: '822-0880-001', cat: 'Avionics',
    name: 'Honeywell VHF Transceiver',
    desc: 'Dual-channel VHF transceiver with 8.33kHz channel spacing. Certified for commercial airline use on all major aircraft types.',
    ac: 'B737 / B757 / A320', cond: 'New / Overhauled', stock: 'in', stockLabel: 'In Stock',
    cert: 'FAA 8130-3 / EASA Form 1',
    specs: { 'Freq Range':'118.000–151.975 MHz','Channel':'8.33 kHz','Output':'25W nominal','Weight':'2.1 kg','OEM':'Honeywell Aerospace' }
  },
  {
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=75',
    pn: '3801450-1', cat: 'Landing Gear',
    name: 'B737-800 MLG Wheel Assembly',
    desc: 'Main Landing Gear wheel assembly complete with carbon heat pack and brake wear indicators. Zero-time overhaul.',
    ac: 'Boeing 737-800/-900', cond: 'Overhauled', stock: 'in', stockLabel: 'In Stock',
    cert: 'FAA 8130-3 + Full Trace',
    specs: { 'Aircraft':'B737-800/900','Condition':'Overhauled (Zero-Time)','Material':'Carbon Brake Pack','OEM':'Safran Landing Systems' }
  },
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=75',
    pn: '9230M93G04', cat: 'Engine',
    name: 'CFM56-7B Fan Blade Assembly',
    desc: 'OEM CFM56-7B titanium fan blade, fully serviceable with all traceability documentation. Suitable for B737NG operators.',
    ac: 'Boeing 737NG (CFM56-7B)', cond: 'Serviceable', stock: 'low', stockLabel: 'Low Stock',
    cert: 'EASA Form 1 + OEM Trace',
    specs: { 'Engine':'CFM56-7B','Material':'Titanium Alloy','Condition':'Serviceable','Traceability':'Full OEM Trace','OEM':'CFM International' }
  },
  {
    img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=700&q=75',
    pn: '5000135-1', cat: 'Avionics',
    name: 'Collins TCAS II Computer Unit',
    desc: 'Traffic Collision Avoidance System (TCAS II v7.1) computer unit, dual processor, fully tested and serviceable.',
    ac: 'B737 / B757 / A330', cond: 'Serviceable', stock: 'in', stockLabel: 'In Stock',
    cert: 'FAA 8130-3 / EASA Form 1',
    specs: { 'Standard':'TCAS II v7.1','Processor':'Dual','MTBur':'5,000+ hrs','OEM':'Collins Aerospace' }
  },
  {
    img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=75',
    pn: '5704420-2', cat: 'Hydraulics',
    name: 'A320 Engine Driven Hydraulic Pump',
    desc: 'Variable pressure, engine-driven hydraulic pump for Airbus A320/A321 family. With test report and full documentation.',
    ac: 'Airbus A320 / A321', cond: 'Overhauled', stock: 'order', stockLabel: 'On Order',
    cert: 'EASA Form 1',
    specs: { 'Pressure':'3,000 PSI','Flow Rate':'37 GPM','Drive':'Engine-Driven','Fluid':'Skydrol 5','OEM':'Parker Hannifin' }
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75',
    pn: 'CM-2500-4', cat: 'Electrical',
    name: 'APU Starter / Generator',
    desc: 'Auxiliary Power Unit starter/generator for Boeing 737 Classic and NG. Dual function start and generate capability.',
    ac: 'Boeing 737 CL / NG', cond: 'New', stock: 'in', stockLabel: 'In Stock',
    cert: 'FAA 8130-3',
    specs: { 'Type':'Starter/Generator','Output':'90kVA / 115VAC','Frequency':'400 Hz','APU':'Allied Signal 131-9B','OEM':'Honeywell' }
  },
  {
    img: 'https://images.unsplash.com/photo-1569605803663-e9337d901ff9?w=700&q=75',
    pn: '211-58081-9', cat: 'Air Conditioning',
    name: 'Air Cycle Machine (ACM) Pack',
    desc: 'Three-wheel Air Cycle Machine for environmental control system. New with full manufacturer certification.',
    ac: 'Boeing 737-300/400/500', cond: 'New', stock: 'in', stockLabel: 'In Stock',
    cert: 'FAA 8130-3 / COC',
    specs: { 'Type':'3-Wheel ACM','Air Flow':'2.25 lb/s','Max RPM':'80,000','Weight':'7.8 kg','OEM':'Collins / Hamilton Sundstrand' }
  },
  {
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=75',
    pn: 'IFE-PXW-440', cat: 'Cabin Interiors',
    name: 'Panasonic eX3 IFE Seat Unit',
    desc: '10.6" HD In-Flight Entertainment seat display, compatible with Panasonic eX3 system. Refurbished to serviceable standard.',
    ac: 'A350 / B787 / A380', cond: 'Serviceable', stock: 'low', stockLabel: 'Low Stock',
    cert: 'COC + Test Report',
    specs: { 'Screen':'10.6" HD LCD','System':'Panasonic eX3','Interfaces':'USB / Headphone','OEM':'Panasonic Avionics' }
  },
];

/* ── INVENTORY (for search) ── */
const INVENTORY = [
  { pn:'5000135-1',   name:'TCAS II Computer Unit',          cat:'Avionics',         ac:'B737/B757/A330',    cond:'Serviceable', stock:'in-stock' },
  { pn:'822-0880-001',name:'VHF Transceiver',                cat:'Avionics',         ac:'All Types',         cond:'New',         stock:'in-stock' },
  { pn:'3801450-1',   name:'MLG Wheel Assembly',             cat:'Landing Gear',     ac:'B737-800',          cond:'Overhauled',  stock:'in-stock' },
  { pn:'5704420-2',   name:'Engine Driven Hydraulic Pump',   cat:'Hydraulics',       ac:'A320/A321',         cond:'Overhauled',  stock:'on-order' },
  { pn:'CM-2500-4',   name:'APU Starter/Generator',          cat:'Electrical',       ac:'B737 CL/NG',        cond:'New',         stock:'in-stock' },
  { pn:'S283Q004-5',  name:'Brake Control Valve',            cat:'Landing Gear',     ac:'A330/A340',         cond:'Overhauled',  stock:'in-stock' },
  { pn:'1159880-1',   name:'EGT Thermocouple Assembly',      cat:'Engine',           ac:'CFM56-7B',          cond:'New',         stock:'in-stock' },
  { pn:'2118012-7',   name:'FMS Control Display Unit',       cat:'Avionics',         ac:'B737NG',            cond:'Serviceable', stock:'on-order' },
  { pn:'9230M93G04',  name:'CFM56-7B Fan Blade',             cat:'Engine',           ac:'B737NG',            cond:'Serviceable', stock:'in-stock' },
  { pn:'211-58081-9', name:'Air Cycle Machine Pack',         cat:'Air Conditioning', ac:'B737 Classic',      cond:'New',         stock:'in-stock' },
  { pn:'IFE-PXW-440', name:'IFE Seat Display Unit',         cat:'Cabin Interiors',  ac:'A350/B787',         cond:'Serviceable', stock:'in-stock' },
  { pn:'CM-4031-6',   name:'Nose Gear Steering Actuator',   cat:'Landing Gear',     ac:'A320 Family',       cond:'Overhauled',  stock:'on-order' },
  { pn:'HW-2200-APU', name:'Honeywell GTCP36-300 APU',      cat:'Electrical',       ac:'B737',              cond:'Serviceable', stock:'in-stock' },
  { pn:'GE90-FAN-01', name:'GE90-115B Fan Blade',           cat:'Engine',           ac:'B777-300ER',        cond:'Serviceable', stock:'in-stock' },
  { pn:'PRK-7201-A',  name:'Parker Brake Metering Valve',   cat:'Hydraulics',       ac:'A320 Family',       cond:'Overhauled',  stock:'in-stock' },
];

/* ══ INIT ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  buildFeaturedProducts();
  initSearch();
  initNav();
  initScrollReveal();
  initModal();
  initForm();
  initCatTabs();
});

/* ── TICKER ── */
function buildTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  el.innerHTML = doubled.map(t =>
    `<span class="ticker-item"><span class="dot"></span>${t}</span>`
  ).join('');
}

/* ── FEATURED PRODUCTS ── */
function buildFeaturedProducts(filter = '') {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const items = filter ? SAMPLE_PRODUCTS.filter(p => p.cat === filter) : SAMPLE_PRODUCTS;
  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--muted);font-family:var(--font-mono);font-size:12px;letter-spacing:2px;padding:40px 0;grid-column:1/-1">NO PRODUCTS IN THIS CATEGORY YET — ENQUIRE DIRECTLY.</p>';
    return;
  }
  grid.innerHTML = items.map((p, i) => `
    <div class="feat-product reveal" data-delay="${Math.min(i, 5) * 80}"
         onclick="openProductModal(${SAMPLE_PRODUCTS.indexOf(p)})" role="button" tabindex="0">
      <div class="feat-product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="pn-overlay">${p.pn}</div>
      </div>
      <div class="feat-product-body">
        <div class="fp-cat">${p.cat}</div>
        <div class="fp-name">${p.name}</div>
        <div class="fp-desc">${p.desc}</div>
        <div class="fp-footer">
          <div class="fp-price">&#128203; Request Quote</div>
          <div class="fp-stock">
            <span class="stock-dot ${p.stock}"></span>
            ${p.stockLabel}
          </div>
        </div>
      </div>
    </div>
  `).join('');
  initScrollReveal();
}

/* ── CATEGORY TABS ── */
function initCatTabs() {
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      buildFeaturedProducts(tab.dataset.cat || '');
    });
  });
}

/* ── SEARCH ── */
let activeFilter = '';

function initSearch() {
  document.getElementById('searchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') runSearch();
  });
  document.getElementById('searchBtn')?.addEventListener('click', runSearch);

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter || '';
      const q = document.getElementById('searchInput')?.value.trim();
      if (q || activeFilter) runSearch();
    });
  });
}

function runSearch() {
  const q   = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const cat = (document.getElementById('searchCat')?.value || '');
  const resultsEl = document.getElementById('search-results');
  const grid      = document.getElementById('results-grid');
  const countEl   = document.getElementById('results-count');
  if (!resultsEl || !grid || !countEl) return;

  let results = INVENTORY.filter(item => {
    const matchQ      = !q || item.pn.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q) || item.ac.toLowerCase().includes(q);
    const matchFilter = !activeFilter || item.ac.toLowerCase().includes(activeFilter.toLowerCase());
    const matchCat    = !cat || item.cat.toLowerCase().includes(cat.toLowerCase());
    return matchQ && matchFilter && matchCat;
  });

  if (!q && !cat && !activeFilter) results = INVENTORY;

  countEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
  grid.innerHTML = results.map(item => `
    <div class="result-card" onclick='openInventoryModal(${JSON.stringify(item).replace(/'/g,"&#39;")})'>
      <div class="result-pn">${item.pn}</div>
      <div class="result-name">${item.name}</div>
      <div class="result-meta">${item.cat} &middot; ${item.ac} &middot; ${item.cond}</div>
      <span class="avail-badge ${item.stock === 'in-stock' ? 'in-stock' : 'on-order'}">${item.stock === 'in-stock' ? '&#10003; In Stock' : '&#9203; On Order'}</span>
    </div>
  `).join('');

  resultsEl.classList.add('visible');
  setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
}

/* ── MODAL ── */
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-quote-btn')?.addEventListener('click', () => {
    closeModal();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(title, bodyHTML) {
  document.getElementById('modal-head-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function openCategoryModal(idx) {
  const c = CATEGORIES[idx];
  if (!c) return;
  openModal(c.name,
    `<div class="modal-pn">${c.ata}</div>
     <div style="font-size:52px;margin-bottom:16px">${c.icon}</div>
     <p>${c.desc}</p>
     <p style="color:var(--white);font-size:13px;margin-bottom:10px;font-weight:600">Part Types Available:</p>
     <div style="display:flex;gap:8px;flex-wrap:wrap">${c.tags.map(t =>
       `<span style="padding:5px 12px;border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--gold-pale);letter-spacing:1px;background:rgba(200,146,42,0.07)">${t}</span>`
     ).join('')}</div>
     <p style="margin-top:20px">Contact our sales team with your part number requirements. We source globally with full OEM traceability.</p>`
  );
}

function openProductModal(idx) {
  const p = SAMPLE_PRODUCTS[idx];
  if (!p) return;
  const rows = Object.entries(p.specs || {}).map(([k,v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');
  openModal(p.name,
    `<div class="modal-pn">${p.pn}</div>
     <div class="modal-product-name">${p.name}</div>
     <p>${p.desc}</p>
     <table class="specs-table">${rows}
       <tr><td>Aircraft</td><td>${p.ac}</td></tr>
       <tr><td>Condition</td><td>${p.cond}</td></tr>
       <tr><td>Availability</td><td>${p.stockLabel}</td></tr>
       <tr><td>Certification</td><td>${p.cert}</td></tr>
       <tr><td>Traceability</td><td>Full OEM Documentation</td></tr>
     </table>`
  );
}

function openInventoryModal(item) {
  openModal(item.name,
    `<div class="modal-pn">${item.pn}</div>
     <div class="modal-product-name">${item.name}</div>
     <table class="specs-table">
       <tr><td>Part Number</td><td>${item.pn}</td></tr>
       <tr><td>Category</td><td>${item.cat}</td></tr>
       <tr><td>Aircraft</td><td>${item.ac}</td></tr>
       <tr><td>Condition</td><td>${item.cond}</td></tr>
       <tr><td>Availability</td><td>${item.stock === 'in-stock' ? '<span style="color:#22d37a">&#10003; In Stock</span>' : '<span style="color:var(--gold)">&#9203; On Order (2-5 days)</span>'}</td></tr>
       <tr><td>Certification</td><td>FAA 8130-3 / EASA Form 1 / COC</td></tr>
       <tr><td>Traceability</td><td>Full OEM Trace Available</td></tr>
     </table>`
  );
}

/* ── NAVBAR ── */
function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const ham     = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  ham?.addEventListener('click', () => {
    const isOpen = ham.classList.toggle('open');
    if (navLinks) {
      if (isOpen) {
        Object.assign(navLinks.style, {
          display: 'flex', flexDirection: 'column', position: 'absolute',
          top: '74px', left: '0', right: '0', zIndex: '999',
          background: 'rgba(7,15,33,0.98)', padding: '24px 5vw 28px',
          borderBottom: '1px solid var(--border-lt)', gap: '18px'
        });
      } else {
        navLinks.removeAttribute('style');
      }
    }
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (ham?.classList.contains('open')) ham.click();
    });
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay) || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

/* ── FORM ── */
function initForm() {
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    if (success) {
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 7000);
    }
    e.target.reset();
  });
}

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
