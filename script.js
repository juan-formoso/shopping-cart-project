function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', () => {
      const id = e.parentNode.firstChild.innerText;
      const url = `https://api.mercadolibre.com/items/${id}`;
      fetch(url)
      .then((val) => val.json())
      .then((value3) => createCartItemElement({ sku: value3.id,
        name: value3.title,
        salePrice: value3.price }));
    });
  }
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const itemSection = document.querySelector('.items');
  itemSection.appendChild(section);
  return section;
}

function getAPI(api) {
  const itens = api.results.reduce((acc, current) => {
    acc.push({ sku: current.id,
    name: current.title,
    image: current.thumbnail });
    return acc;
  }, []);
  return itens;
}

function product() {
  const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetch(apiURL)
    .then((parameter) => parameter.json())
    .then((value) => getAPI(value))
    .then((val) => val.forEach((value2) => createProductItemElement(value2))); 
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const cart = document.querySelector('.cart__items');
  cart.appendChild(li);
  return li;
}

window.onload = () => {
  product();
};
