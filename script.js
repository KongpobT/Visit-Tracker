const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwznFGWDZuz9IVCw1LrPrOCzKZ8VSiqnT_GsYdBeVWrKr_fS1Az2o6sqrqHhATWnmpW/exec";

let allTransactions = []; // Store fetched data

document.addEventListener('DOMContentLoaded', () => {
    // --- Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            if (targetId === 'history-tab') {
                if (allTransactions.length === 0) {
                    fetchTransactions(false);
                } else {
                    // Data is already fetched, so just render it
                    renderTable();
                }
            }
        });
    });

    // Fetch data in background on load for autocomplete
    if (allTransactions.length === 0) {
        fetchTransactions(true);
    }

    // --- Vendor Autocomplete Logic ---
    const vendorInput = document.getElementById('Vendor');
    const categoryInput = document.getElementById('Category');
    const descriptionInput = document.getElementById('Description');
    const suggestionsBox = document.getElementById('vendor-suggestions');

    function showSuggestions() {
        const query = vendorInput.value.trim();
        
        if (!query || allTransactions.length === 0 || typeof Fuse === 'undefined') {
            suggestionsBox.classList.add('hidden');
            return;
        }

        const fuse = new Fuse(allTransactions, {
            keys: ['Vendor'],
            threshold: 0.4,
            ignoreLocation: true
        });

        const results = fuse.search(query);
        
        const uniqueVendors = new Map();
        results.forEach(res => {
            const t = res.item;
            if (t.Vendor && !uniqueVendors.has(t.Vendor.toLowerCase())) {
                uniqueVendors.set(t.Vendor.toLowerCase(), t);
            }
        });

        const topSuggestions = Array.from(uniqueVendors.values()).slice(0, 5);

        if (topSuggestions.length > 0) {
            suggestionsBox.innerHTML = '';
            topSuggestions.forEach(t => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <div class="suggestion-vendor">${t.Vendor}</div>
                    <div class="suggestion-details">${t.Category || ''} • ${t.Description || ''}</div>
                `;
                div.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent document click from hiding immediately
                    vendorInput.value = t.Vendor;
                    
                    if (t.Category) {
                        const options = Array.from(categoryInput.options).map(o => o.value);
                        if (options.includes(t.Category)) {
                            categoryInput.value = t.Category;
                        }
                    }
                    if (t.Description) {
                        descriptionInput.value = t.Description;
                    }
                    
                    suggestionsBox.classList.add('hidden');
                });
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.classList.remove('hidden');
        } else {
            suggestionsBox.classList.add('hidden');
        }
    }

    vendorInput.addEventListener('input', showSuggestions);
    vendorInput.addEventListener('focus', showSuggestions);
    vendorInput.addEventListener('click', showSuggestions);

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (vendorInput && suggestionsBox) {
            if (!vendorInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.add('hidden');
            }
        }
    });

    // --- Add Transaction Form Logic ---
    const dateInput = document.getElementById('Date');
    const today = new Date();
    
    // Initialize Flatpickr
    const fp = flatpickr(dateInput, {
        dateFormat: "Y-m-d",     // Actual value of the hidden input
        altInput: true,          // Create a secondary visual input
        altFormat: "d/m/Y",      // Visual format DD/MM/YYYY
        defaultDate: today,
        disableMobile: "true",   // Use Flatpickr UI on mobile devices as well
        onReady: function(selectedDates, dateStr, instance) {
            // Create a custom 'Today' button at the bottom of the calendar
            const todayBtn = document.createElement("div");
            todayBtn.innerHTML = "Select Today";
            todayBtn.style.cursor = "pointer";
            todayBtn.style.padding = "10px";
            todayBtn.style.textAlign = "center";
            todayBtn.style.borderTop = "1px solid var(--glass-border)";
            todayBtn.style.fontWeight = "600";
            todayBtn.style.color = "var(--accent-color)";
            todayBtn.style.transition = "background 0.2s";
            
            todayBtn.addEventListener("mouseenter", () => {
                todayBtn.style.background = "rgba(255, 255, 255, 0.05)";
            });
            todayBtn.addEventListener("mouseleave", () => {
                todayBtn.style.background = "transparent";
            });
            
            todayBtn.addEventListener("click", function() {
                instance.setDate(new Date(), true);
                instance.close();
            });
            
            instance.calendarContainer.appendChild(todayBtn);
        }
    });

    const form = document.getElementById('transaction-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('loading-spinner');
    const addNotification = document.getElementById('add-notification');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        addNotification.classList.add('hidden');
        addNotification.className = 'notification hidden';
        
        submitBtn.disabled = true;
        btnText.textContent = 'Submitting...';
        spinner.classList.remove('hidden');

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const dateObj = new Date(data.Date);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            
            data.Date = `${day}/${month}/${year}`;
            data.Month = `${year}-${dateObj.getMonth() + 1}`;
            data.Year = year.toString();
            data.action = 'add'; // Specify action

            await fetch(APP_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            showNotification(addNotification, 'Transaction successfully added!', 'success');
            
            const currentAccount = document.getElementById('Account').value;
            const currentPaidBy = document.getElementById('PaidBy').value;
            form.reset();
            
            fp.setDate(new Date()); // Reset flatpickr to today
            document.getElementById('Account').value = currentAccount;
            document.getElementById('PaidBy').value = currentPaidBy;

            // Invalidate cache and refetch in background for continuous autocomplete functionality
            allTransactions = [];
            fetchTransactions(true);

        } catch (error) {
            console.error('Error submitting transaction:', error);
            showNotification(addNotification, 'Failed to add transaction.', 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = 'Add Transaction';
            spinner.classList.add('hidden');
        }
    });

    // --- History Logic ---
    const refreshBtn = document.getElementById('refresh-btn');
    const refreshSpinner = document.getElementById('refresh-spinner');
    const searchInput = document.getElementById('search-input');
    const filterYear = document.getElementById('filter-year');
    const filterMonth = document.getElementById('filter-month');
    const filterCategory = document.getElementById('filter-category');
    
    refreshBtn.addEventListener('click', () => fetchTransactions(false));
    searchInput.addEventListener('input', renderTable);
    filterYear.addEventListener('change', renderTable);
    filterMonth.addEventListener('change', renderTable);
    filterCategory.addEventListener('change', renderTable);

    async function fetchTransactions(isBackground = false) {
        const tbody = document.getElementById('table-body');
        
        if (!isBackground) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">Loading transactions...</td></tr>';
            refreshSpinner.classList.remove('hidden');
        }

        try {
            const response = await fetch(APP_SCRIPT_URL);
            const data = await response.json();
            
            // data is a 2D array. Row 0 is headers.
            if (data && data.length > 1) { // ensure there is data beyond the header row
                allTransactions = data.slice(1).map((row, index) => {
                    // Map by known column indices based on your spreadsheet structure
                    return {
                        _rowIndex: index + 2, // +2 because sheet rows are 1-indexed and we skipped header
                        Date: row[0],
                        Month: row[1],
                        Account: row[2],
                        Category: row[3],
                        Vendor: row[4],
                        Description: row[5],
                        Curr: row[6],
                        AmountOrig: row[7],
                        AmountTHB: row[8],
                        Direction: row[9],
                        PaidBy: row[10],
                        Reimburse: row[11],
                        ReceiptRef: row[12],
                        Status: row[13],
                        Year: row[14]
                    };
                });
                
                // Filter out any blank rows that might be at the bottom of the sheet
                allTransactions = allTransactions.filter(t => t.Date !== "" || t.Vendor !== "" || t.Description !== "");
                
                populateFilters();
                
                // Only render the table if we're on the history tab or not in background
                if (!isBackground || document.getElementById('history-tab').classList.contains('active')) {
                    renderTable();
                }
            } else {
                if (!isBackground) tbody.innerHTML = '<tr><td colspan="8" class="text-center">No data found.</td></tr>';
            }
        } catch (error) {
            console.error("Fetch error", error);
            if (!isBackground) tbody.innerHTML = '<tr><td colspan="8" class="text-center">Error loading data. Make sure Apps Script allows GET requests.</td></tr>';
        } finally {
            if (!isBackground) refreshSpinner.classList.add('hidden');
        }
    }

    function populateFilters() {
        const categories = new Set();
        const years = new Set();
        
        allTransactions.forEach(t => {
            if (t.Category) categories.add(t.Category);
            if (t.Date) {
                let dateObj = new Date(t.Date);
                if (isNaN(dateObj) && typeof t.Date === 'string' && t.Date.includes('/')) {
                    const parts = t.Date.split('/');
                    if (parts.length === 3) dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
                }
                if (!isNaN(dateObj)) years.add(dateObj.getFullYear());
            }
        });
        
        filterYear.innerHTML = '<option value="">All Years</option>';
        [...years].sort((a,b) => b - a).forEach(y => {
            filterYear.innerHTML += `<option value="${y}">${y}</option>`;
        });

        // Clean month filter: exactly 1-12
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        filterMonth.innerHTML = '<option value="">All Months</option>';
        monthNames.forEach((name, index) => {
            filterMonth.innerHTML += `<option value="${index + 1}">${name}</option>`;
        });

        filterCategory.innerHTML = '<option value="">All Categories</option>';
        [...categories].sort().forEach(c => {
            // Filter out '-' or header rows that might sneak in
            if (c && c !== '-' && c.toLowerCase() !== 'category') {
                filterCategory.innerHTML += `<option value="${c}">${c}</option>`;
            }
        });
    }

    function renderTable() {
        const tbody = document.getElementById('table-body');
        const searchTerm = searchInput.value.toLowerCase();
        const selectedYear = filterYear.value;
        const selectedMonth = filterMonth.value;
        const selectedCategory = filterCategory.value;

        // Apply Fuse.js for Search if search term exists
        let searchResults = allTransactions;
        if (searchTerm && typeof Fuse !== 'undefined') {
            const fuse = new Fuse(allTransactions, {
                keys: ['Vendor', 'Description', 'Category', 'AmountTHB'],
                threshold: 0.3, // Allows fuzzy matching (typos, order doesn't matter)
                ignoreLocation: true // Matches anywhere in the string
            });
            searchResults = fuse.search(searchTerm).map(result => result.item);
        } else if (searchTerm) {
            // Fallback just in case Fuse fails to load
            searchResults = allTransactions.filter(t => {
                const searchString = `${t.Vendor} ${t.Description} ${t.AmountOrig} ${t.AmountTHB}`.toLowerCase();
                return searchString.includes(searchTerm);
            });
        }

        const filtered = searchResults.filter(t => {
            // Extract the actual month and year directly from the Date column
            let itemMonth = "";
            let itemYear = "";
            if (t.Date) {
                let dateObj = new Date(t.Date);
                if (isNaN(dateObj) && typeof t.Date === 'string' && t.Date.includes('/')) {
                    const parts = t.Date.split('/');
                    if (parts.length === 3) dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
                }
                if (!isNaN(dateObj)) {
                    itemMonth = String(dateObj.getMonth() + 1);
                    itemYear = String(dateObj.getFullYear());
                }
            }
            
            const matchYear = !selectedYear || itemYear === selectedYear;
            const matchMonth = !selectedMonth || itemMonth === selectedMonth;
            const matchCategory = !selectedCategory || t.Category === selectedCategory;

            return matchYear && matchMonth && matchCategory;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No matching transactions.</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        // Sort descending by date roughly (or we just keep sheet order, but let's reverse to show newest if assuming sorted)
        // Note: Sheets might be sorted ascending. Reverse helps show latest.
        filtered.reverse().forEach(t => {
            const tr = document.createElement('tr');
            
            // Format Date safely
            let dateStr = t.Date;
            if (t.Date instanceof Date) {
                const day = String(t.Date.getDate()).padStart(2, '0');
                const month = String(t.Date.getMonth() + 1).padStart(2, '0');
                dateStr = `${day}/${month}/${t.Date.getFullYear()}`;
            } else if (typeof t.Date === 'string') {
                if (t.Date.includes('T')) {
                    const d = new Date(t.Date);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    dateStr = `${day}/${month}/${d.getFullYear()}`;
                } else if (t.Date.includes('-') && !t.Date.includes('/')) {
                    const d = new Date(t.Date);
                    if (!isNaN(d)) {
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        dateStr = `${day}/${month}/${d.getFullYear()}`;
                    }
                }
                // if it's already DD/MM/YYYY it stays as t.Date
            }

            let statusClass = (t.Status || '').toLowerCase();
            let directionClass = (t.Direction || '').toLowerCase().replace(/\s+/g, '-');
            
            tr.innerHTML = `
                <td>${dateStr}</td>
                <td>${t.Vendor || '-'}</td>
                <td>${t.Description || '-'}</td>
                <td>${t.Category || '-'}</td>
                <td><span class="direction-badge ${directionClass}">${t.Direction || '-'}</span></td>
                <td>${parseFloat(t.AmountTHB || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td><span class="status-pill ${statusClass}">${t.Status || '-'}</span></td>
                <td>
                    <button class="delete-btn" data-row="${t._rowIndex}">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Add Delete Listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const row = e.target.getAttribute('data-row');
                if (confirm(`Are you sure you want to delete row ${row}?`)) {
                    deleteTransaction(row, e.target);
                }
            });
        });
    }

    async function deleteTransaction(row, btnElement) {
        const historyNotif = document.getElementById('history-notification');
        const originalText = btnElement.textContent;
        btnElement.textContent = '...';
        btnElement.disabled = true;

        try {
            const data = { action: 'delete', row: parseInt(row) };
            
            await fetch(APP_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            // Assuming success due to no-cors
            showNotification(historyNotif, `Row ${row} deleted successfully. Refreshing...`, 'success');
            
            // Remove from local cache and re-render without full fetch
            allTransactions = allTransactions.filter(t => t._rowIndex !== parseInt(row));
            
            // Shift row indices for elements below the deleted row (optional, but good for accuracy if multiple deletes without refresh)
            allTransactions.forEach(t => {
                if (t._rowIndex > parseInt(row)) {
                    t._rowIndex -= 1;
                }
            });

            renderTable();

        } catch (error) {
            console.error('Error deleting:', error);
            showNotification(historyNotif, 'Failed to delete transaction.', 'error');
            btnElement.textContent = originalText;
            btnElement.disabled = false;
        }
    }

    function showNotification(element, message, type) {
        element.textContent = message;
        element.className = `notification ${type}`;
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    }
});
