const add = document.getElementById('add-user');
const main = document.getElementById('main');
const double = document.getElementById('double');
const show = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const total = document.getElementById('calculate-wealth');

let data = JSON.parse(localStorage.getItem('users')) || [];

const updateLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(data));
}

const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api');
    const result = await res.json();
    const random = result.results[0].name;

    const name = Object.values(random).slice(1).join(' ');
    const wealth = getRandomWealth();
    const obj = {
        fullName: name,
        wealth: `${wealth}`
    }
    addPerson(obj);
}

const doubleWealth = () => {
    data = data.map(person => {
        return { ...person, wealth: parseFloat(person.wealth) * 2 };
    });
    updateDom();
    updateLocalStorage();
}

const getRandomWealth = () => {
    const randomAmount = Math.floor(Math.random() * 100000);
    return randomAmount;

}

const addPerson = (obj) => {
    data.push(obj);

    updateDom();

}

const showOnlyMilionaires = () => {
    data = data.filter((person) => {
        const oneMillionDollars = 1000000.00;
        return person.wealth > oneMillionDollars
    });
    updateDom();
    updateLocalStorage();
}

const sortByRichest = () => {
    data.sort((a, b) => {
        return b.wealth - a.wealth;
    });

    updateDom();
    updateLocalStorage();
}

const calculateEntireWealth = () => {
    const total = data.reduce((acc, curr) => acc + Number(curr.wealth), Number(data[0].wealth));
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const entire = `<div class="total">
            <h3>Total Wealth: <strong>${USDollar.format(total)}</strong></h3>
        </div>`;
    main.insertAdjacentHTML('beforeend', entire);
}

const updateDom = (provided = data) => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    provided.forEach(person => {
        main.innerHTML += `
            <div class="person"><strong>${person.fullName}</strong> ${USDollar.format(person.wealth)}</div>
            `
    })
}

updateDom(data);

total.addEventListener('click', calculateEntireWealth)
sort.addEventListener('click', sortByRichest)
double.addEventListener('click', doubleWealth);
add.addEventListener('click', getRandomUser);
show.addEventListener('click', showOnlyMilionaires);
// double.addEventListener('click', doubleWealth)