        // --- DATA ENGINE ---
        let employees = [];
        let inventory = [];
        let suppliers = [];
        let menu = [];
        let cart = [];
        let transactions = [];
        let currentRole = "Admin";
        let editingEmployeeId = null;
        let editingSupplierId = null;
        let editingMenuItemId = null;
        let editingInventoryId = null;

        // --- LOCALSTORAGE FUNCTIONS ---
        function saveToLocalStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                console.error('Error saving to localStorage:', e);
            }
        }

        function loadFromLocalStorage(key, defaultValue = []) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (e) {
                console.error('Error loading from localStorage:', e);
                return defaultValue;
            }
        }

        // Load default data from external JSON
        async function loadDefaults() {
            try {
                const response = await fetch('data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data.json');
                }
                const data = await response.json();
                // Validate data structure
                if (!data.employees || !data.inventory || !data.suppliers || !data.menu) {
                    throw new Error('Invalid data structure');
                }
                return data;
            } catch (error) {
                console.error('Error loading default data:', error);
                console.log('Using fallback defaults');
                // Fallback defaults if JSON fails
                return {
                    employees: [
                        { id: 101, name: "Ahmed Alami", role: "Admin", status: "Actif", lastLogin: "2023-12-28 09:15" },
                        { id: 102, name: "Fatima Benali", role: "Cuisinier", status: "Actif", lastLogin: "2023-12-28 08:30" },
                        { id: 103, name: "Youssef Idrissi", role: "Serveur", status: "Inactif", lastLogin: "2023-12-27 22:10" },
                        { id: 104, name: "Aicha Tazi", role: "Caissier", status: "Actif", lastLogin: "2023-12-28 10:00" }
                    ],
                    inventory: [
                        { id: 1, name: "Poulet Fermier", qty: 45, unit: "kg", min: 10 },
                        { id: 2, name: "Tomates Fraîches", qty: 4, unit: "kg", min: 5 },
                        { id: 3, name: "Huile d'Olive", qty: 2, unit: "L", min: 10 },
                        { id: 4, name: "Agneau", qty: 25, unit: "kg", min: 8 },
                        { id: 5, name: "Semoule Fine", qty: 30, unit: "kg", min: 10 },
                        { id: 6, name: "Safran", qty: 0.5, unit: "g", min: 0.2 }
                    ],
                    suppliers: [
                        { id: 1, name: "Maroc Food Distribution", contact: "+212 522 123 456", type: "Frais", reliability: "A+" },
                        { id: 2, name: "Atlas Boissons", contact: "+212 522 789 012", type: "Liquides", reliability: "B" },
                        { id: 3, name: "Marché Central Casablanca", contact: "+212 522 456 789", type: "Épicerie", reliability: "A" },
                        { id: 4, name: "Bio Maroc", contact: "+212 522 345 678", type: "Bio", reliability: "A+" }
                    ],
                    menu: [
                        { id: 1, name: "Tajine Poulet aux Olives", price: 85.00, category: "Tajines", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
                        { id: 2, name: "Couscous Royal", price: 95.00, category: "Couscous", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
                        { id: 3, name: "Pastilla au Poulet", price: 75.00, category: "Pastilla", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
                        { id: 4, name: "Méchoui d'Agneau", price: 120.00, category: "Grillades", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400" },
                        { id: 5, name: "Salade Marocaine", price: 35.00, category: "Salades", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400" },
                        { id: 6, name: "Thé à la Menthe", price: 15.00, category: "Boissons", image: "https://images.unsplash.com/photo-1556679343-c7306c197cbc?w=400" }
                    ]
                };
            }
        }

        // Save functions for each data type
        function saveEmployees() {
            saveToLocalStorage('restopro_employees', employees);
        }

        function saveInventory() {
            saveToLocalStorage('restopro_inventory', inventory);
        }

        function saveSuppliers() {
            saveToLocalStorage('restopro_suppliers', suppliers);
        }

        function saveMenu() {
            saveToLocalStorage('restopro_menu', menu);
        }

        function saveTransactions() {
            saveToLocalStorage('restopro_transactions', transactions);
        }

        // Default data (fallback)
        const defaultData = {
            employees: [
                { id: 101, name: "Ahmed Alami", role: "Admin", status: "Actif", lastLogin: "2023-12-28 09:15" },
                { id: 102, name: "Fatima Benali", role: "Cuisinier", status: "Actif", lastLogin: "2023-12-28 08:30" },
                { id: 103, name: "Youssef Idrissi", role: "Serveur", status: "Inactif", lastLogin: "2023-12-27 22:10" },
                { id: 104, name: "Aicha Tazi", role: "Caissier", status: "Actif", lastLogin: "2023-12-28 10:00" }
            ],
            inventory: [
                { id: 1, name: "Poulet Fermier", qty: 45, unit: "kg", min: 10 },
                { id: 2, name: "Tomates Fraîches", qty: 4, unit: "kg", min: 5 },
                { id: 3, name: "Huile d'Olive", qty: 2, unit: "L", min: 10 },
                { id: 4, name: "Agneau", qty: 25, unit: "kg", min: 8 },
                { id: 5, name: "Semoule Fine", qty: 30, unit: "kg", min: 10 },
                { id: 6, name: "Safran", qty: 0.5, unit: "g", min: 0.2 }
            ],
            suppliers: [
                { id: 1, name: "Maroc Food Distribution", contact: "+212 522 123 456", type: "Frais", reliability: "A+" },
                { id: 2, name: "Atlas Boissons", contact: "+212 522 789 012", type: "Liquides", reliability: "B" },
                { id: 3, name: "Marché Central Casablanca", contact: "+212 522 456 789", type: "Épicerie", reliability: "A" },
                { id: 4, name: "Bio Maroc", contact: "+212 522 345 678", type: "Bio", reliability: "A+" }
            ],
            menu: [
                { id: 1, name: "Tajine Poulet aux Olives", price: 85.00, category: "Tajines", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
                { id: 2, name: "Couscous Royal", price: 95.00, category: "Couscous", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
                { id: 3, name: "Pastilla au Poulet", price: 75.00, category: "Pastilla", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
                { id: 4, name: "Méchoui d'Agneau", price: 120.00, category: "Grillades", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400" },
                { id: 5, name: "Salade Marocaine", price: 35.00, category: "Salades", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400" },
                { id: 6, name: "Thé à la Menthe", price: 15.00, category: "Boissons", image: "https://images.unsplash.com/photo-1556679343-c7306c197cbc?w=400" }
            ]
        };

        // Initialize data from localStorage or use defaults
        async function initializeData() {
            let defaults = defaultData;
            try {
                const loadedDefaults = await loadDefaults();
                if (loadedDefaults && loadedDefaults.employees && loadedDefaults.employees.length > 0) {
                    defaults = loadedDefaults;
                }
            } catch (error) {
                console.warn('Using hardcoded defaults:', error);
            }

            const defaultEmployees = defaults.employees || defaultData.employees;
            const defaultInventory = defaults.inventory || defaultData.inventory;
            const defaultSuppliers = defaults.suppliers || defaultData.suppliers;
            const defaultMenu = defaults.menu || defaultData.menu;

            const savedEmployees = loadFromLocalStorage('restopro_employees');
            const savedInventory = loadFromLocalStorage('restopro_inventory');
            const savedSuppliers = loadFromLocalStorage('restopro_suppliers');
            const savedMenu = loadFromLocalStorage('restopro_menu');
            const savedTransactions = loadFromLocalStorage('restopro_transactions');

            // Use saved data if it exists and has items, otherwise use defaults
            employees = (savedEmployees && Array.isArray(savedEmployees) && savedEmployees.length > 0) ? savedEmployees : defaultEmployees;
            inventory = (savedInventory && Array.isArray(savedInventory) && savedInventory.length > 0) ? savedInventory : defaultInventory;
            suppliers = (savedSuppliers && Array.isArray(savedSuppliers) && savedSuppliers.length > 0) ? savedSuppliers : defaultSuppliers;
            menu = (savedMenu && Array.isArray(savedMenu) && savedMenu.length > 0) ? savedMenu : defaultMenu;
            transactions = (savedTransactions && Array.isArray(savedTransactions) && savedTransactions.length > 0) ? savedTransactions : [];

            // Save defaults if this is first time or if arrays are empty (so we can detect it next time)
            if (!savedEmployees || !Array.isArray(savedEmployees) || savedEmployees.length === 0) {
                saveToLocalStorage('restopro_employees', employees);
            }
            if (!savedInventory || !Array.isArray(savedInventory) || savedInventory.length === 0) {
                saveToLocalStorage('restopro_inventory', inventory);
            }
            if (!savedSuppliers || !Array.isArray(savedSuppliers) || savedSuppliers.length === 0) {
                saveToLocalStorage('restopro_suppliers', suppliers);
            }
            if (!savedMenu || !Array.isArray(savedMenu) || savedMenu.length === 0) {
                saveToLocalStorage('restopro_menu', menu);
            }
            if (!savedTransactions || !Array.isArray(savedTransactions) || savedTransactions.length === 0) {
                saveTransactions();
            }
        }

        // Initialize data on page load
        initializeData().then(() => {
            console.log('Data initialized:', { employees: employees.length, inventory: inventory.length, suppliers: suppliers.length, menu: menu.length });
            // Initial Stats Run
            setTimeout(updateStats, 100);
            setTimeout(initChart, 200);
        }).catch(error => {
            console.error('Error initializing data:', error);
            // Use fallback data
            employees = [
                { id: 101, name: "Ahmed Alami", role: "Admin", status: "Actif", lastLogin: "2023-12-28 09:15" },
                { id: 102, name: "Fatima Benali", role: "Cuisinier", status: "Actif", lastLogin: "2023-12-28 08:30" },
                { id: 103, name: "Youssef Idrissi", role: "Serveur", status: "Inactif", lastLogin: "2023-12-27 22:10" },
                { id: 104, name: "Aicha Tazi", role: "Caissier", status: "Actif", lastLogin: "2023-12-28 10:00" }
            ];
            inventory = [
                { id: 1, name: "Poulet Fermier", qty: 45, unit: "kg", min: 10 },
                { id: 2, name: "Tomates Fraîches", qty: 4, unit: "kg", min: 5 },
                { id: 3, name: "Huile d'Olive", qty: 2, unit: "L", min: 10 },
                { id: 4, name: "Agneau", qty: 25, unit: "kg", min: 8 },
                { id: 5, name: "Semoule Fine", qty: 30, unit: "kg", min: 10 },
                { id: 6, name: "Safran", qty: 0.5, unit: "g", min: 0.2 }
            ];
            suppliers = [
                { id: 1, name: "Maroc Food Distribution", contact: "+212 522 123 456", type: "Frais", reliability: "A+" },
                { id: 2, name: "Atlas Boissons", contact: "+212 522 789 012", type: "Liquides", reliability: "B" },
                { id: 3, name: "Marché Central Casablanca", contact: "+212 522 456 789", type: "Épicerie", reliability: "A" },
                { id: 4, name: "Bio Maroc", contact: "+212 522 345 678", type: "Bio", reliability: "A+" }
            ];
            menu = [
                { id: 1, name: "Tajine Poulet aux Olives", price: 85.00, category: "Tajines", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
                { id: 2, name: "Couscous Royal", price: 95.00, category: "Couscous", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
                { id: 3, name: "Pastilla au Poulet", price: 75.00, category: "Pastilla", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
                { id: 4, name: "Méchoui d'Agneau", price: 120.00, category: "Grillades", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400" },
                { id: 5, name: "Salade Marocaine", price: 35.00, category: "Salades", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400" },
                { id: 6, name: "Thé à la Menthe", price: 15.00, category: "Boissons", image: "https://images.unsplash.com/photo-1556679343-c7306c197cbc?w=400" }
            ];
            saveToLocalStorage('restopro_employees', employees);
            saveToLocalStorage('restopro_inventory', inventory);
            saveToLocalStorage('restopro_suppliers', suppliers);
            saveToLocalStorage('restopro_menu', menu);
            setTimeout(updateStats, 100);
            setTimeout(initChart, 200);
        });

        // --- CORE LOGIC ---
        function handleLogin(e) {
            e.preventDefault();
            const u = document.getElementById('login-user').value.toLowerCase();
            const p = document.getElementById('login-pass').value;

            if(u === 'admin' && p === 'admin') {
                currentRole = "Admin";
                showView('main');
            } else if(u === 'staff' && p === '1234') {
                currentRole = "Staff";
                showView('main');
                hideAdminFeatures();
            } else {
                alert("Identifiants incorrects");
            }
        }

        function hideAdminFeatures() {
            // Un employé "staff" ne voit pas la gestion RH ou Stock critique en profondeur
            document.getElementById('nav-employees').classList.add('hidden');
            document.getElementById('nav-suppliers').classList.add('hidden');
            document.getElementById('user-name').innerText = "Serveur #01";
            document.getElementById('user-role').innerText = "Staff - Accès Limité";
        }

        function showView(v) {
            document.getElementById('view-login').classList.add('hidden-view');
            document.getElementById('view-main').classList.add('hidden-view');
            document.getElementById('view-pos').classList.add('hidden-view');
            document.getElementById(`view-${v}`).classList.remove('hidden-view');
            if(v === 'main') {
                switchTab('dashboard');
                updateStats();
                // Ensure data is rendered when switching to main view
                setTimeout(() => {
                    if (employees && employees.length > 0) renderEmployees();
                    if (inventory && inventory.length > 0) renderInventory();
                    if (suppliers && suppliers.length > 0) renderSuppliers();
                    if (menu && menu.length > 0) renderMenu();
                }, 200);
            }
        }

        function switchTab(t) {
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden-view'));
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            
            const contentEl = document.getElementById(`content-${t}`);
            const navEl = document.getElementById(`nav-${t}`);
            if (!contentEl || !navEl) return;
            
            contentEl.classList.remove('hidden-view');
            navEl.classList.add('active');
            
            const titles = { dashboard: "Tableau de Bord", employees: "Ressources Humaines", inventory: "Stock & Inventaire", suppliers: "Fournisseurs", menu: "Carte Gastronomique Marocaine" };
            const titleEl = document.getElementById('tab-title');
            if (titleEl) titleEl.innerText = titles[t] || "Dashboard";
            
            // Render specific data with a small delay to ensure DOM is ready
            setTimeout(() => {
                if(t === 'employees') renderEmployees();
                if(t === 'inventory') renderInventory();
                if(t === 'suppliers') renderSuppliers();
                if(t === 'menu') renderMenu();
            }, 50);
        }

        function updateStats() {
            const lowStock = inventory.filter(i => i.qty <= i.min).length;
            const staffCount = employees.filter(e => e.status === 'Actif').length;
            
            // Calculate today's sales
            const today = new Date().toISOString().split('T')[0];
            const todayTransactions = transactions.filter(t => t.date.startsWith(today));
            const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
            
            document.getElementById('stat-stock-alert').innerText = lowStock;
            document.getElementById('stat-staff-active').innerText = staffCount;
            document.getElementById('stat-suppliers').innerText = suppliers.length;
            
            // Update sales display
            const salesElement = document.getElementById('stat-sales-today');
            if (salesElement) {
                salesElement.innerText = todaySales.toFixed(2) + ' MAD';
            }
        }

        // --- RENDERING ---

        function renderEmployees() {
            const list = document.getElementById('list-employees');
            if (!list) return;
            if (!employees || employees.length === 0) {
                list.innerHTML = '<tr><td colspan="5" class="px-8 py-5 text-center text-slate-400">Aucun employé enregistré</td></tr>';
                return;
            }
            list.innerHTML = employees.map(e => `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-8 py-5">
                        <p class="font-bold text-slate-900">${e.name}</p>
                        <p class="text-[10px] text-slate-400 font-black tracking-widest">ID: #RE${e.id}</p>
                    </td>
                    <td class="px-8 py-5">
                        <span class="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">${e.role}</span>
                    </td>
                    <td class="px-8 py-5">
                        <span class="px-3 py-1 ${e.status === 'Actif' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} rounded-lg text-xs font-black uppercase tracking-tighter">${e.status}</span>
                    </td>
                    <td class="px-8 py-5 text-slate-400 font-medium text-sm">${e.lastLogin}</td>
                    <td class="px-8 py-5 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <button onclick="editEmployee(${e.id})" class="text-blue-500 hover:text-blue-600 p-2" title="Modifier"><i class="ph ph-pencil text-xl"></i></button>
                            <button onclick="deleteEmployee(${e.id})" class="text-red-500 hover:text-red-600 p-2" title="Supprimer"><i class="ph ph-trash text-xl"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function renderInventory() {
            const list = document.getElementById('list-inventory');
            const alerts = document.getElementById('list-inventory-alerts');
            if (!list || !alerts) return;
            if (!inventory || inventory.length === 0) {
                list.innerHTML = '<tr><td colspan="5" class="px-8 py-5 text-center text-slate-400">Aucun ingrédient enregistré</td></tr>';
                alerts.innerHTML = '<p class="text-slate-400 text-center py-10">Aucune alerte</p>';
                return;
            }
            
            list.innerHTML = inventory.map(i => `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-8 py-5 font-bold text-slate-900">${i.name}</td>
                    <td class="px-8 py-5 font-black text-slate-700">${i.qty} <span class="text-xs text-slate-400 uppercase">${i.unit}</span></td>
                    <td class="px-8 py-5 text-slate-400 font-bold">${i.min} ${i.unit}</td>
                    <td class="px-8 py-5">
                        <span class="px-3 py-1 ${i.qty <= i.min ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'} rounded-lg text-xs font-black uppercase tracking-tighter">
                            ${i.qty <= i.min ? 'Faible' : 'Optimale'}
                        </span>
                    </td>
                    <td class="px-8 py-5 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <button onclick="openStockModal(${i.id})" class="text-blue-500 font-bold text-xs uppercase hover:underline">+ Entrée</button>
                            <button onclick="editInventory(${i.id})" class="text-blue-500 hover:text-blue-600 p-1" title="Modifier"><i class="ph ph-pencil text-lg"></i></button>
                            <button onclick="deleteInventory(${i.id})" class="text-red-500 hover:text-red-600 p-1" title="Supprimer"><i class="ph ph-trash text-lg"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');

            const lowItems = inventory.filter(i => i.qty <= i.min);
            alerts.innerHTML = lowItems.length ? lowItems.map(i => `
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center"><i class="ph ph-warning-octagon text-xl"></i></div>
                        <div>
                            <p class="font-bold text-red-900">${i.name}</p>
                            <p class="text-xs text-red-500 font-medium">Restant: ${i.qty} ${i.unit}</p>
                        </div>
                    </div>
                    <button class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg">Commander</button>
                </div>
            `).join('') : '<p class="text-emerald-500 font-bold text-center py-10">Tout est sous contrôle ! - كل شيء تحت السيطرة</p>';
        }

        function renderSuppliers() {
            const grid = document.getElementById('list-suppliers');
            if (!grid) return;
            if (!suppliers || suppliers.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-10 text-slate-400">Aucun fournisseur enregistré</div>';
                return;
            }
            grid.innerHTML = suppliers.map(s => `
                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition relative">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center"><i class="ph-bold ph-factory text-2xl"></i></div>
                        <span class="px-3 py-1 bg-orange-100 text-orange-600 font-black text-[10px] rounded-lg tracking-widest uppercase">${s.reliability}</span>
                    </div>
                    <h4 class="font-bold text-lg text-slate-900">${s.name}</h4>
                    <p class="text-xs text-slate-400 font-bold mb-4 uppercase tracking-tighter">${s.type}</p>
                    <div class="space-y-2 border-t pt-4">
                        <div class="flex items-center gap-2 text-sm font-medium text-slate-600"><i class="ph ph-phone"></i> ${s.contact}</div>
                        <div class="flex gap-2 mt-4">
                            <button onclick="editSupplier(${s.id})" class="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition">Modifier</button>
                            <button onclick="deleteSupplier(${s.id})" class="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-xs hover:bg-red-600 transition">Supprimer</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderMenu() {
            const grid = document.getElementById('admin-menu-grid');
            if (!grid) return;
            if (!menu || menu.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-10 text-slate-400">Aucun plat enregistré</div>';
                return;
            }
            grid.innerHTML = menu.map(m => `
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative group">
                    <img src="${m.image}" class="w-full h-32 object-cover">
                    <div class="p-4">
                        <h5 class="font-bold text-slate-900">${m.name}</h5>
                        <p class="text-orange-600 font-black text-lg">${m.price.toFixed(2)} MAD</p>
                        <div class="flex gap-2 mt-3">
                            <button onclick="editMenuItem(${m.id})" class="flex-1 py-2 bg-blue-500 text-white rounded-lg font-bold text-xs hover:bg-blue-600 transition">Modifier</button>
                            <button onclick="deleteMenuItem(${m.id})" class="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold text-xs hover:bg-red-600 transition">Supprimer</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // --- POS ENGINE ---
        function goToPOS() {
            showView('pos');
            renderPOSItems();
            document.getElementById('pos-user-display').innerText = "Session: " + (currentRole === 'Admin' ? 'Admin' : 'Serveur');
        }

        function renderPOSItems() {
            const grid = document.getElementById('pos-grid');
            grid.innerHTML = menu.map(m => `
                <div onclick="addToCart(${m.id})" class="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer transform active:scale-95 transition-all group">
                    <img src="${m.image}" class="w-full h-32 object-cover rounded-2xl mb-3 group-hover:scale-105 transition">
                    <h5 class="font-bold text-slate-800 leading-tight">${m.name}</h5>
                    <p class="text-orange-600 font-black mt-2">${m.price.toFixed(2)} MAD</p>
                </div>
            `).join('');
        }

        function addToCart(id) {
            const m = menu.find(x => x.id === id);
            cart.push(m);
            renderCart();
        }

        function renderCart() {
            const list = document.getElementById('pos-cart');
            const clearBtn = document.getElementById('clear-cart-btn');
            
            if (cart.length) {
                list.innerHTML = cart.map((c, idx) => `
                    <div class="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div class="flex-1">
                            <span class="font-bold text-slate-800">${c.name}</span>
                            <p class="text-xs text-slate-400">${c.price.toFixed(2)} MAD</p>
                        </div>
                        <button onclick="removeFromCart(${idx})" class="ml-3 w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition"><i class="ph ph-trash text-sm"></i></button>
                    </div>
                `).join('');
                clearBtn.style.display = 'block';
            } else {
                list.innerHTML = '<p class="text-center text-slate-400 py-10 font-medium">Panier vide</p>';
                clearBtn.style.display = 'none';
            }
            
            const total = cart.reduce((a, b) => a + b.price, 0);
            document.getElementById('pos-total').innerText = total.toFixed(2) + ' MAD';
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            renderCart();
        }

        function clearCart() {
            cart = [];
            renderCart();
        }

        // --- MODAL FUNCTIONS ---
        function openEmployeeModal() {
            editingEmployeeId = null;
            document.getElementById('emp-modal-title').innerText = 'Nouvel Employé';
            document.getElementById('emp-name').value = '';
            document.getElementById('emp-role').value = '';
            document.getElementById('emp-login').value = '';
            document.getElementById('emp-password').value = '';
            document.getElementById('emp-password').required = true;
            document.getElementById('modal-employee').classList.remove('hidden-view');
        }

        function editEmployee(id) {
            editingEmployeeId = id;
            const emp = employees.find(e => e.id === id);
            if (!emp) return;
            
            document.getElementById('emp-modal-title').innerText = 'Modifier Employé';
            document.getElementById('emp-name').value = emp.name;
            document.getElementById('emp-role').value = emp.role;
            document.getElementById('emp-login').value = emp.login || '';
            document.getElementById('emp-password').value = '';
            document.getElementById('emp-password').required = false;
            document.getElementById('emp-password').placeholder = 'Laisser vide pour ne pas changer';
            document.getElementById('modal-employee').classList.remove('hidden-view');
        }

        function deleteEmployee(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) return;
            employees = employees.filter(e => e.id !== id);
            saveEmployees();
            renderEmployees();
            updateStats();
        }

        function closeEmployeeModal() {
            document.getElementById('modal-employee').classList.add('hidden-view');
            editingEmployeeId = null;
            document.getElementById('emp-password').placeholder = 'Mot de passe initial';
        }

        function openSupplierModal() {
            editingSupplierId = null;
            document.getElementById('sup-modal-title').innerText = 'Nouveau Fournisseur';
            document.getElementById('sup-name').value = '';
            document.getElementById('sup-contact').value = '';
            document.getElementById('sup-type').value = '';
            document.getElementById('sup-reliability').value = '';
            document.getElementById('modal-supplier').classList.remove('hidden-view');
        }

        function editSupplier(id) {
            editingSupplierId = id;
            const sup = suppliers.find(s => s.id === id);
            if (!sup) return;
            
            document.getElementById('sup-modal-title').innerText = 'Modifier Fournisseur';
            document.getElementById('sup-name').value = sup.name;
            document.getElementById('sup-contact').value = sup.contact;
            document.getElementById('sup-type').value = sup.type;
            document.getElementById('sup-reliability').value = sup.reliability;
            document.getElementById('modal-supplier').classList.remove('hidden-view');
        }

        function deleteSupplier(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) return;
            suppliers = suppliers.filter(s => s.id !== id);
            saveSuppliers();
            renderSuppliers();
            updateStats();
        }

        function closeSupplierModal() {
            document.getElementById('modal-supplier').classList.add('hidden-view');
            editingSupplierId = null;
        }

        function openMenuModal() {
            editingMenuItemId = null;
            document.getElementById('menu-modal-title').innerText = 'Nouveau Plat';
            document.getElementById('menu-name').value = '';
            document.getElementById('menu-price').value = '';
            document.getElementById('menu-category').value = '';
            document.getElementById('menu-image').value = '';
            document.getElementById('modal-menu').classList.remove('hidden-view');
        }

        function editMenuItem(id) {
            editingMenuItemId = id;
            const item = menu.find(m => m.id === id);
            if (!item) return;
            
            document.getElementById('menu-modal-title').innerText = 'Modifier Plat';
            document.getElementById('menu-name').value = item.name;
            document.getElementById('menu-price').value = item.price;
            document.getElementById('menu-category').value = item.category;
            document.getElementById('menu-image').value = item.image;
            document.getElementById('modal-menu').classList.remove('hidden-view');
        }

        function deleteMenuItem(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) return;
            menu = menu.filter(m => m.id !== id);
            saveMenu();
            renderMenu();
            renderPOSItems(); // Update POS view if open
        }

        function closeMenuModal() {
            document.getElementById('modal-menu').classList.add('hidden-view');
            editingMenuItemId = null;
        }

        function openStockModal(id) {
            editingInventoryId = id;
            const item = inventory.find(i => i.id === id);
            if (!item) return;
            
            document.getElementById('stock-item-name').innerText = item.name;
            document.getElementById('stock-current-qty').innerText = item.qty + ' ' + item.unit;
            document.getElementById('stock-operation').value = 'add';
            document.getElementById('stock-qty').value = '';
            document.getElementById('stock-note').value = '';
            document.getElementById('modal-stock').classList.remove('hidden-view');
        }

        function closeStockModal() {
            document.getElementById('modal-stock').classList.add('hidden-view');
            editingInventoryId = null;
        }

        function editInventory(id) {
            editingInventoryId = id;
            const item = inventory.find(i => i.id === id);
            if (!item) return;
            
            // Pre-fill form with item data
            document.getElementById('inv-name').value = item.name;
            document.getElementById('inv-unit').value = item.unit;
            document.getElementById('inv-qty').value = item.qty;
            document.getElementById('inv-min').value = item.min;
            // Scroll to form
            document.getElementById('inv-name').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function deleteInventory(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) return;
            inventory = inventory.filter(i => i.id !== id);
            saveInventory();
            renderInventory();
            updateStats();
        }

        // --- FORM HANDLERS ---
        function handleSaveEmployee(e) {
            e.preventDefault();
            const name = document.getElementById('emp-name').value;
            const role = document.getElementById('emp-role').value;
            const login = document.getElementById('emp-login').value;
            const password = document.getElementById('emp-password').value;
            
            if (editingEmployeeId) {
                // Edit mode
                const emp = employees.find(e => e.id === editingEmployeeId);
                if (emp) {
                    emp.name = name;
                    emp.role = role;
                    emp.login = login;
                    if (password) emp.password = password;
                }
            } else {
                // Add mode
                const newId = Math.max(...employees.map(e => e.id), 100) + 1;
                employees.push({
                    id: newId,
                    name: name,
                    role: role,
                    status: "Actif",
                    lastLogin: new Date().toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    login: login,
                    password: password
                });
            }
            
            saveEmployees();
            renderEmployees();
            updateStats();
            closeEmployeeModal();
        }

        function handleSaveSupplier(e) {
            e.preventDefault();
            const name = document.getElementById('sup-name').value;
            const contact = document.getElementById('sup-contact').value;
            const type = document.getElementById('sup-type').value;
            const reliability = document.getElementById('sup-reliability').value;
            
            if (editingSupplierId) {
                // Edit mode
                const sup = suppliers.find(s => s.id === editingSupplierId);
                if (sup) {
                    sup.name = name;
                    sup.contact = contact;
                    sup.type = type;
                    sup.reliability = reliability;
                }
            } else {
                // Add mode
                const newId = Math.max(...suppliers.map(s => s.id), 0) + 1;
                suppliers.push({
                    id: newId,
                    name: name,
                    contact: contact,
                    type: type,
                    reliability: reliability
                });
            }
            
            saveSuppliers();
            renderSuppliers();
            updateStats();
            closeSupplierModal();
        }

        function handleSaveMenuItem(e) {
            e.preventDefault();
            const name = document.getElementById('menu-name').value;
            const price = parseFloat(document.getElementById('menu-price').value);
            const category = document.getElementById('menu-category').value;
            const image = document.getElementById('menu-image').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
            
            if (editingMenuItemId) {
                // Edit mode
                const item = menu.find(m => m.id === editingMenuItemId);
                if (item) {
                    item.name = name;
                    item.price = price;
                    item.category = category;
                    item.image = image;
                }
            } else {
                // Add mode
                const newId = Math.max(...menu.map(m => m.id), 0) + 1;
                menu.push({
                    id: newId,
                    name: name,
                    price: price,
                    category: category,
                    image: image
                });
            }
            
            saveMenu();
            renderMenu();
            renderPOSItems(); // Update POS if open
            closeMenuModal();
        }

        function handleStockAdjustment(e) {
            e.preventDefault();
            const item = inventory.find(i => i.id === editingInventoryId);
            if (!item) return;
            
            const operation = document.getElementById('stock-operation').value;
            const qty = parseFloat(document.getElementById('stock-qty').value);
            const note = document.getElementById('stock-note').value;
            
            if (operation === 'add') {
                item.qty += qty;
            } else if (operation === 'remove') {
                item.qty = Math.max(0, item.qty - qty);
            } else if (operation === 'set') {
                item.qty = qty;
            }
            
            saveInventory();
            renderInventory();
            updateStats();
            closeStockModal();
        }

        // --- PAYMENT PROCESSING ---
        function processPayment() {
            if (cart.length === 0) {
                alert('Le panier est vide !');
                return;
            }
            
            const total = cart.reduce((a, b) => a + b.price, 0);
            const confirmPay = confirm(`Confirmer le paiement de ${total.toFixed(2)} MAD ?`);
            
            if (confirmPay) {
                // Simulate payment processing
                const btn = document.getElementById('pay-btn');
                btn.disabled = true;
                btn.innerText = 'TRAITEMENT...';
                
                // Save transaction
                const transaction = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    items: [...cart],
                    total: total,
                    cashier: currentRole
                };
                transactions.push(transaction);
                saveTransactions();
                
                setTimeout(() => {
                    alert(`✅ Paiement validé !\n\nTotal: ${total.toFixed(2)} MAD\n\nشكرا لك - Merci de votre visite !`);
                    clearCart();
                    btn.disabled = false;
                    btn.innerText = 'ENCAISSER';
                    updateStats(); // Update dashboard with new sales
                }, 1000);
            }
        }

        // --- ACTIONS ---
        function logout() { showView('login'); cart = []; }

        // Function to reset data and reload defaults (useful for debugging)
        function resetData() {
            if (confirm('Voulez-vous réinitialiser toutes les données et charger les données par défaut ?')) {
                localStorage.removeItem('restopro_employees');
                localStorage.removeItem('restopro_inventory');
                localStorage.removeItem('restopro_suppliers');
                localStorage.removeItem('restopro_menu');
                localStorage.removeItem('restopro_transactions');
                location.reload();
            }
        }

        function handleAddIngredient(e) {
            e.preventDefault();
            const n = document.getElementById('inv-name').value;
            const q = parseInt(document.getElementById('inv-qty').value);
            const u = document.getElementById('inv-unit').value;
            const m = parseInt(document.getElementById('inv-min').value);
            
            if (editingInventoryId) {
                // Edit mode
                const item = inventory.find(i => i.id === editingInventoryId);
                if (item) {
                    item.name = n;
                    item.unit = u;
                    item.qty = q;
                    item.min = m;
                }
                editingInventoryId = null;
            } else {
                // Add mode
                inventory.push({ id: Date.now(), name: n, qty: q, unit: u, min: m });
            }
            
            saveInventory();
            renderInventory();
            updateStats();
            e.target.reset();
            editingInventoryId = null;
        }

        function toggleEmployee(id) {
            const e = employees.find(x => x.id === id);
            e.status = e.status === 'Actif' ? 'Inactif' : 'Actif';
            saveEmployees();
            renderEmployees();
            updateStats();
        }

        function initChart() {
            const ctx = document.getElementById('mainChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                    datasets: [{
                        label: 'CA Hebdo',
                        data: [1800, 2200, 1950, 2600, 3100, 4200, 3800],
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } } }
                }
            });
        }

        // Close modals on outside click
        document.addEventListener('click', function(e) {
            if (e.target.id === 'modal-employee') closeEmployeeModal();
            if (e.target.id === 'modal-supplier') closeSupplierModal();
            if (e.target.id === 'modal-menu') closeMenuModal();
            if (e.target.id === 'modal-stock') closeStockModal();
        });