const priceRange = document.getElementById('priceRange');
const dollarsText = document.querySelector('.dollars')
priceRange.addEventListener('input', (e) => updatePrice(e.target.value))

const updatePrice = (priceInCents) => {
    const dollars = Math.floor(priceInCents / 100).toString().padStart(2, '0');
    const cents = (priceInCents % 100).toString().padStart(2, '0')
    const price = `${dollars}.${cents}`;
    dollarsText.innerText = price;
}


