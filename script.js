'use strict';

/* ═══════════════════════════════════════════════════════════════════════
   [EDIT-3] REFERENCE LISTS — Edit dropdown options here
   ═══════════════════════════════════════════════════════════════════════ */
const USERS = [
  { id: 'MGR01', name: 'Manager 1', role: 'manager' },
  { id: 'EMP01', name: 'ก้องภพ ต้นโสภา', role: 'rep' },
  { id: 'EMP02', name: 'เฉลิมชัย เบญจพัฒนมงคล', role: 'rep' },
  { id: 'EMP03', name: 'เดชา ปัญจวัฒนกุล', role: 'rep' },
  { id: 'EMP04', name: 'กมลทิพย์ จันกร', role: 'rep' },
  { id: 'EMP05', name: 'เจษฎากร สุขสีดา', role: 'rep' },
  { id: 'EMP06', name: 'ชัยภัทร วิริยะเลิศนิรันดร์', role: 'rep' }
];

const SALES_REPS = USERS.filter(u => u.role === 'rep').map(u => u.name);

const CUSTOMERS = [
  'ABC Co., Ltd.',
  'XYZ Manufacturing',
  'Global Foods Group',
  'Gentos',
  'PO Care',
  // 👉 Add more customer names here
];

/* Visit purposes — value stays in English (stored), label translated via translations */
const PURPOSES = ['meeting', 'followup', 'demo', 'delivery', 'complaint', 'other'];

/* ═══════════════════════════════════════════════════════════════════════
   [EDIT-5] SETTINGS
   ═══════════════════════════════════════════════════════════════════════ */
const SETTINGS = {
  deletePassword: '1234',        // 👉 Change delete password here
  maxFutureDays: 30,             // Max days into future a visit can be dated
  currency: '฿',
  defaultLang: 'en',             // 'en' or 'th'
  storageKey: 'sales_visits',    // LocalStorage key for visits (don't change after launch)
  prefsKey: 'sales_visits_prefs',// LocalStorage key for user preferences
  googleSheetUrl: 'https://docs.google.com/spreadsheets/d/12F9W3h63v_tbeIjZhH9-2rNJXbk0ouAHuZ4IltBYyaU/edit?gid=0#gid=0',            // 👉 [NEW] Add your Google Sheets link here (e.g., https://docs.google.com/spreadsheets/d/...)
  googleScriptWebappUrl: 'https://script.google.com/macros/s/AKfycbx1rqMbVD4M2E0T1bwEiKBSJNwDRKBejQJGF4DIO9NNxPX0rUZdsbQjqxndBKtk763D/exec'      // 👉 [NEW] Add your deployed Apps Script Web App URL here
};

/* ═══════════════════════════════════════════════════════════════════════
   [EDIT-4] TRANSLATIONS — All UI text in Thai and English
   ═══════════════════════════════════════════════════════════════════════ */
const translations = {
  en: {
    appTitle: 'Sales Visit Tracker',
    appSubtitle: 'Track costs from the road',
    tabLog: 'Log Visit', tabHistory: 'History',
    sectionWho: 'Who & When', sectionRoute: 'Route',
    sectionCosts: 'Costs (THB)', sectionContext: 'Context',
    sectionFilters: 'Filters',
    fieldDate: 'Date', fieldSalesRep: 'Sales Rep', fieldCustomer: 'Customer',
    fieldOrigin: 'From / Origin', fieldDestination: 'To / Destination',
    fieldDistance: 'Distance (km)',
    fieldToll: 'Toll Fee', fieldFuel: 'Fuel', fieldParking: 'Parking',
    fieldOther: 'Other', fieldOtherDesc: 'Other description',
    fieldPurpose: 'Purpose', fieldNotes: 'Notes',
    phOrigin: 'e.g. Bangkok Office', phDestination: 'e.g. 123 Sukhumvit Rd',
    phOtherDesc: 'What was it for?', phNotes: 'Optional details...',
    phPassword: 'Password', phSearch: 'Search...', phEmpId: 'e.g. EMP01',
    labelTotal: 'Total Cost',
    btnSave: 'Save Visit', btnViewMap: 'View on Google Maps',
    btnExport: '⬇ Export CSV', btnApplyFilters: 'Apply', btnClearFilters: 'Clear',
    btnOpenSheet: '📊 Open Google Sheet', btnSyncSheet: '🔄 Sync Offline Data',
    btnCancel: 'Cancel', btnDelete: 'Delete', btnSignIn: 'Sign In', btnSignOut: 'Sign Out',
    filterFrom: 'From', filterTo: 'To', filterRep: 'Sales Rep', filterCustomer: 'Customer',
    optAll: 'All', optChoose: '— Choose —',
    sumMonth: 'Total this month', sumWeek: 'This week',
    sumVisits: 'Visits this month', sumTop: 'Top customer',
    purpose_meeting: 'Sales meeting', purpose_followup: 'Follow-up',
    purpose_demo: 'Product demo', purpose_delivery: 'Delivery',
    purpose_complaint: 'Complaint resolution', purpose_other: 'Other',
    modalDeleteTitle: 'Confirm Delete',
    modalDeleteText: 'Enter the password to delete this visit. This cannot be undone.',
    errRequired: 'Required', errInvalidDate: 'Invalid date',
    errFutureDate: 'Date too far in future', errNegative: 'Must be ≥ 0',
    errOtherDescNeeded: 'Description required when Other > 0',
    errWrongPassword: 'Wrong password', errInvalidEmpId: 'Invalid Employee ID',
    emptyList: 'No visits yet. Log your first one!',
    detailRoute: 'Route', detailDistance: 'Distance', detailPurpose: 'Purpose',
    detailNotes: 'Notes', detailRep: 'Sales rep',
    savedToast: 'Visit saved',
    savedAndSyncedToast: 'Visit saved & synced to Google Sheets',
    syncSuccessToast: 'Successfully synced offline data!',
    syncFailedToast: 'Failed to sync to Google Sheets',
    badgeSynced: 'Synced', badgeLocal: 'Local Only',
    titleSignIn: 'Sign In', fieldEmpId: 'Employee ID'
  },
  th: {
    appTitle: 'ระบบบันทึกค่าเยี่ยมลูกค้า',
    appSubtitle: 'บันทึกค่าใช้จ่ายระหว่างเดินทาง',
    tabLog: 'บันทึกการเยี่ยม', tabHistory: 'ประวัติ',
    sectionWho: 'ใคร & เมื่อไหร่', sectionRoute: 'เส้นทาง',
    sectionCosts: 'ค่าใช้จ่าย (บาท)', sectionContext: 'รายละเอียด',
    sectionFilters: 'ตัวกรอง',
    fieldDate: 'วันที่', fieldSalesRep: 'พนักงานขาย', fieldCustomer: 'ลูกค้า',
    fieldOrigin: 'จุดเริ่มต้น', fieldDestination: 'จุดหมาย',
    fieldDistance: 'ระยะทาง (กม.)',
    fieldToll: 'ค่าทางด่วน', fieldFuel: 'ค่าน้ำมัน', fieldParking: 'ค่าจอดรถ',
    fieldOther: 'อื่นๆ', fieldOtherDesc: 'รายละเอียดอื่นๆ',
    fieldPurpose: 'วัตถุประสงค์', fieldNotes: 'หมายเหตุ',
    phOrigin: 'เช่น สำนักงานกรุงเทพ', phDestination: 'เช่น 123 ถ.สุขุมวิท',
    phOtherDesc: 'เพื่ออะไร?', phNotes: 'รายละเอียดเพิ่มเติม...',
    phPassword: 'รหัสผ่าน', phSearch: 'ค้นหา...', phEmpId: 'เช่น EMP01',
    labelTotal: 'ค่าใช้จ่ายรวม',
    btnSave: 'บันทึก', btnViewMap: 'ดูใน Google Maps',
    btnExport: '⬇ ส่งออก CSV', btnApplyFilters: 'กรอง', btnClearFilters: 'ล้าง',
    btnOpenSheet: '📊 เปิด Google Sheets', btnSyncSheet: '🔄 ซิงค์ข้อมูลที่ค้าง',
    btnCancel: 'ยกเลิก', btnDelete: 'ลบ', btnSignIn: 'เข้าสู่ระบบ', btnSignOut: 'ออกจากระบบ',
    filterFrom: 'ตั้งแต่', filterTo: 'ถึง', filterRep: 'พนักงานขาย', filterCustomer: 'ลูกค้า',
    optAll: 'ทั้งหมด', optChoose: '— เลือก —',
    sumMonth: 'รวมเดือนนี้', sumWeek: 'สัปดาห์นี้',
    sumVisits: 'จำนวนการเยี่ยมเดือนนี้', sumTop: 'ลูกค้าที่เยี่ยมบ่อยสุด',
    purpose_meeting: 'ประชุมขาย', purpose_followup: 'ติดตามผล',
    purpose_demo: 'สาธิตสินค้า', purpose_delivery: 'ส่งของ',
    purpose_complaint: 'แก้ปัญหา', purpose_other: 'อื่นๆ',
    modalDeleteTitle: 'ยืนยันการลบ',
    modalDeleteText: 'กรอกรหัสผ่านเพื่อลบรายการนี้ ไม่สามารถกู้คืนได้',
    errRequired: 'จำเป็น', errInvalidDate: 'วันที่ไม่ถูกต้อง',
    errFutureDate: 'วันที่ล่วงหน้าเกินไป', errNegative: 'ต้อง ≥ 0',
    errOtherDescNeeded: 'ต้องกรอกรายละเอียดเมื่อ "อื่นๆ" > 0',
    errWrongPassword: 'รหัสผ่านไม่ถูกต้อง', errInvalidEmpId: 'รหัสพนักงานไม่ถูกต้อง',
    emptyList: 'ยังไม่มีรายการ บันทึกการเยี่ยมแรกของคุณเลย!',
    detailRoute: 'เส้นทาง', detailDistance: 'ระยะทาง', detailPurpose: 'วัตถุประสงค์',
    detailNotes: 'หมายเหตุ', detailRep: 'พนักงานขาย',
    savedToast: 'บันทึกแล้ว',
    savedAndSyncedToast: 'บันทึกและส่งข้อมูลไป Google Sheets เรียบร้อย',
    syncSuccessToast: 'ซิงค์ข้อมูลที่ค้างเสร็จเรียบร้อย!',
    syncFailedToast: 'ไม่สามารถซิงค์ข้อมูลไป Google Sheets ได้',
    badgeSynced: 'ซิงค์แล้ว', badgeLocal: 'บันทึกเฉพาะในเครื่อง',
    titleSignIn: 'เข้าสู่ระบบ', fieldEmpId: 'รหัสพนักงาน'
  }
};

/* ═══════════════════════════════════════════════════════════════════════
   APPLICATION STATE
   ═══════════════════════════════════════════════════════════════════════ */
const state = {
  lang: SETTINGS.defaultLang,
  visits: [],
  filters: { from: '', to: '', rep: '', customer: '' },
  pendingDeleteId: null,
  calendarTarget: null,    // which input the calendar is currently bound to
  calendarMonth: new Date(),
  currentUser: null
};

/* ═══════════════════════════════════════════════════════════════════════
   [SWAP-POINT] DATA SERVICE
   ─────────────────────────────────────────────────────────────────────
   ⚠️  THIS IS THE BACKEND INTEGRATION POINT.
   When the backend is ready, the tech team replaces the bodies of these
   methods with fetch() calls. UI code does NOT change.
   All methods are async/Promise-based already — ready to swap.

   Expected API endpoints (when backend is built):
     GET    /api/visits?from=&to=&sales_rep=&customer=  → Visit[]
     GET    /api/visits/:id                              → Visit
     POST   /api/visits                                  → Visit (with id)
     PUT    /api/visits/:id                              → Visit
     DELETE /api/visits/:id                              → 204
   ═══════════════════════════════════════════════════════════════════════ */
const visitService = {

  async getAll(filters = {}) {
    const raw = localStorage.getItem(SETTINGS.storageKey);
    let visits = raw ? JSON.parse(raw) : [];

    // Role-based filtering
    if (state.currentUser && state.currentUser.role === 'rep') {
      visits = visits.filter(v => v.sales_rep === state.currentUser.name);
    }

    if (filters.from) visits = visits.filter(v => v.visit_date >= filters.from);
    if (filters.to) visits = visits.filter(v => v.visit_date <= filters.to);
    if (filters.rep) visits = visits.filter(v => v.sales_rep === filters.rep);
    if (filters.customer) visits = visits.filter(v => v.customer === filters.customer);
    return Promise.resolve(visits);
  },

  async getById(id) {
    const all = await this.getAll();
    return all.find(v => v.id === id) || null;
  },

  async create(visitData) {
    const all = JSON.parse(localStorage.getItem(SETTINGS.storageKey) || '[]');
    const now = new Date().toISOString();
    const newVisit = {
      ...visitData,
      id: generateId(),
      synced: false,
      created_at: now,
      updated_at: now
    };
    all.push(newVisit);
    localStorage.setItem(SETTINGS.storageKey, JSON.stringify(all));
    return Promise.resolve(newVisit);
  },

  async update(id, visitData) {
    const all = JSON.parse(localStorage.getItem(SETTINGS.storageKey) || '[]');
    const idx = all.findIndex(v => v.id === id);
    if (idx === -1) throw new Error('Visit not found');
    all[idx] = { ...all[idx], ...visitData, synced: false, updated_at: new Date().toISOString() };
    localStorage.setItem(SETTINGS.storageKey, JSON.stringify(all));
    return Promise.resolve(all[idx]);
  },

  async delete(id) {
    const all = JSON.parse(localStorage.getItem(SETTINGS.storageKey) || '[]');
    const filtered = all.filter(v => v.id !== id);
    localStorage.setItem(SETTINGS.storageKey, JSON.stringify(filtered));
    return Promise.resolve();
  }
};

/* ═══════════════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════════════ */
function generateId() {
  // RFC4122-ish v4 UUID — backend may reassign on POST
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function t(key) {
  return translations[state.lang][key] || translations.en[key] || key;
}

/** Convert "dd/mm/yyyy" → "yyyy-mm-dd" (ISO). Returns null if invalid. */
function parseDateInput(str) {
  if (!str || str.length !== 10) return null;
  const m = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [_, dd, mm, yyyy] = m;
  const iso = `${yyyy}-${mm}-${dd}`;
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return null;
  // Verify the date round-trips (catches things like 31/02/2024)
  if (d.getDate() !== +dd || d.getMonth() !== +mm - 1) return null;
  return iso;
}

/** Convert "yyyy-mm-dd" → "dd/mm/yyyy" for display */
function formatDateDisplay(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseNumber(str) {
  const n = parseFloat(str);
  return isNaN(n) ? 0 : n;
}

function formatMoney(n) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Auto-format text input as user types: 12345678 → 12/34/5678 */
function attachDateAutoSlash(input) {
  input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    else if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    e.target.value = v;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   I18N — Apply translations to DOM
   ═══════════════════════════════════════════════════════════════════════ */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
    el.setAttribute(attr, t(key));
  });
  // Refresh dynamic content
  populateDropdowns();
  renderVisitList();
  renderSummary();
}

/* ═══════════════════════════════════════════════════════════════════════
   SEARCHABLE DROPDOWN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
function makeSelectSearchable(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  if (select.parentElement.classList.contains('custom-select-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select-wrapper';

  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  select.style.display = 'none';

  const trigger = document.createElement('div');
  trigger.className = 'custom-select-trigger';
  trigger.tabIndex = 0;

  const triggerText = document.createElement('span');
  triggerText.className = 'custom-select-trigger-text';
  trigger.appendChild(triggerText);
  wrapper.appendChild(trigger);

  const dropdown = document.createElement('div');
  dropdown.className = 'custom-select-dropdown';

  const searchContainer = document.createElement('div');
  searchContainer.className = 'custom-select-search';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = t('phSearch') || 'Search...';
  searchContainer.appendChild(searchInput);
  dropdown.appendChild(searchContainer);

  const optionsContainer = document.createElement('ul');
  optionsContainer.className = 'custom-select-options';
  dropdown.appendChild(optionsContainer);

  wrapper.appendChild(dropdown);

  function sync() {
    optionsContainer.innerHTML = '';
    const options = Array.from(select.options);

    const selectedOpt = options.find(o => o.selected) || options[0];
    triggerText.textContent = selectedOpt ? selectedOpt.text : '';

    options.forEach((opt) => {
      const li = document.createElement('li');
      li.className = 'custom-select-option';
      if (opt.selected) li.classList.add('selected');
      li.textContent = opt.text;
      li.dataset.value = opt.value;

      li.addEventListener('click', (e) => {
        e.stopPropagation();
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        sync();
        closeDropdown();
      });
      optionsContainer.appendChild(li);
    });
    searchInput.placeholder = t('phSearch') || 'Search...';
  }

  function openDropdown() {
    document.querySelectorAll('.custom-select-dropdown.open').forEach(el => {
      if (el !== dropdown) el.classList.remove('open');
    });
    dropdown.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    filterOptions('');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
  }

  function filterOptions(query) {
    const q = query.toLowerCase();
    Array.from(optionsContainer.children).forEach(li => {
      const text = li.textContent.toLowerCase();
      if (text.includes(q)) {
        li.classList.remove('hidden');
      } else {
        li.classList.add('hidden');
      }
    });
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) closeDropdown();
    else openDropdown();
  });

  searchInput.addEventListener('input', (e) => filterOptions(e.target.value));
  searchInput.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) closeDropdown();
  });

  select.addEventListener('change', sync);
  select._syncCustomSelect = sync;

  sync();
}

function updateAllSearchableSelects() {
  document.querySelectorAll('select').forEach(select => {
    if (select._syncCustomSelect) select._syncCustomSelect();
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   DROPDOWN POPULATION
   ═══════════════════════════════════════════════════════════════════════ */
function populateDropdowns() {
  // Sales rep dropdown (form)
  fillSelect('fieldSalesRep', SALES_REPS, false);
  fillSelect('fieldCustomer', CUSTOMERS, false);
  fillSelectWithPurposes('fieldPurpose');

  // Filter dropdowns — include "All" option
  fillSelect('filterRep', SALES_REPS, true);
  fillSelect('filterCustomer', CUSTOMERS, true);

  if (typeof updateAllSearchableSelects === 'function') {
    updateAllSearchableSelects();
  }
}

function fillSelect(id, options, includeAll) {
  const sel = document.getElementById(id);
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '';
  if (includeAll) {
    sel.innerHTML += `<option value="">${t('optAll')}</option>`;
  } else {
    sel.innerHTML += `<option value="">${t('optChoose')}</option>`;
  }
  options.forEach(opt => {
    sel.innerHTML += `<option value="${opt}">${opt}</option>`;
  });
  if (current) sel.value = current;
}

function fillSelectWithPurposes(id) {
  const sel = document.getElementById(id);
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = `<option value="">${t('optChoose')}</option>`;
  PURPOSES.forEach(p => {
    sel.innerHTML += `<option value="${p}">${t('purpose_' + p)}</option>`;
  });
  if (current) sel.value = current;
}

/* ═══════════════════════════════════════════════════════════════════════
   FORM HANDLING — read, validate, save
   ═══════════════════════════════════════════════════════════════════════ */
function readForm() {
  const dateInput = document.getElementById('fieldDate').value;
  return {
    visit_date: parseDateInput(dateInput),
    visit_date_raw: dateInput,
    sales_rep: document.getElementById('fieldSalesRep').value,
    customer: document.getElementById('fieldCustomer').value,
    origin: document.getElementById('fieldOrigin').value.trim(),
    destination: document.getElementById('fieldDestination').value.trim(),
    distance_km: parseNumber(document.getElementById('fieldDistance').value),
    distance_raw: document.getElementById('fieldDistance').value,
    costs: {
      toll: parseNumber(document.getElementById('fieldToll').value),
      fuel: parseNumber(document.getElementById('fieldFuel').value),
      parking: parseNumber(document.getElementById('fieldParking').value),
      other: parseNumber(document.getElementById('fieldOther').value),
      other_description: document.getElementById('fieldOtherDesc').value.trim()
    },
    purpose: document.getElementById('fieldPurpose').value,
    notes: document.getElementById('fieldNotes').value.trim()
  };
}

function clearInvalidStates() {
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
}

function markInvalid(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (el.parentElement && el.parentElement.classList.contains('custom-select-wrapper')) {
    const trigger = el.parentElement.querySelector('.custom-select-trigger');
    if (trigger) trigger.classList.add('invalid');
  } else {
    el.classList.add('invalid');
  }

  const errEl = document.createElement('div');
  errEl.className = 'error-msg';
  errEl.textContent = message;
  el.parentElement.appendChild(errEl);
}

function validateForm(data) {
  clearInvalidStates();
  let ok = true;

  // Required text/select fields
  if (!data.visit_date) { markInvalid('fieldDate', t('errInvalidDate')); ok = false; }
  if (!data.sales_rep) { markInvalid('fieldSalesRep', t('errRequired')); ok = false; }
  if (!data.customer) { markInvalid('fieldCustomer', t('errRequired')); ok = false; }
  if (!data.origin) { markInvalid('fieldOrigin', t('errRequired')); ok = false; }
  if (!data.destination) { markInvalid('fieldDestination', t('errRequired')); ok = false; }
  if (!data.purpose) { markInvalid('fieldPurpose', t('errRequired')); ok = false; }

  // Future date check
  if (data.visit_date) {
    const max = new Date();
    max.setDate(max.getDate() + SETTINGS.maxFutureDays);
    if (new Date(data.visit_date) > max) {
      markInvalid('fieldDate', t('errFutureDate'));
      ok = false;
    }
  }

  // Numeric validations
  if (data.distance_raw === '' || data.distance_km < 0) {
    markInvalid('fieldDistance', data.distance_km < 0 ? t('errNegative') : t('errRequired'));
    ok = false;
  }
  ['Toll', 'Fuel', 'Parking', 'Other'].forEach(name => {
    const id = 'field' + name;
    const val = parseNumber(document.getElementById(id).value);
    if (val < 0) { markInvalid(id, t('errNegative')); ok = false; }
  });
  // Toll is required
  if (document.getElementById('fieldToll').value === '') {
    markInvalid('fieldToll', t('errRequired'));
    ok = false;
  }

  // "Other description" required if "Other > 0"
  if (data.costs.other > 0 && !data.costs.other_description) {
    markInvalid('fieldOtherDesc', t('errOtherDescNeeded'));
    ok = false;
  }

  return ok;
}

function calculateTotal(costs) {
  return (costs.toll || 0) + (costs.fuel || 0) + (costs.parking || 0) + (costs.other || 0);
}

function updateTotalDisplay() {
  const total = ['fieldToll', 'fieldFuel', 'fieldParking', 'fieldOther']
    .map(id => parseNumber(document.getElementById(id).value))
    .reduce((a, b) => a + b, 0);
  document.getElementById('totalDisplay').textContent = formatMoney(total);
}

async function handleSubmit(e) {
  e.preventDefault();
  const data = readForm();
  if (!validateForm(data)) return;

  const record = {
    visit_date: data.visit_date,
    sales_rep: state.currentUser && state.currentUser.role === 'rep' ? state.currentUser.name : data.sales_rep,
    customer: data.customer,
    origin: data.origin,
    destination: data.destination,
    distance_km: data.distance_km,
    costs: data.costs,
    total_cost: calculateTotal(data.costs),
    purpose: data.purpose,
    notes: data.notes
  };

  await visitService.create(record);
  await refreshState();
  resetForm();

  // Remember sales rep for next time
  savePref('lastRep', data.sales_rep);

  // Switch to history view to show the new entry
  showToast(t('savedToast'));

  // Background Google Sheets sync attempt
  if (SETTINGS.googleScriptWebappUrl) {
    syncVisitsToGoogleSheets().then(res => {
      if (res && res.successCount > 0) {
        showToast(t('savedAndSyncedToast'));
      }
    }).catch(err => console.error('Auto sync error:', err));
  }
}

function resetForm() {
  document.getElementById('visitForm').reset();
  clearInvalidStates();
  // Pre-fill date with today and last-used sales rep
  document.getElementById('fieldDate').value = formatDateDisplay(todayIso());

  if (state.currentUser && state.currentUser.role === 'rep') {
    document.getElementById('fieldSalesRep').value = state.currentUser.name;
  } else {
    const lastRep = loadPref('lastRep');
    if (lastRep && SALES_REPS.includes(lastRep)) {
      document.getElementById('fieldSalesRep').value = lastRep;
    }
  }
  updateTotalDisplay();

  if (typeof updateAllSearchableSelects === 'function') {
    updateAllSearchableSelects();
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   RENDER — Summary panel
   ═══════════════════════════════════════════════════════════════════════ */
function renderSummary() {
  const now = new Date();
  const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const startOfWeek = (() => {
    const d = new Date(); d.setDate(d.getDate() - d.getDay());
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const thisMonth = state.visits.filter(v => v.visit_date >= startOfMonth);
  const thisWeek = state.visits.filter(v => v.visit_date >= startOfWeek);

  const monthTotal = thisMonth.reduce((sum, v) => sum + (v.total_cost || 0), 0);
  const weekTotal = thisWeek.reduce((sum, v) => sum + (v.total_cost || 0), 0);
  const visitCount = thisMonth.length;

  // Top customer this month (most visits)
  const customerCounts = {};
  thisMonth.forEach(v => { customerCounts[v.customer] = (customerCounts[v.customer] || 0) + 1; });
  const topCustomer = Object.entries(customerCounts).sort((a, b) => b[1] - a[1])[0];

  const html = `
    <div class="summary-item">
      <div class="label">${t('sumMonth')}</div>
      <div class="value accent">฿${formatMoney(monthTotal)}</div>
    </div>
    <div class="summary-item">
      <div class="label">${t('sumWeek')}</div>
      <div class="value">฿${formatMoney(weekTotal)}</div>
    </div>
    <div class="summary-item">
      <div class="label">${t('sumVisits')}</div>
      <div class="value">${visitCount}</div>
    </div>
    <div class="summary-item">
      <div class="label">${t('sumTop')}</div>
      <div class="value small">${topCustomer ? topCustomer[0] : '—'}</div>
    </div>
  `;
  document.getElementById('summary').innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════════════
   RENDER — Visit list (accordion cards)
   ═══════════════════════════════════════════════════════════════════════ */
function renderVisitList() {
  const list = document.getElementById('visitList');
  if (!list) return;
  const filtered = state.visits
    .filter(v => !state.filters.from || v.visit_date >= state.filters.from)
    .filter(v => !state.filters.to || v.visit_date <= state.filters.to)
    .filter(v => !state.filters.rep || v.sales_rep === state.filters.rep)
    .filter(v => !state.filters.customer || v.customer === state.filters.customer)
    .sort((a, b) => b.visit_date.localeCompare(a.visit_date));

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="emoji">🚗</span>${t('emptyList')}</div>`;
    return;
  }

  list.innerHTML = filtered.map(v => renderVisitCard(v)).join('');
}

function renderVisitCard(v) {
  const c = v.costs || {};
  const isWebappConfigured = !!SETTINGS.googleScriptWebappUrl;
  const syncBadge = isWebappConfigured
    ? (v.synced
      ? `<span class="sync-badge synced"><span class="badge-icon">✓</span> <span class="badge-text" data-i18n="badgeSynced">${t('badgeSynced')}</span></span>`
      : `<span class="sync-badge local"><span class="badge-icon">☁</span> <span class="badge-text" data-i18n="badgeLocal">${t('badgeLocal')}</span></span>`)
    : '';

  return `
    <div class="visit-card" data-id="${v.id}">
      <div class="visit-header" onclick="toggleCard('${v.id}')">
        <div class="visit-date">${formatDateDisplay(v.visit_date)}</div>
        <div class="visit-customer">${escapeHtml(v.customer)} ${syncBadge}</div>
        <div class="visit-amount">฿${formatMoney(v.total_cost)}</div>
      </div>
      <div class="visit-details">
        <div class="visit-details-inner">
          <div class="detail-row">
            <span class="label">${t('detailRep')}</span>
            <span class="value">${escapeHtml(v.sales_rep)}</span>
          </div>
          <div class="detail-row">
            <span class="label">${t('detailRoute')}</span>
            <span class="value">${escapeHtml(v.origin)} → ${escapeHtml(v.destination)}</span>
          </div>
          <div class="detail-row">
            <span class="label">${t('detailDistance')}</span>
            <span class="value mono">${v.distance_km} km</span>
          </div>
          <div class="detail-row">
            <span class="label">${t('detailPurpose')}</span>
            <span class="value">${t('purpose_' + v.purpose)}</span>
          </div>
          ${v.notes ? `
            <div class="detail-row">
              <span class="label">${t('detailNotes')}</span>
              <span class="value">${escapeHtml(v.notes)}</span>
            </div>` : ''}

          <div class="cost-breakdown">
            <div class="row"><span>${t('fieldToll')}</span><span>฿${formatMoney(c.toll || 0)}</span></div>
            ${c.fuel ? `<div class="row"><span>${t('fieldFuel')}</span><span>฿${formatMoney(c.fuel)}</span></div>` : ''}
            ${c.parking ? `<div class="row"><span>${t('fieldParking')}</span><span>฿${formatMoney(c.parking)}</span></div>` : ''}
            ${c.other ? `<div class="row"><span>${t('fieldOther')}${c.other_description ? ` (${escapeHtml(c.other_description)})` : ''}</span><span>฿${formatMoney(c.other)}</span></div>` : ''}
            <div class="row total"><span>${t('labelTotal')}</span><span>฿${formatMoney(v.total_cost)}</span></div>
          </div>

          <button class="btn-danger" onclick="requestDelete('${v.id}')" style="margin-top: 8px;">
            🗑 ${t('btnDelete')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

window.toggleCard = function (id) {
  const card = document.querySelector(`.visit-card[data-id="${id}"]`);
  if (card) card.classList.toggle('open');
};

/* ═══════════════════════════════════════════════════════════════════════
   DELETE FLOW — password-protected
   ═══════════════════════════════════════════════════════════════════════ */
window.requestDelete = function (id) {
  state.pendingDeleteId = id;
  document.getElementById('deletePassword').value = '';
  document.getElementById('deleteModal').classList.add('open');
  setTimeout(() => document.getElementById('deletePassword').focus(), 100);
};

async function confirmDelete() {
  const pw = document.getElementById('deletePassword').value;
  if (pw !== SETTINGS.deletePassword) {
    const input = document.getElementById('deletePassword');
    input.classList.add('invalid');
    if (!document.querySelector('#deleteModal .error-msg')) {
      const err = document.createElement('div');
      err.className = 'error-msg';
      err.textContent = t('errWrongPassword');
      input.parentElement.appendChild(err);
    }
    return;
  }
  await visitService.delete(state.pendingDeleteId);
  state.pendingDeleteId = null;
  document.getElementById('deleteModal').classList.remove('open');
  await refreshState();
}

function cancelDelete() {
  state.pendingDeleteId = null;
  document.getElementById('deleteModal').classList.remove('open');
  const input = document.getElementById('deletePassword');
  input.classList.remove('invalid');
  const err = document.querySelector('#deleteModal .error-msg');
  if (err) err.remove();
}

/* ═══════════════════════════════════════════════════════════════════════
   GOOGLE MAPS LINK — open directions in new tab
   ═══════════════════════════════════════════════════════════════════════ */
function openGoogleMaps() {
  const origin = document.getElementById('fieldOrigin').value.trim();
  const destination = document.getElementById('fieldDestination').value.trim();
  if (!origin || !destination) {
    alert(state.lang === 'th'
      ? 'กรุณากรอกจุดเริ่มต้นและจุดหมายก่อน'
      : 'Please enter both origin and destination first');
    return;
  }
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
  window.open(url, '_blank');
}

/* ═══════════════════════════════════════════════════════════════════════
   CUSTOM DATE PICKER (calendar popup)
   ═══════════════════════════════════════════════════════════════════════ */
function openCalendar(inputId) {
  state.calendarTarget = inputId;
  const input = document.getElementById(inputId);
  const calendarEl = document.getElementById('calendar');
  if (input && input.parentElement) {
    input.parentElement.appendChild(calendarEl);
  }

  // Reset position
  calendarEl.style.left = '0';
  calendarEl.style.right = 'auto';

  const iso = parseDateInput(input.value) || todayIso();
  state.calendarMonth = new Date(iso + 'T00:00:00');
  renderCalendar();
  calendarEl.classList.add('open');

  // If calendar goes off-screen to the right, align it to the right edge of the input
  const rect = calendarEl.getBoundingClientRect();
  if (rect.right > window.innerWidth - 10) {
    calendarEl.style.left = 'auto';
    calendarEl.style.right = '0';
  }
}

function closeCalendar() {
  document.getElementById('calendar').classList.remove('open');
  state.calendarTarget = null;
}

function renderCalendar() {
  const cal = document.getElementById('calendar');
  const monthDate = state.calendarMonth;
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const monthName = monthDate.toLocaleString(state.lang === 'th' ? 'th-TH' : 'en-US', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = todayIso();

  const targetInput = state.calendarTarget ? document.getElementById(state.calendarTarget) : null;
  const selectedIso = targetInput ? parseDateInput(targetInput.value) : null;

  const days = state.lang === 'th'
    ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let html = `
    <div class="cal-header">
      <button type="button" class="cal-nav" data-cal-nav="-1">‹</button>
      <div class="cal-title">${monthName}</div>
      <button type="button" class="cal-nav" data-cal-nav="1">›</button>
    </div>
    <div class="cal-grid">
      ${days.map(d => `<div class="day-name">${d}</div>`).join('')}
  `;

  // Blank leading cells
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day other-month"></div>`;

  for (let d = 1; d <= lastDate; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = iso === today;
    const isSelected = iso === selectedIso;
    html += `<div class="cal-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}" data-iso="${iso}">${d}</div>`;
  }

  html += '</div>';
  cal.innerHTML = html;

  // Wire up nav buttons
  cal.querySelectorAll('[data-cal-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const delta = parseInt(btn.getAttribute('data-cal-nav'));
      state.calendarMonth.setMonth(state.calendarMonth.getMonth() + delta);
      renderCalendar();
    });
  });

  // Wire up day clicks
  cal.querySelectorAll('.cal-day[data-iso]').forEach(day => {
    day.addEventListener('click', (e) => {
      e.stopPropagation();
      const iso = day.getAttribute('data-iso');
      if (state.calendarTarget) {
        document.getElementById(state.calendarTarget).value = formatDateDisplay(iso);
        closeCalendar();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   CSV EXPORT
   ═══════════════════════════════════════════════════════════════════════ */
function exportCsv() {
  const filtered = state.visits
    .filter(v => !state.filters.from || v.visit_date >= state.filters.from)
    .filter(v => !state.filters.to || v.visit_date <= state.filters.to)
    .filter(v => !state.filters.rep || v.sales_rep === state.filters.rep)
    .filter(v => !state.filters.customer || v.customer === state.filters.customer);

  const headers = [
    'id', 'visit_date', 'sales_rep', 'customer',
    'origin', 'destination', 'distance_km',
    'toll', 'fuel', 'parking', 'other', 'other_description',
    'total_cost', 'purpose', 'notes', 'created_at'
  ];

  const rows = filtered.map(v => [
    v.id, v.visit_date, v.sales_rep, v.customer,
    v.origin, v.destination, v.distance_km,
    v.costs?.toll || 0, v.costs?.fuel || 0, v.costs?.parking || 0,
    v.costs?.other || 0, v.costs?.other_description || '',
    v.total_cost, v.purpose, v.notes, v.created_at
  ]);

  // Escape: wrap in quotes if value contains comma/quote/newline; double quotes inside
  const escapeCsv = (val) => {
    const s = String(val ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const csv = [headers, ...rows].map(row => row.map(escapeCsv).join(',')).join('\n');
  // BOM for Excel UTF-8 (especially Thai characters)
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sales-visits-${todayIso()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════════════════════
   USER PREFS (LocalStorage)
   ═══════════════════════════════════════════════════════════════════════ */
function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS.prefsKey)) || {};
  } catch { return {}; }
}
function savePref(key, value) {
  const prefs = loadPrefs();
  prefs[key] = value;
  localStorage.setItem(SETTINGS.prefsKey, JSON.stringify(prefs));
}
function loadPref(key) {
  return loadPrefs()[key];
}

/* ═══════════════════════════════════════════════════════════════════════
   TOAST (transient notification)
   ═══════════════════════════════════════════════════════════════════════ */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      background: 'var(--color-primary)', color: 'white', padding: '12px 20px',
      borderRadius: '8px', boxShadow: 'var(--shadow-lg)', zIndex: '200',
      fontSize: '0.9rem', fontWeight: '500', opacity: '0',
      transition: 'opacity 200ms'
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

/* ═══════════════════════════════════════════════════════════════════════
   AUTH FLOW
   ═══════════════════════════════════════════════════════════════════════ */
function handleLogin(e) {
  if (e) e.preventDefault();
  const empId = document.getElementById('fieldEmpId').value.trim();
  const user = USERS.find(u => u.id === empId);

  const el = document.getElementById('fieldEmpId');
  if (!user) {
    el.classList.add('invalid');
    if (!el.parentElement.querySelector('.error-msg')) {
      const err = document.createElement('div');
      err.className = 'error-msg';
      err.textContent = t('errInvalidEmpId');
      el.parentElement.appendChild(err);
    }
    return;
  }

  // Success
  el.classList.remove('invalid');
  const err = el.parentElement.querySelector('.error-msg');
  if (err) err.remove();

  state.currentUser = user;
  savePref('currentUser', user);

  applyRoleRestrictions();

  document.getElementById('loginView').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'block';

  refreshState();
}

function handleLogout() {
  state.currentUser = null;
  savePref('currentUser', null);

  document.getElementById('fieldEmpId').value = '';
  document.getElementById('loginView').style.display = 'block';
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'none';
}

function applyRoleRestrictions() {
  const isRep = state.currentUser && state.currentUser.role === 'rep';

  const repDropdowns = ['fieldSalesRep', 'filterRep'];
  repDropdowns.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    if (isRep) {
      select.value = state.currentUser.name;
      select.disabled = true;
      if (select.parentElement && select.parentElement.classList.contains('custom-select-wrapper')) {
        const trigger = select.parentElement.querySelector('.custom-select-trigger');
        if (trigger) trigger.style.pointerEvents = 'none';
        if (trigger) trigger.style.opacity = '0.6';
      }
    } else {
      select.disabled = false;
      if (select.parentElement && select.parentElement.classList.contains('custom-select-wrapper')) {
        const trigger = select.parentElement.querySelector('.custom-select-trigger');
        if (trigger) trigger.style.pointerEvents = 'auto';
        if (trigger) trigger.style.opacity = '1';
      }
    }
  });

  if (typeof updateAllSearchableSelects === 'function') {
    updateAllSearchableSelects();
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   REFRESH STATE — reload visits + re-render
   ═══════════════════════════════════════════════════════════════════════ */
async function refreshState() {
  state.visits = await visitService.getAll();
  renderSummary();
  renderVisitList();
  updateSyncButtonVisibility();
}

/* ═══════════════════════════════════════════════════════════════════════
   GOOGLE SHEETS SYNC SYSTEM
   ═══════════════════════════════════════════════════════════════════════ */
async function syncVisitsToGoogleSheets() {
  if (!SETTINGS.googleScriptWebappUrl) return;

  const raw = localStorage.getItem(SETTINGS.storageKey);
  if (!raw) return;
  const all = JSON.parse(raw);
  const unsynced = all.filter(v => !v.synced);
  if (unsynced.length === 0) return;

  let successCount = 0;
  let failCount = 0;

  for (const visit of unsynced) {
    try {
      await fetch(SETTINGS.googleScriptWebappUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(visit)
      });
      
      // With no-cors, the request completes successfully if network is available.
      // We flag it as synced.
      visit.synced = true;
      successCount++;
    } catch (err) {
      console.error('[Google Sheets Sync Error] ID:', visit.id, err);
      failCount++;
    }
  }

  if (successCount > 0) {
    localStorage.setItem(SETTINGS.storageKey, JSON.stringify(all));
    await refreshState();
  }

  return { successCount, failCount };
}

function updateSyncButtonVisibility() {
  const syncBtn = document.getElementById('syncSheetBtn');
  if (!syncBtn) return;

  if (!SETTINGS.googleScriptWebappUrl) {
    syncBtn.style.display = 'none';
    return;
  }

  const raw = localStorage.getItem(SETTINGS.storageKey);
  const visits = raw ? JSON.parse(raw) : [];

  // Filter unsynced based on current view/role constraints (stored in state.visits)
  const unsyncedCount = state.visits.filter(v => !v.synced).length;

  if (unsyncedCount > 0) {
    syncBtn.style.display = 'inline-block';
    syncBtn.textContent = `${t('btnSyncSheet')} (${unsyncedCount})`;
  } else {
    syncBtn.style.display = 'none';
  }
}

async function triggerManualSync() {
  const syncBtn = document.getElementById('syncSheetBtn');
  if (!syncBtn) return;

  syncBtn.disabled = true;
  const originalText = syncBtn.textContent;
  syncBtn.textContent = state.lang === 'th' ? 'กำลังซิงค์...' : 'Syncing...';

  try {
    const res = await syncVisitsToGoogleSheets();
    if (res && res.successCount > 0) {
      showToast(t('syncSuccessToast'));
    } else if (res && res.failCount > 0) {
      showToast(t('syncFailedToast'));
    }
  } catch (err) {
    showToast(t('syncFailedToast'));
  } finally {
    syncBtn.textContent = originalText;
    syncBtn.disabled = false;
    updateSyncButtonVisibility();
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   [SEED-DATA] SAMPLE DATA — Delete this function call in init() when going live
   ═══════════════════════════════════════════════════════════════════════ */
function seedIfEmpty() {
  const existing = localStorage.getItem(SETTINGS.storageKey);
  if (existing && JSON.parse(existing).length > 0) return;

  const today = new Date();
  const ago = (days) => {
    const d = new Date(today); d.setDate(d.getDate() - days);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const samples = [
    {
      id: generateId(), visit_date: ago(1),
      sales_rep: 'ก้องภพ ต้นโสภา', customer: 'ABC Co., Ltd.',
      origin: 'Bangkok Office', destination: 'Rama 9, Bangkok',
      distance_km: 18, costs: { toll: 80, fuel: 150, parking: 40, other: 0, other_description: '' },
      total_cost: 270, purpose: 'meeting', notes: 'Sample data for EMP01',
      synced: true,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
      id: generateId(), visit_date: ago(3),
      sales_rep: 'ก้องภพ ต้นโสภา', customer: 'XYZ Manufacturing',
      origin: 'Bangkok Office', destination: 'Bang Na Industrial Estate',
      distance_km: 32, costs: { toll: 120, fuel: 280, parking: 0, other: 60, other_description: 'Coffee with client' },
      total_cost: 460, purpose: 'demo', notes: 'Sample data for EMP01',
      synced: true,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
      id: generateId(), visit_date: ago(7),
      sales_rep: 'เฉลิมชัย เบญจพัฒนมงคล', customer: 'Global Foods Group',
      origin: 'Bangkok Office', destination: 'Ayutthaya',
      distance_km: 84, costs: { toll: 220, fuel: 580, parking: 30, other: 0, other_description: '' },
      total_cost: 830, purpose: 'followup', notes: 'Sample data for EMP02',
      synced: true,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    }
  ];
  localStorage.setItem(SETTINGS.storageKey, JSON.stringify(samples));
}

/* ═══════════════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════ */
async function init() {
  // 1. Restore language preference
  const savedLang = loadPref('lang');
  if (savedLang) state.lang = savedLang;

  // 2. [SEED-DATA] Delete this line when going live
  seedIfEmpty();

  // 3. Populate dropdowns and apply translations
  applyI18n();

  // 3.5 Make dropdowns searchable
  ['fieldSalesRep', 'fieldCustomer', 'fieldPurpose', 'filterRep', 'filterCustomer'].forEach(makeSelectSearchable);

  // 4. Default date = today
  document.getElementById('fieldDate').value = formatDateDisplay(todayIso());

  // 5. Wire up date auto-slash for all date inputs
  attachDateAutoSlash(document.getElementById('fieldDate'));
  attachDateAutoSlash(document.getElementById('filterFrom'));
  attachDateAutoSlash(document.getElementById('filterTo'));

  // 6. Calendar open on focus / click
  ['fieldDate', 'filterFrom', 'filterTo'].forEach(id => {
    document.getElementById(id).addEventListener('focus', () => openCalendar(id));
    document.getElementById(id).addEventListener('click', (e) => { e.stopPropagation(); openCalendar(id); });
  });

  // 7. Close calendar on outside click
  document.addEventListener('click', (e) => {
    const cal = document.getElementById('calendar');
    if (cal.classList.contains('open') &&
      !cal.contains(e.target) &&
      e.target.id !== state.calendarTarget) {
      closeCalendar();
    }
  });

  // 8. Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.view).classList.add('active');
    });
  });

  // 9. Form submit + total recalc on cost field changes
  document.getElementById('visitForm').addEventListener('submit', handleSubmit);
  document.querySelectorAll('.cost-input').forEach(input => {
    input.addEventListener('input', updateTotalDisplay);
  });

  // 10. Language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'th' : 'en';
    savePref('lang', state.lang);
    applyI18n();
  });

  // 11. Map button
  document.getElementById('mapButton').addEventListener('click', openGoogleMaps);

  // 12. Filter apply / clear
  document.getElementById('applyFilters').addEventListener('click', () => {
    state.filters.from = parseDateInput(document.getElementById('filterFrom').value) || '';
    state.filters.to = parseDateInput(document.getElementById('filterTo').value) || '';
    state.filters.rep = document.getElementById('filterRep').value;
    state.filters.customer = document.getElementById('filterCustomer').value;
    renderVisitList();
  });
  document.getElementById('clearFilters').addEventListener('click', () => {
    state.filters = { from: '', to: '', rep: '', customer: '' };
    document.getElementById('filterFrom').value = '';
    document.getElementById('filterTo').value = '';
    document.getElementById('filterRep').value = '';
    document.getElementById('filterCustomer').value = '';
    if (typeof updateAllSearchableSelects === 'function') updateAllSearchableSelects();
    renderVisitList();
  });

  // 13. CSV export & Google Sheets
  document.getElementById('exportBtn').addEventListener('click', exportCsv);

  const openSheetBtn = document.getElementById('openSheetBtn');
  if (openSheetBtn) {
    if (SETTINGS.googleSheetUrl) {
      openSheetBtn.style.display = 'inline-block';
      openSheetBtn.addEventListener('click', () => {
        window.open(SETTINGS.googleSheetUrl, '_blank');
      });
    } else {
      openSheetBtn.style.display = 'none';
    }
  }

  const syncSheetBtn = document.getElementById('syncSheetBtn');
  if (syncSheetBtn) {
    syncSheetBtn.addEventListener('click', triggerManualSync);
  }

  // 14. Delete modal
  document.getElementById('confirmDelete').addEventListener('click', confirmDelete);
  document.getElementById('cancelDelete').addEventListener('click', cancelDelete);

  // 15. Pre-fill last-used sales rep
  const lastRep = loadPref('lastRep');
  if (lastRep && SALES_REPS.includes(lastRep)) {
    document.getElementById('fieldSalesRep').value = lastRep;
  }

  // 16. Auth setup
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);

  const savedUser = loadPref('currentUser');
  if (savedUser) {
    state.currentUser = savedUser;
    applyRoleRestrictions();
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    await refreshState();
  } else {
    document.getElementById('loginView').style.display = 'block';
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', init);
