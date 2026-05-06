/* script.js */
let transactions = JSON.parse(localStorage.getItem('hishab_data')) || [];

function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === 'income') income += parseFloat(t.amount);
        else expense += parseFloat(t.amount);
    });

    document.getElementById('total-income').innerText = income;
    document.getElementById('total-expense').innerText = expense;
    document.getElementById('total-balance').innerText = income - expense;
    
    renderList();
}

function renderList() {
    const listContainer = document.getElementById('transaction-list');
    listContainer.innerHTML = '';

    if (transactions.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">কোন লেনদেন নেই</p>';
        return;
    }

    transactions.reverse().forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'feature-item';
        item.innerHTML = `
            <div class="icon-box">${t.type === 'income' ? '৳' : '▼'}</div>
            <div style="flex-grow: 1;">
                <div style="font-weight: 600;">${t.title}</div>
                <div style="font-size: 12px; color: #888;">${t.date}</div>
            </div>
            <div style="font-weight: bold; color: ${t.type === 'income' ? '#10B981' : '#EF4444'}">
                ${t.type === 'income' ? '+' : '-'}${t.amount}
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function addData() {
    const title = prompt("বিবরণ দিন (যেমন: দোকানের নাম বা আয়):");
    const amount = prompt("টাকার পরিমাণ:");
    const type = confirm("এটি কি 'আয়'? (Cancel দিলে 'ব্যয়' হিসেবে সেভ হবে)") ? 'income' : 'expense';

    if (title && amount) {
        const newData = {
            title,
            amount: parseFloat(amount),
            type,
            date: new Date().toLocaleDateString('bn-BD')
        };
        transactions.push(newData);
        localStorage.setItem('hishab_data', JSON.stringify(transactions));
        updateSummary();
    }
}

// Initial Call
updateSummary();
