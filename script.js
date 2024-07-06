const body = document.getElementById("tablebody");

async function fetchData() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await response.json();
        display(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function display(data) {
    body.innerHTML = '';
    data.forEach(element => {
        const tdDataRow = document.createElement('tr');
        const symbolUpperCase = element.symbol.toUpperCase();
        const price_change_24h = parseFloat(element.price_change_24h).toFixed(2);
        tdDataRow.innerHTML = `
            <td>
                <div class="coin-img">
                    <img src="${element.image}" alt="${element.name} logo" />
                    <div class="coin-name">${element.name}</div>
                </div>
            </td>
            <td>${symbolUpperCase}</td>
            <td>${element.current_price}</td>
            <td>${element.total_volume}</td>
            <td class="percentage_change">${price_change_24h}%</td>
            <td>Mkt Cap: ${element.market_cap}</td>
        `;
        body.appendChild(tdDataRow);
        const tdDataCel = tdDataRow.querySelector('.percentage_change');
        tdDataCel.style.color = price_change_24h < 0 ? 'red' : 'green';
    });
}

function searchdata(term) {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const filterdata = data.filter(item => {
                return item.name.toLowerCase().includes(term.toLowerCase()) ||
                    item.symbol.toLowerCase().includes(term.toLowerCase());
            });
            body.innerHTML = '';
            display(filterdata);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.getElementById('searchbar').addEventListener('keyup', function (event) {
    const searchTerm = event.target.value;
    searchdata(searchTerm);
});

document.getElementById('marketcap-btn').addEventListener('click', function() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const sorteddata = data.sort((a, b) => b.market_cap - a.market_cap);
            body.innerHTML = '';
            display(sorteddata);
        });
});

document.getElementById('percentage-btn').addEventListener('click', function() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const sortedper = data.sort((a, b) => b.price_change_24h - a.price_change_24h);
            body.innerHTML = '';
            display(sortedper);
        });
});

fetchData();