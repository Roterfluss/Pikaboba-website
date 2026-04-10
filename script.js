// === DỮ LIỆU SẢN PHẨM ===
const produkte = [
  {
    name: "Tapioka Perlen",
    marke: "Boboq",
    kategorie: "topping",
    preis: 45.00,
    einheit: "6 x 3kg"
  },
  {
    name: "Taro Pulver",
    marke: "Possmei",
    kategorie: "pulver",
    preis: 38.50,
    einheit: "10 x 1kg"
  },
  {
    name: "Fruchtsirup",
    marke: "Possmei",
    kategorie: "sirup",
    preis: 32.00,
    einheit: "6 x 2.5kg"
  },
  {
    name: "Popping Boba",
    marke: "Boboq",
    kategorie: "topping",
    preis: 52.00,
    einheit: "4 x 3.2kg"
  },
  {
    name: "Matcha Pulver",
    marke: "Possmei",
    kategorie: "pulver",
    preis: 42.00,
    einheit: "10 x 1kg"
  },
  {
    name: "Brown Sugar Sirup",
    marke: "Boboq",
    kategorie: "sirup",
    preis: 36.00,
    einheit: "6 x 2.5kg"
  }
];

console.log("Produkte geladen:", produkte.length);
// === RENDER SẢN PHẨM ===
            const productGrid =
                document.querySelector(".product-grid");

            function renderProdukte(list) {
              // Xóa nội dung cũ
              productGrid.innerHTML = "";

              // Tạo card cho mỗi sản phẩm
              list.forEach(produkt => {
                  const card = document.createElement("article");
                  card.classList.add("product-card");
                  card.innerHTML = `
                    <h3>${produkt.name}</h3>
                    <p>Marke: ${produkt.marke}</p>
                    <p>Einheit: ${produkt.einheit}</p>
                    <p class="price">ab ${produkt.preis.toFixed(2)} €/Karton</p>
                `;
    productGrid.appendChild(card);
  });
}

// Render lần đầu — hiện tất cả sản phẩm
renderProdukte(produkte);
