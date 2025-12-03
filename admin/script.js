/* admin/script.js */

// --- MOCK DATA (Dữ liệu giả lập) ---
const mockData = {
    products: [
        { id: 1, name: 'Maison', sku: 'GL-001', price: 777000, category: 'Sunglasses', stock: 120, status: 'Active', image: '../images/products/maison.png' },
        { id: 2, name: 'Nuit', sku: 'GL-002', price: 790000, category: 'Sunglasses', stock: 2, status: 'Active', image: '../images/products/nuit.png' },
        { id: 3, name: 'Dada', sku: 'GL-003', price: 780000, category: 'Sunglasses', stock: 0, status: 'Hidden', image: '../images/products/dada.png' },
        { id: 4, name: 'Kala', sku: 'OPT-001', price: 650000, category: 'Glasses', stock: 50, status: 'Active', image: '../images/products/kala-black.png' },
        { id: 5, name: 'Oris', sku: 'OPT-002', price: 660000, category: 'Glasses', stock: 15, status: 'Active', image: '../images/products/oris.png' }
    ],
    orders: [
        { id: '3920', customer: 'Nguyen Van A', email: 'vana@gmail.com', date: '2025-09-24', status: 'Completed', total: 470000, payment: 'MOMO', address: '123 Le Loi, Q1, HCM', items: [{ name: 'Kala', qty: 1, price: 450000 }] },
        { id: '3921', customer: 'Tran Thi B', email: 'tranb@yahoo.com', date: '2025-09-25', status: 'Pending', total: 1250000, payment: 'COD', address: '456 Nguyen Hue, Q1, HCM', items: [{ name: 'Maison', qty: 1, price: 777000 }, { name: 'Cleaning Kit', qty: 1, price: 50000 }] },
        { id: '3922', customer: 'Le Van C', email: 'levanc@gmail.com', date: '2025-09-26', status: 'Processing', total: 790000, payment: 'VNPay', address: '789 Vo Van Kiet, Q5, HCM', items: [{ name: 'Nuit', qty: 1, price: 790000 }] }
    ],
    customers: [
        { id: 1, name: 'Nguyen Van A', email: 'vana@gmail.com', location: 'TP.HCM', orders: 5, spent: 2500000, points: 120, notes: 'VIP customer, prefers fast shipping.', history: [{id: '3920', date: '2025-09-24', total: 470000}, {id: '3800', date: '2025-08-10', total: 2030000}] },
        { id: 2, name: 'Tran Thi B', email: 'tranb@yahoo.com', location: 'Ha Noi', orders: 2, spent: 800000, points: 40, notes: '', history: [{id: '3921', date: '2025-09-25', total: 1250000}] }
    ]
};

// --- GENERAL FUNCTIONS ---
function init() {
    setupNotifications();
    
    // Router đơn giản dựa trên ID của bảng trong HTML
    if (document.getElementById('productTableBody')) renderProducts();
    if (document.getElementById('orderTableBody')) renderOrders();
    if (document.getElementById('customerTableBody')) renderCustomers();
    if (document.getElementById('revenueChart')) renderDashboardCharts();
}

function setupNotifications() {
    const bell = document.querySelector('.notification');
    const dropdown = document.querySelector('.notif-dropdown');
    
    if(bell && dropdown) {
        // Tạo thông báo giả lập
        const lowStock = mockData.products.filter(p => p.stock < 5).length;
        const newOrders = mockData.orders.filter(o => o.status === 'Pending').length;
        
        document.querySelector('.notification .badge').innerText = lowStock + newOrders;
        
        let html = '';
        if(lowStock > 0) html += `<div class="notif-item"><i class="fas fa-exclamation-circle"></i> ${lowStock} products low in stock</div>`;
        if(newOrders > 0) html += `<div class="notif-item"><i class="fas fa-shopping-cart"></i> ${newOrders} new orders pending</div>`;
        
        dropdown.innerHTML = html || '<div class="notif-item">No new notifications</div>';

        bell.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
    }
}

// --- PRODUCTS MODULE ---
function renderProducts(data = mockData.products) {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';
    data.forEach(p => {
        let stockClass = p.stock > 10 ? 'in-stock' : (p.stock > 0 ? 'low-stock' : 'out-stock');
        let stockLabel = p.stock > 10 ? 'In Stock' : (p.stock > 0 ? 'Low Stock' : 'Out of Stock');
        
        let row = `<tr>
            <td><img src="${p.image}" onerror="this.src='https://via.placeholder.com/40'"></td>
            <td><b>${p.name}</b></td>
            <td>${p.sku}</td>
            <td>${p.price.toLocaleString()}đ</td>
            <td>${p.category}</td>
            <td><span class="status ${stockClass}">${p.stock} (${stockLabel})</span></td>
            <td>${p.status}</td>
            <td class="actions">
                <i class="fas fa-edit edit" onclick="openProductModal(${p.id})"></i>
                <i class="fas fa-trash delete" onclick="deleteItem('products', ${p.id})"></i>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function filterProducts() {
    const term = document.getElementById('searchProduct').value.toLowerCase();
    const cat = document.getElementById('filterCategory').value;
    const stock = document.getElementById('filterStock').value;

    const filtered = mockData.products.filter(p => {
        const matchTerm = p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term);
        const matchCat = cat === 'All' || p.category === cat;
        const matchStock = stock === 'All' || (stock === 'In Stock' && p.stock > 0) || (stock === 'Out of Stock' && p.stock === 0);
        return matchTerm && matchCat && matchStock;
    });
    renderProducts(filtered);
}

function openProductModal(id = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const form = document.getElementById('productForm');
    
    form.reset(); // Xóa dữ liệu cũ
    
    if (id) {
        const p = mockData.products.find(x => x.id === id);
        title.innerText = 'Edit Product';
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodSku').value = p.sku;
        document.getElementById('prodPrice').value = p.price;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodStock').value = p.stock;
    } else {
        title.innerText = 'Add New Product';
    }
    modal.classList.add('active');
}

function saveProduct() {
    // Logic lưu sản phẩm (giả lập)
    const name = document.getElementById('prodName').value;
    const stock = parseInt(document.getElementById('prodStock').value);
    
    // Thêm vào đầu mảng để thấy ngay
    mockData.products.unshift({
        id: Date.now(),
        name: name,
        sku: document.getElementById('prodSku').value,
        price: parseInt(document.getElementById('prodPrice').value),
        category: document.getElementById('prodCategory').value,
        stock: stock,
        status: 'Active',
        image: '../images/logo/favicon.png'
    });
    
    renderProducts();
    closeModal('productModal');
    alert('Product saved successfully!');
}

// --- ORDERS MODULE ---
function renderOrders(data = mockData.orders) {
    const tbody = document.getElementById('orderTableBody');
    tbody.innerHTML = '';
    data.forEach(o => {
        let row = `<tr>
            <td>#${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.date}</td>
            <td><span class="status ${o.status.toLowerCase()}">${o.status}</span></td>
            <td>${o.total.toLocaleString()}đ</td>
            <td class="actions">
                <i class="fas fa-eye view" onclick="viewOrder('${o.id}')"></i>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function viewOrder(id) {
    const o = mockData.orders.find(x => x.id === id);
    if (!o) return;

    document.getElementById('ordId').innerText = '#' + o.id;
    document.getElementById('ordCustomer').innerText = o.customer;
    document.getElementById('ordDate').innerText = o.date;
    document.getElementById('ordAddress').innerText = o.address;
    document.getElementById('ordPayment').innerText = o.payment;
    document.getElementById('ordStatusSelect').value = o.status;
    document.getElementById('ordTotal').innerText = o.total.toLocaleString() + 'đ';

    const itemsTbody = document.getElementById('ordItems');
    itemsTbody.innerHTML = '';
    o.items.forEach(i => {
        itemsTbody.innerHTML += `<tr>
            <td>${i.name}</td>
            <td>${i.qty}</td>
            <td>${i.price.toLocaleString()}đ</td>
            <td>${(i.qty * i.price).toLocaleString()}đ</td>
        </tr>`;
    });

    // Lưu ID để cập nhật status
    document.getElementById('btnUpdateStatus').onclick = function() {
        o.status = document.getElementById('ordStatusSelect').value;
        renderOrders();
        closeModal('orderModal');
        alert(`Order #${o.id} status updated!`);
    };

    openModal('orderModal');
}

function filterOrders() {
    const term = document.getElementById('searchOrder').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;
    
    const filtered = mockData.orders.filter(o => {
        const matchTerm = o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term);
        const matchStatus = status === 'All' || o.status === status;
        return matchTerm && matchStatus;
    });
    renderOrders(filtered);
}

// --- CUSTOMERS MODULE ---
function renderCustomers() {
    const tbody = document.getElementById('customerTableBody');
    tbody.innerHTML = '';
    mockData.customers.forEach(c => {
        let row = `<tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.location}</td>
            <td>${c.orders} Orders</td>
            <td>${c.spent.toLocaleString()}đ</td>
            <td><span class="status in-stock">${c.points} pts</span></td>
            <td class="actions">
                <i class="fas fa-eye view" onclick="viewCustomer(${c.id})"></i>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function viewCustomer(id) {
    const c = mockData.customers.find(x => x.id === id);
    if (!c) return;

    document.getElementById('custName').innerText = c.name;
    document.getElementById('custEmail').innerText = c.email;
    document.getElementById('custPoints').innerText = c.points;
    document.getElementById('custNotes').value = c.notes;

    const historyTbody = document.getElementById('custHistory');
    historyTbody.innerHTML = '';
    if(c.history && c.history.length > 0) {
        c.history.forEach(h => {
            historyTbody.innerHTML += `<tr>
                <td>#${h.id}</td>
                <td>${h.date}</td>
                <td>${h.total.toLocaleString()}đ</td>
            </tr>`;
        });
    } else {
        historyTbody.innerHTML = '<tr><td colspan="3">No history found</td></tr>';
    }

    // Save Notes function
    document.getElementById('btnSaveNote').onclick = function() {
        c.notes = document.getElementById('custNotes').value;
        alert('Customer notes saved!');
        closeModal('customerModal');
    };

    openModal('customerModal');
}

// --- HELPERS ---
function deleteItem(type, id) {
    if(confirm('Are you sure you want to delete this item?')) {
        mockData[type] = mockData[type].filter(x => x.id !== id);
        // Re-render based on type
        if(type === 'products') renderProducts();
        if(type === 'orders') renderOrders();
    }
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// --- DASHBOARD CHARTS ---
function renderDashboardCharts() {
    // Chỉ chạy nếu có canvas
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue (VND)',
                data: [1200000, 1900000, 3000000, 5000000, 2000000, 3000000, 4500000],
                borderColor: '#e00d0d',
                tension: 0.4,
                fill: false
            }, {
                label: 'Orders',
                data: [5, 10, 8, 15, 12, 10, 20],
                borderColor: '#1e293b',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
                y1: { position: 'right', beginAtZero: true }
            }
        }
    });
}

// Run init
document.addEventListener('DOMContentLoaded', init);