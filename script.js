'use strict';

/* ═══════════════════════════════════════════════════════════════════════
   [EDIT-3] REFERENCE LISTS — Edit dropdown options here
   ═══════════════════════════════════════════════════════════════════════ */
const USERS = [
  { id: 'MNG01', name: 'พี่เมย์', role: 'manager' },
  { id: 'EMP01', name: 'ก้องภพ ต้นโสภา', role: 'rep' },
  { id: 'EMP02', name: 'เฉลิมชัย เบญจพัฒนมงคล', role: 'rep' },
  { id: 'EMP03', name: 'เดชา ปัญจวัฒนกุล', role: 'rep' },
  { id: 'EMP04', name: 'กมลทิพย์ จันกร', role: 'rep' },
  { id: 'EMP05', name: 'เจษฎากร สุขสีดา', role: 'rep' },
  { id: 'EMP06', name: 'ชัยภัทร วิริยะเลิศนิรันดร์', role: 'rep' }
];

const SALES_REPS = USERS.filter(u => u.role === 'rep').map(u => u.name);

const STATIC_CUSTOMERS = [
  'Colgate',
  'เต่าแก่น้อย',
  'GPO',
  'Hafele',
  'S&J',
];

let CUSTOMERS = [...STATIC_CUSTOMERS];

function loadCustomCustomers(visits = []) {
  try {
    const raw = localStorage.getItem('custom_customers');

    if (raw === null) {
      // Very first time or cleared storage — migrate from past visits to initialize
      let custom = [];
      visits.forEach(v => {
        if (v.customer && v.customer !== 'Refuel' && !STATIC_CUSTOMERS.includes(v.customer) && !custom.includes(v.customer)) {
          custom.push(v.customer);
        }
      });
      localStorage.setItem('custom_customers', JSON.stringify(custom));
      CUSTOMERS = [...STATIC_CUSTOMERS, ...custom];
    } else {
      // Already initialized, load from localStorage directly
      let custom = JSON.parse(raw);
      CUSTOMERS = [...STATIC_CUSTOMERS, ...custom];
    }
  } catch (e) {
    console.error('Failed to load custom customers', e);
  }
}

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
  ratePerKm: 0.0                 // 👉 Fuel cost allowance per km (e.g., 4.0). Set to 0 to disable.
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
    titleSignIn: 'Sign In', fieldEmpId: 'Employee ID',
    btnEdit: 'Edit', btnUpdate: 'Update Visit', btnCancelEdit: 'Cancel',
    updatedToast: 'Visit updated',
    labelAllocated: 'Allocated',
    typeVisit: 'Visit Client',
    typeRefuel: 'Refuel Log',
    typeMeals: 'Meals / Entertainment',
    fieldMeals: 'Meals / Entertainment',
    savedToast_visit: 'Visit saved',
    savedToast_refuel: 'Refueling log saved',
    savedToast_meals: 'Meals/entertainment saved',
    updatedToast_visit: 'Visit updated',
    updatedToast_refuel: 'Refueling log updated',
    updatedToast_meals: 'Meals/entertainment updated'
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
    fieldOther: 'อื่นๆ', fieldOtherDesc: 'ค่าใช่จ่ายอื่นๆ',
    fieldPurpose: 'วัตถุประสงค์', fieldNotes: 'หมายเหตุ',
    phOrigin: 'เช่น สำนักงานกรุงเทพ', phDestination: 'เช่น 123 ถ.สุขุมวิท',
    phOtherDesc: 'ค่าใช่จ่ายอื่นๆ', phNotes: 'ค่าใช่จ่ายอื่นๆ...',
    phPassword: 'รหัสผ่าน', phSearch: 'ค้นหา...', phEmpId: 'เช่น EMP01',
    labelTotal: 'ค่าใช้จ่ายรวม',
    btnSave: 'บันทึก', btnViewMap: 'ดูใน Google Maps',
    btnExport: '⬇ ส่งออก CSV', btnApplyFilters: 'กรอง', btnClearFilters: 'ล้าง',
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
    titleSignIn: 'เข้าสู่ระบบ', fieldEmpId: 'รหัสพนักงาน',
    btnEdit: 'แก้ไข', btnUpdate: 'อัปเดตการเยี่ยม', btnCancelEdit: 'ยกเลิก',
    updatedToast: 'อัปเดตการเยี่ยมแล้ว',
    labelAllocated: 'เฉลี่ยตามระยะทาง',
    typeVisit: 'เยี่ยมลูกค้า',
    typeRefuel: 'บันทึกเติมน้ำมัน',
    typeMeals: 'รับรองลูกค้า / ค่าอาหาร',
    fieldMeals: 'ค่ารับรอง / อาหาร',
    savedToast_visit: 'บันทึกการเยี่ยมแล้ว',
    savedToast_refuel: 'บันทึกการเติมน้ำมันแล้ว',
    savedToast_meals: 'บันทึกค่ารับรอง/อาหารแล้ว',
    updatedToast_visit: 'อัปเดตการเยี่ยมแล้ว',
    updatedToast_refuel: 'อัปเดตการเติมน้ำมันแล้ว',
    updatedToast_meals: 'อัปเดตค่ารับรอง/อาหารแล้ว'
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
  editingId: null,         // Track currently edited visit ID
  calendarTarget: null,    // which input the calendar is currently bound to
  calendarMonth: new Date(),
  currentUser: null,
  logType: 'visit'         // 'visit' or 'refuel'
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
    all[idx] = { ...all[idx], ...visitData, updated_at: new Date().toISOString() };
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

function getLevenshteinDistance(a, b) {
  const tmp = [];
  let i, j, alen = a.length, blen = b.length, cost;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  for (i = 0; i <= alen; i++) tmp[i] = [i];
  for (j = 0; j <= blen; j++) tmp[0][j] = j;
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
      tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + cost);
    }
  }
  return tmp[alen][blen];
}

function findSimilarCustomer(typed) {
  const tNorm = typed.replace(/\s+/g, ' ').trim().toLowerCase();
  if (tNorm.length < 3) return null;

  for (const cust of CUSTOMERS) {
    const cNorm = cust.replace(/\s+/g, ' ').trim().toLowerCase();
    if (cNorm === tNorm) continue;

    const dist = getLevenshteinDistance(tNorm, cNorm);
    const threshold = cNorm.length >= 5 ? 2 : 1;
    if (dist <= threshold) {
      return cust;
    }
  }
  return null;
}

function getFuelRateForRepAndMonth(visits, salesRep, dateIso) {
  if (!dateIso || !salesRep) return 0;
  const monthKey = dateIso.substring(0, 7); // "yyyy-mm"

  let totalFuel = 0;
  let totalKm = 0;

  visits.forEach(v => {
    if (v.sales_rep !== salesRep) return;
    const vMonth = v.visit_date ? v.visit_date.substring(0, 7) : '';
    if (vMonth !== monthKey) return;

    if (v.customer === 'Refuel') {
      totalFuel += (v.costs?.fuel || 0);
    } else {
      totalKm += (v.distance_km || 0);
    }
  });

  return totalKm > 0 ? (totalFuel / totalKm) : 0;
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
  renderFormActions();
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

      const spanText = document.createElement('span');
      spanText.textContent = opt.text;
      li.appendChild(spanText);

      li.dataset.value = opt.value;

      // Add delete button for custom customers (skip STATIC_CUSTOMERS and Refuel)
      if ((selectId === 'fieldCustomer' || selectId === 'filterCustomer') &&
        opt.value && opt.value !== 'Refuel' && !STATIC_CUSTOMERS.includes(opt.value)) {
        const delBtn = document.createElement('span');
        delBtn.className = 'delete-cust-btn';
        delBtn.innerHTML = '×';
        delBtn.title = state.lang === 'th' ? 'ลบลูกค้ารายนี้' : 'Delete this customer';

        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const toDelete = opt.value;

          const confirmText = state.lang === 'th'
            ? `คุณต้องการลบคุณลูกค้า "${toDelete}" ใช่หรือไม่? (ชื่อนี้จะยังอยู่ในประวัติเดิม แต่จะไม่แสดงให้เลือกใหม่)`
            : `Are you sure you want to delete customer "${toDelete}"? (It will remain in past history but won't be selectable for new logs)`;

          if (confirm(confirmText)) {
            try {
              const raw = localStorage.getItem('custom_customers');
              let custom = raw ? JSON.parse(raw) : [];
              custom = custom.filter(c => c !== toDelete);
              localStorage.setItem('custom_customers', JSON.stringify(custom));

              CUSTOMERS = [...STATIC_CUSTOMERS, ...custom];
              populateDropdowns();

              if (select.value === toDelete) {
                select.value = '';
                select.dispatchEvent(new Event('change', { bubbles: true }));
              }
            } catch (err) {
              console.error(err);
            }
          }
        });
        li.appendChild(delBtn);
      }

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
    const cleanQuery = query.replace(/\s+/g, ' ').trim();
    const q = cleanQuery.toLowerCase();

    // Remove existing "+ Add new" option if any
    const existingAddOpt = optionsContainer.querySelector('.add-new-option');
    if (existingAddOpt) {
      existingAddOpt.remove();
    }

    let exactMatchFound = false;

    Array.from(optionsContainer.children).forEach(li => {
      const val = li.dataset.value;
      const normVal = val ? val.replace(/\s+/g, ' ').trim().toLowerCase() : '';
      if (normVal === q) {
        exactMatchFound = true;
      }

      const text = li.textContent.toLowerCase();
      if (text.includes(q)) {
        li.classList.remove('hidden');
      } else {
        li.classList.add('hidden');
      }
    });

    // If query is not empty, not exact match, and it's the customer field
    if (cleanQuery && !exactMatchFound && selectId === 'fieldCustomer') {
      const similar = findSimilarCustomer(cleanQuery);
      const li = document.createElement('li');
      li.className = 'custom-select-option add-new-option';
      if (similar) {
        li.classList.add('warning');
      }

      const addTextEn = similar
        ? `+ Add "${cleanQuery}" (⚠️ Similar to "${similar}")`
        : `+ Add "${cleanQuery}"`;
      const addTextTh = similar
        ? `+ เพิ่ม "${cleanQuery}" (⚠️ คล้ายกับ "${similar}")`
        : `+ เพิ่ม "${cleanQuery}" เป็นลูกค้าใหม่`;
      li.textContent = state.lang === 'th' ? addTextTh : addTextEn;
      li.dataset.value = cleanQuery;

      li.addEventListener('click', (e) => {
        e.stopPropagation();
        const newVal = cleanQuery;

        // Add to CUSTOMERS if not exists
        if (!CUSTOMERS.includes(newVal)) {
          try {
            const raw = localStorage.getItem('custom_customers');
            const custom = raw ? JSON.parse(raw) : [];
            if (!custom.includes(newVal)) {
              custom.push(newVal);
              localStorage.setItem('custom_customers', JSON.stringify(custom));
            }
          } catch (err) {
            console.error(err);
          }
          CUSTOMERS.push(newVal);
          populateDropdowns();
        }

        select.value = newVal;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        closeDropdown();
      });
      optionsContainer.appendChild(li);
    }
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
  const reps = [...SALES_REPS];
  if (state.currentUser && !reps.includes(state.currentUser.name)) {
    reps.push(state.currentUser.name);
  }

  // Sales rep dropdown (form)
  fillSelect('fieldSalesRep', reps, false);
  fillSelect('fieldCustomer', CUSTOMERS, false);
  fillSelectWithPurposes('fieldPurpose');

  // Filter dropdowns — include "All" option
  fillSelect('filterRep', reps, true);
  fillSelect('filterCustomer', [...CUSTOMERS, 'Refuel'], true);

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
    let displayText = opt;
    if (opt === 'Refuel') {
      displayText = state.lang === 'th' ? 'เติมน้ำมัน (บันทึกค่าน้ำมันรวม)' : 'Refuel (Bulk Refueling Log)';
    }
    sel.innerHTML += `<option value="${opt}">${displayText}</option>`;
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
  const isRefuel = state.logType === 'refuel';
  const isMeals = state.logType === 'meals';
  const customer = isRefuel ? 'Refuel' : document.getElementById('fieldCustomer').value;

  if (isRefuel) {
    return {
      type: 'refuel',
      visit_date: parseDateInput(dateInput),
      visit_date_raw: dateInput,
      sales_rep: document.getElementById('fieldSalesRep').value,
      customer: customer,
      origin: 'Gas Station',
      destination: 'Refueling',
      distance_km: 0,
      distance_raw: '0',
      costs: {
        toll: 0,
        fuel: parseNumber(document.getElementById('fieldFuel').value),
        parking: 0,
        meals: 0,
        other: 0,
        other_description: ''
      },
      purpose: 'other',
      notes: document.getElementById('fieldNotes').value.trim()
    };
  }

  if (isMeals) {
    return {
      type: 'meals',
      visit_date: parseDateInput(dateInput),
      visit_date_raw: dateInput,
      sales_rep: document.getElementById('fieldSalesRep').value,
      customer: customer,
      origin: 'Restaurant/Venue',
      destination: 'Entertainment',
      distance_km: 0,
      distance_raw: '0',
      costs: {
        toll: 0,
        fuel: 0,
        parking: 0,
        meals: parseNumber(document.getElementById('fieldMeals').value),
        other: 0,
        other_description: ''
      },
      purpose: 'other',
      notes: document.getElementById('fieldNotes').value.trim()
    };
  }

  return {
    type: 'visit',
    visit_date: parseDateInput(dateInput),
    visit_date_raw: dateInput,
    sales_rep: document.getElementById('fieldSalesRep').value,
    customer: customer,
    origin: document.getElementById('fieldOrigin').value.trim(),
    destination: document.getElementById('fieldDestination').value.trim(),
    distance_km: parseNumber(document.getElementById('fieldDistance').value),
    distance_raw: document.getElementById('fieldDistance').value,
    costs: {
      toll: parseNumber(document.getElementById('fieldToll').value),
      fuel: parseNumber(document.getElementById('fieldFuel').value),
      parking: parseNumber(document.getElementById('fieldParking').value),
      meals: 0,
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

  const isRefuel = data.customer === 'Refuel';
  const isMeals = data.type === 'meals';

  // Required text/select fields
  if (!data.visit_date) { markInvalid('fieldDate', t('errInvalidDate')); ok = false; }
  if (!data.sales_rep) { markInvalid('fieldSalesRep', t('errRequired')); ok = false; }
  if (!data.customer) { markInvalid('fieldCustomer', t('errRequired')); ok = false; }

  if (!isRefuel && !isMeals) {
    if (!data.origin) { markInvalid('fieldOrigin', t('errRequired')); ok = false; }
    if (!data.destination) { markInvalid('fieldDestination', t('errRequired')); ok = false; }
    if (!data.purpose) { markInvalid('fieldPurpose', t('errRequired')); ok = false; }
  }

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
  if (!isRefuel && !isMeals) {
    if (data.distance_raw === '' || data.distance_km < 0) {
      markInvalid('fieldDistance', data.distance_km < 0 ? t('errNegative') : t('errRequired'));
      ok = false;
    }
  }

  ['Toll', 'Fuel', 'Parking', 'Meals', 'Other'].forEach(name => {
    const id = 'field' + name;
    const el = document.getElementById(id);
    if (el) {
      const val = parseNumber(el.value);
      if (val < 0) { markInvalid(id, t('errNegative')); ok = false; }
    }
  });

  // Toll is required for standard client visits
  if (!isRefuel && !isMeals && document.getElementById('fieldToll').value === '') {
    markInvalid('fieldToll', t('errRequired'));
    ok = false;
  }

  // Meals is required for meals type
  if (isMeals && document.getElementById('fieldMeals').value === '') {
    markInvalid('fieldMeals', t('errRequired'));
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
  return (costs.toll || 0) + (costs.fuel || 0) + (costs.parking || 0) + (costs.meals || 0) + (costs.other || 0);
}

function updateTotalDisplay() {
  const total = ['fieldToll', 'fieldFuel', 'fieldParking', 'fieldMeals', 'fieldOther']
    .map(id => {
      const el = document.getElementById(id);
      return el ? parseNumber(el.value) : 0;
    })
    .reduce((a, b) => a + b, 0);
  document.getElementById('totalDisplay').textContent = formatMoney(total);
}

async function handleSubmit(e) {
  e.preventDefault();
  const data = readForm();
  if (!validateForm(data)) return;

  const record = {
    visit_date: data.visit_date,
    sales_rep: state.currentUser && (state.currentUser.role === 'rep' || state.currentUser.role === 'manager') ? state.currentUser.name : data.sales_rep,
    customer: data.customer,
    origin: data.origin,
    destination: data.destination,
    distance_km: data.distance_km,
    costs: data.costs,
    total_cost: calculateTotal(data.costs),
    purpose: data.purpose,
    notes: data.notes,
    type: data.type
  };

  const type = record.type || 'visit';
  if (state.editingId) {
    await visitService.update(state.editingId, record);
    state.editingId = null;
    showToast(t('updatedToast_' + type) || t('updatedToast') || 'Record updated');
  } else {
    await visitService.create(record);
    showToast(t('savedToast_' + type) || t('savedToast') || 'Record saved');
  }

  await refreshState();
  resetForm();

  // Remember sales rep for next time
  savePref('lastRep', data.sales_rep);
}

function updateLogTypeUI() {
  const type = state.logType || 'visit';
  const visitBtn = document.getElementById('typeVisitBtn');
  const refuelBtn = document.getElementById('typeRefuelBtn');
  const mealsBtn = document.getElementById('typeMealsBtn');

  if (visitBtn) {
    if (type === 'visit') visitBtn.classList.add('active');
    else visitBtn.classList.remove('active');
  }
  if (refuelBtn) {
    if (type === 'refuel') refuelBtn.classList.add('active');
    else refuelBtn.classList.remove('active');
  }
  if (mealsBtn) {
    if (type === 'meals') mealsBtn.classList.add('active');
    else mealsBtn.classList.remove('active');
  }

  document.querySelectorAll('.visit-only').forEach(el => {
    el.style.display = type === 'visit' ? '' : 'none';
  });
  document.querySelectorAll('.refuel-only').forEach(el => {
    el.style.display = type === 'refuel' ? '' : 'none';
  });
  document.querySelectorAll('.meals-only').forEach(el => {
    el.style.display = type === 'meals' ? '' : 'none';
  });
  document.querySelectorAll('.visit-meals-only').forEach(el => {
    el.style.display = (type === 'visit' || type === 'meals') ? '' : 'none';
  });
  document.querySelectorAll('.visit-refuel-only').forEach(el => {
    el.style.display = (type === 'visit' || type === 'refuel') ? '' : 'none';
  });
}

function resetForm() {
  state.editingId = null; // Reset editing state
  state.logType = 'visit';
  updateLogTypeUI();
  document.getElementById('visitForm').reset();
  clearInvalidStates();
  // Pre-fill date with today and last-used sales rep
  document.getElementById('fieldDate').value = formatDateDisplay(todayIso());

  if (state.currentUser && (state.currentUser.role === 'rep' || state.currentUser.role === 'manager')) {
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

  renderFormActions(); // Ensure form buttons reset
}

function renderFormActions() {
  const container = document.getElementById('formActions');
  if (!container) return;

  if (state.editingId) {
    container.innerHTML = `
      <div style="display: flex; gap: 12px; width: 100%;">
        <button type="button" class="btn-secondary" id="cancelEditBtn" style="flex: 1;">${t('btnCancelEdit') || 'Cancel'}</button>
        <button type="submit" class="btn-primary" id="submitBtn" style="flex: 1;">${t('btnUpdate') || 'Update Visit'}</button>
      </div>
    `;
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
  } else {
    container.innerHTML = `
      <button type="submit" class="btn-primary" id="submitBtn" data-i18n="btnSave">${t('btnSave') || 'Save Visit'}</button>
    `;
  }
}

window.editVisit = async function (id) {
  try {
    const v = await visitService.getById(id);
    if (!v) return;

    state.editingId = id;
    state.logType = v.type || ((v.customer === 'Refuel') ? 'refuel' : 'visit');
    updateLogTypeUI();

    // Populate form fields
    document.getElementById('fieldDate').value = formatDateDisplay(v.visit_date);
    document.getElementById('fieldSalesRep').value = v.sales_rep;
    if (v.customer !== 'Refuel') {
      document.getElementById('fieldCustomer').value = v.customer;
    } else {
      document.getElementById('fieldCustomer').value = '';
    }
    document.getElementById('fieldOrigin').value = v.origin || '';
    document.getElementById('fieldDestination').value = v.destination || '';
    document.getElementById('fieldDistance').value = v.distance_km || '0';

    const c = v.costs || {};
    document.getElementById('fieldToll').value = c.toll || '0';
    document.getElementById('fieldFuel').value = c.fuel || '0';
    document.getElementById('fieldParking').value = c.parking || '0';
    document.getElementById('fieldMeals').value = c.meals || '0';
    document.getElementById('fieldOther').value = c.other || '0';
    document.getElementById('fieldOtherDesc').value = c.other_description || '';

    document.getElementById('fieldPurpose').value = v.purpose || '';
    document.getElementById('fieldNotes').value = v.notes || '';

    // Refresh UI states
    updateTotalDisplay();
    if (typeof updateAllSearchableSelects === 'function') {
      updateAllSearchableSelects();
    }

    renderFormActions();

    // Switch to form tab
    const logTab = document.querySelector('.tab[data-view="logView"]');
    if (logTab) {
      logTab.click();
    }
  } catch (err) {
    console.error('Failed to load visit details for editing', err);
  }
};

function cancelEdit() {
  resetForm();
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

  // Filter out Refuel logs and Meals for client visits count and top customer
  const clientVisitsThisMonth = thisMonth.filter(v => {
    const type = v.type || (v.customer === 'Refuel' ? 'refuel' : 'visit');
    return type === 'visit';
  });
  const visitCount = clientVisitsThisMonth.length;

  // Top customer this month (most visits)
  const customerCounts = {};
  clientVisitsThisMonth.forEach(v => { customerCounts[v.customer] = (customerCounts[v.customer] || 0) + 1; });
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
  const type = v.type || (v.customer === 'Refuel' ? 'refuel' : 'visit');
  const isRefuel = type === 'refuel';
  const isMeals = type === 'meals';

  let fuelCost = c.fuel || 0;
  let totalCost = v.total_cost;
  let allocatedText = '';

  if (isRefuel) {
    totalCost = fuelCost;
  } else if (isMeals) {
    totalCost = c.meals || 0;
  } else {
    const rate = getFuelRateForRepAndMonth(state.visits, v.sales_rep, v.visit_date);
    const allocatedFuel = (v.distance_km || 0) * rate;
    fuelCost = allocatedFuel;
    totalCost = (c.toll || 0) + (c.parking || 0) + (c.other || 0) + allocatedFuel;
    if (rate > 0) {
      allocatedText = ` (${t('labelAllocated') || 'Allocated'})`;
    }
  }

  let customerDisplay = '';
  if (isRefuel) {
    customerDisplay = (state.lang === 'th' ? '⛽ บันทึกเติมน้ำมัน' : '⛽ Refuel Log');
  } else if (isMeals) {
    customerDisplay = `🍽️ ${escapeHtml(v.customer)} (${state.lang === 'th' ? 'รับรองลูกค้า' : 'Entertainment'})`;
  } else {
    customerDisplay = escapeHtml(v.customer);
  }

  let borderLeftStyle = '';
  if (isRefuel) {
    borderLeftStyle = 'style="border-left: 4px solid var(--color-success);"';
  } else if (isMeals) {
    borderLeftStyle = 'style="border-left: 4px solid var(--color-accent);"';
  }

  return `
    <div class="visit-card" data-id="${v.id}">
      <div class="visit-header" onclick="toggleCard('${v.id}')" ${borderLeftStyle}>
        <div class="visit-date">${formatDateDisplay(v.visit_date)}</div>
        <div class="visit-customer">${customerDisplay}</div>
        <div class="visit-amount">฿${formatMoney(totalCost)}</div>
      </div>
      <div class="visit-details">
        <div class="visit-details-inner">
          <div class="detail-row">
            <span class="label">${t('detailRep')}</span>
            <span class="value">${escapeHtml(v.sales_rep)}</span>
          </div>
          ${(!isRefuel && !isMeals) ? `
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
          ` : ''}
          ${v.notes ? `
          <div class="detail-row">
            <span class="label">${t('detailNotes')}</span>
            <span class="value">${escapeHtml(v.notes)}</span>
          </div>` : ''}

          <div class="cost-breakdown">
            ${(!isRefuel && !isMeals) ? `
            <div class="row"><span>${t('fieldToll')}</span><span>฿${formatMoney(c.toll || 0)}</span></div>
            <div class="row"><span>${t('fieldFuel')}${allocatedText}</span><span>฿${formatMoney(fuelCost)}</span></div>
            ${c.parking ? `<div class="row"><span>${t('fieldParking')}</span><span>฿${formatMoney(c.parking)}</span></div>` : ''}
            ${c.other ? `<div class="row"><span>${t('fieldOther')}${c.other_description ? ` (${escapeHtml(c.other_description)})` : ''}</span><span>฿${formatMoney(c.other)}</span></div>` : ''}
            ` : isRefuel ? `
            <div class="row"><span>${t('fieldFuel')} (Refuel Amount)</span><span>฿${formatMoney(fuelCost)}</span></div>
            ` : `
            <div class="row"><span>${t('fieldMeals')}</span><span>฿${formatMoney(c.meals || 0)}</span></div>
            `}
            <div class="row total"><span>${t('labelTotal')}</span><span>฿${formatMoney(totalCost)}</span></div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="btn-secondary" onclick="editVisit('${v.id}')" style="flex: 1; min-height: 38px; padding: 8px; font-size: 0.85rem;">
              ✏️ ${t('btnEdit')}
            </button>
            <button class="btn-danger" onclick="requestDelete('${v.id}')" style="flex: 1; min-height: 38px; padding: 8px; font-size: 0.85rem;">
              🗑 ${t('btnDelete')}
            </button>
          </div>
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
    'id', 'type', 'visit_date', 'sales_rep', 'customer',
    'origin', 'destination', 'distance_km',
    'toll', 'fuel', 'parking', 'meals', 'other', 'other_description',
    'total_cost', 'purpose', 'notes', 'created_at'
  ];

  const rows = filtered.map(v => {
    const type = v.type || (v.customer === 'Refuel' ? 'refuel' : 'visit');
    let fuel = v.costs?.fuel || 0;
    let meals = v.costs?.meals || 0;
    let total = v.total_cost;

    if (type === 'visit') {
      const rate = getFuelRateForRepAndMonth(state.visits, v.sales_rep, v.visit_date);
      fuel = (v.distance_km || 0) * rate;
      total = (v.costs?.toll || 0) + (v.costs?.parking || 0) + (v.costs?.other || 0) + fuel;
    } else if (type === 'refuel') {
      total = fuel;
    } else if (type === 'meals') {
      total = meals;
    }

    return [
      v.id, type, v.visit_date, v.sales_rep, v.customer,
      v.origin, v.destination, v.distance_km,
      v.costs?.toll || 0,
      Number(fuel.toFixed(2)),
      v.costs?.parking || 0,
      Number(meals.toFixed(2)),
      v.costs?.other || 0,
      v.costs?.other_description || '',
      Number(total.toFixed(2)),
      v.purpose, v.notes, v.created_at
    ];
  });

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
  const isManager = state.currentUser && state.currentUser.role === 'manager';

  // Re-populate dropdowns first to ensure the logged-in user name exists as an option
  populateDropdowns();

  // Form sales rep field is locked for both Rep and Manager
  const formRepSelect = document.getElementById('fieldSalesRep');
  if (formRepSelect) {
    if (isRep || isManager) {
      formRepSelect.value = state.currentUser.name;
      formRepSelect.disabled = true;
      setSelectTriggerDisabled(formRepSelect, true);
    } else {
      formRepSelect.disabled = false;
      setSelectTriggerDisabled(formRepSelect, false);
    }
  }

  // Filter rep field is locked ONLY for Rep (Manager can search and filter other reps)
  const filterRepSelect = document.getElementById('filterRep');
  if (filterRepSelect) {
    if (isRep) {
      filterRepSelect.value = state.currentUser.name;
      filterRepSelect.disabled = true;
      setSelectTriggerDisabled(filterRepSelect, true);
    } else {
      filterRepSelect.disabled = false;
      setSelectTriggerDisabled(filterRepSelect, false);
    }
  }

  if (typeof updateAllSearchableSelects === 'function') {
    updateAllSearchableSelects();
  }
}

function setSelectTriggerDisabled(select, disabled) {
  if (select.parentElement && select.parentElement.classList.contains('custom-select-wrapper')) {
    const trigger = select.parentElement.querySelector('.custom-select-trigger');
    if (trigger) {
      trigger.style.pointerEvents = disabled ? 'none' : 'auto';
      trigger.style.opacity = disabled ? '0.6' : '1';
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   REFRESH STATE — reload visits + re-render
   ═══════════════════════════════════════════════════════════════════════ */
async function refreshState() {
  state.visits = await visitService.getAll();
  renderSummary();
  renderVisitList();
}

// Sample data seeder removed for production.

/* ═══════════════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════ */
async function init() {
  // 1. Restore language preference
  const savedLang = loadPref('lang');
  if (savedLang) state.lang = savedLang;

  // 2. Clear out any remaining sample data from localStorage for production
  try {
    let visits = JSON.parse(localStorage.getItem(SETTINGS.storageKey) || '[]');
    const filtered = visits.filter(v => !v.notes || !v.notes.includes('Sample data for'));
    if (visits.length !== filtered.length) {
      localStorage.setItem(SETTINGS.storageKey, JSON.stringify(filtered));
    }
  } catch (err) {
    console.error('Failed to clear seed data', err);
  }

  // Load visits to migrate and initialize custom customers
  const initialVisits = await visitService.getAll();
  loadCustomCustomers(initialVisits);

  // 3. Populate dropdowns and apply translations
  state.logType = 'visit';
  applyI18n();
  updateLogTypeUI();

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

  // Auto-calculate fuel cost if ratePerKm is active
  document.getElementById('fieldDistance').addEventListener('input', (e) => {
    if (SETTINGS.ratePerKm > 0) {
      const dist = parseNumber(e.target.value);
      const fuel = dist * SETTINGS.ratePerKm;
      document.getElementById('fieldFuel').value = fuel > 0 ? fuel.toFixed(2) : '';
      updateTotalDisplay();
    }
  });

  // Log Type Selector Buttons
  const typeVisitBtn = document.getElementById('typeVisitBtn');
  const typeRefuelBtn = document.getElementById('typeRefuelBtn');
  const typeMealsBtn = document.getElementById('typeMealsBtn');
  if (typeVisitBtn && typeRefuelBtn && typeMealsBtn) {
    typeVisitBtn.addEventListener('click', () => {
      state.logType = 'visit';
      updateLogTypeUI();
      updateTotalDisplay();
    });
    typeRefuelBtn.addEventListener('click', () => {
      state.logType = 'refuel';
      updateLogTypeUI();
      // Zero out non-refuel cost fields in input
      document.getElementById('fieldDistance').value = '0';
      document.getElementById('fieldToll').value = '0';
      document.getElementById('fieldParking').value = '0';
      document.getElementById('fieldMeals').value = '0';
      document.getElementById('fieldOther').value = '0';
      document.getElementById('fieldOtherDesc').value = '';
      document.getElementById('fieldFuel').focus();
      updateTotalDisplay();
    });
    typeMealsBtn.addEventListener('click', () => {
      state.logType = 'meals';
      updateLogTypeUI();
      // Zero out non-meal cost fields in input
      document.getElementById('fieldDistance').value = '0';
      document.getElementById('fieldToll').value = '0';
      document.getElementById('fieldParking').value = '0';
      document.getElementById('fieldFuel').value = '0';
      document.getElementById('fieldOther').value = '0';
      document.getElementById('fieldOtherDesc').value = '';
      document.getElementById('fieldMeals').focus();
      updateTotalDisplay();
    });
  }

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

  // 13. CSV export
  document.getElementById('exportBtn').addEventListener('click', exportCsv);

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
