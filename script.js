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
// === FILTER THEO MARKE ===
const filterButtons =
  document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Cập nhật nút active
    filterButtons.forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    // Lọc sản phẩm
    const filter = btn.dataset.filter;

    if (filter === "alle") {
      renderProdukte(produkte);
    } else {
      const filtered = produkte.filter(
        p => p.marke === filter
      );
      renderProdukte(filtered);
    }
  });
});
// === TÌM KIẾM REALTIME ===
const searchInput =
  document.querySelector("#search");

searchInput.addEventListener("input", () => {
  const query = searchInput.value
    .toLowerCase()
    .trim();

  const results = produkte.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.marke.toLowerCase().includes(query) ||
    p.kategorie.toLowerCase().includes(query)
  );

  renderProdukte(results);

  // Reset filter buttons về "Alle"
  filterButtons.forEach(b =>
    b.classList.remove("active")
  );
  document.querySelector('[data-filter="alle"]')
    .classList.add("active");
});
// === BESTELLRECHNER ===

// Chọn các phần tử HTML
const produktSelect = document.querySelector("#r-produkt");   // Dropdown sản phẩm
const mengeInput = document.querySelector("#r-menge");         // Ô nhập số lượng
const addBtn = document.querySelector("#add-item");            // Nút thêm
const warenkorbEl = document.querySelector("#warenkorb");      // Danh sách đã thêm
const subtotalEl = document.querySelector("#subtotal");        // Hiện tổng phụ
const versandEl = document.querySelector("#versand");          // Hiện phí vận chuyển
const gesamtEl = document.querySelector("#gesamt");            // Hiện tổng cộng
const hinweisEl = document.querySelector("#versand-hinweis");  // Hiện ghi chú

// Hằng số
const FREI_VERSAND = 3500;    // Ngưỡng miễn phí vận chuyển
const VERSAND_KOSTEN = 29.90; // Phí vận chuyển nếu chưa đạt ngưỡng

// Mảng lưu các sản phẩm đã thêm vào giỏ
const warenkorb = [];

// Tạo danh sách sản phẩm trong dropdown
// forEach duyệt qua từng sản phẩm, i là index (vị trí)
produkte.forEach((p, i) => {
  const option = document.createElement("option"); // Tạo thẻ <option>
  option.value = i;                                 // Giá trị = vị trí trong mảng
  option.textContent = `${p.name} (${p.preis.toFixed(2)} €/Karton)`; // Text hiển thị
  produktSelect.appendChild(option);                // Thêm vào dropdown
});

// Khi bấm nút "+ Hinzufügen"
addBtn.addEventListener("click", () => {
  const index = parseInt(produktSelect.value);  // Lấy vị trí sản phẩm được chọn
  const menge = parseInt(mengeInput.value) || 1; // Lấy số lượng, mặc định 1
  const p = produkte[index];                     // Lấy object sản phẩm từ mảng

  // Thêm vào giỏ hàng
  warenkorb.push({
    name: p.name,
    preis: p.preis,
    menge: menge,
    summe: p.preis * menge  // Tính tiền = giá x số lượng
  });

  mengeInput.value = 1;  // Reset ô số lượng về 1
  renderWarenkorb();      // Cập nhật hiển thị
});

// Xóa sản phẩm khỏi giỏ theo vị trí
// splice(i, 1) = xóa 1 phần tử tại vị trí i
function entfernen(i) {
  warenkorb.splice(i, 1);
  renderWarenkorb();  // Cập nhật lại hiển thị
}

// Hiển thị giỏ hàng + tính tổng
function renderWarenkorb() {
  warenkorbEl.innerHTML = "";  // Xóa nội dung cũ

  // Tạo 1 dòng cho mỗi sản phẩm trong giỏ
  warenkorb.forEach((item, i) => {
    const row = document.createElement("div");
    row.classList.add("warenkob-item");
    row.innerHTML = `
      <span class="item-info">${item.menge}x ${item.name}</span>
      <span class="item-preis">${item.summe.toFixed(2).replace(".", ",")} €</span>
      <button class="remove-btn" onclick="entfernen(${i})">✕</button>
    `;
    // replace(".", ",") đổi dấu chấm thành phẩy theo chuẩn Đức
    warenkorbEl.appendChild(row);
  });

  // reduce: cộng tất cả item.summe lại, bắt đầu từ 0
  const sub = warenkorb.reduce((sum, item) => sum + item.summe, 0);

  // Nếu tổng >= 3500 → miễn phí, nếu không → 29.90€
  const versand = sub >= FREI_VERSAND ? 0 : VERSAND_KOSTEN;

  // Tổng cộng = tổng phụ + phí vận chuyển
  const gesamt = sub + versand;

  // Cập nhật hiển thị trên trang
  subtotalEl.textContent = sub.toFixed(2).replace(".", ",") + " €";
  versandEl.textContent = versand === 0
    ? "KOSTENLOS"  // Nếu miễn phí → hiện "KOSTENLOS"
    : versand.toFixed(2).replace(".", ",") + " €";
  gesamtEl.textContent = gesamt.toFixed(2).replace(".", ",") + " €";

  // Hiện ghi chú vận chuyển
  if (versand === 0) {
    hinweisEl.textContent = "✓ Kostenloser Versand ab 3.500 €!";
    versandEl.style.color = "#047857";  // Màu xanh
  } else if (sub > 0) {
    // Tính còn thiếu bao nhiêu để được miễn phí
    const noch = FREI_VERSAND - sub;
    hinweisEl.textContent = `Noch ${noch.toFixed(2).replace(".", ",")} € bis kostenloser Versand`;
    versandEl.style.color = "";  // Reset màu
  } else {
    // Giỏ trống → xóa ghi chú
    hinweisEl.textContent = "";
    versandEl.style.color = "";
  }
}
// === FORM HANDLING ===
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Ngăn trang reload

  // Lấy giá trị từ các ô input
  const firma = document.querySelector("#firma").value.trim();
  const email = document.querySelector("#email").value.trim();
  const land = document.querySelector("#land").value;
  const nachricht = document.querySelector("#nachricht").value.trim();

  // Validation — kiểm tra từng ô
  if (!firma) {
    alert("Bitte geben Sie Ihren Firmennamen ein.");
    document.querySelector("#firma").focus();
    return; // Dừng, không chạy tiếp
  } // end of if firma

  if (!email || !email.includes("@")) {
    alert("Bitte geben Sie eine gültige E-Mail ein.");
    document.querySelector("#email").focus();
    return;
  } // end of if email

  if (!land) {
    alert("Bitte wählen Sie ein Land.");
    document.querySelector("#land").focus();
    return;
  } // end of if land

  // Lấy tên hiển thị của land (vd: "Deutschland" thay vì "de")
  const landName = document.querySelector("#land")
    .selectedOptions[0].textContent;

  // In ra Console để debug
  console.log("=== Neue Anfrage ===");
  console.log(`Firma: ${firma}`);
  console.log(`E-Mail: ${email}`);
  console.log(`Land: ${landName}`);
  console.log(`Nachricht: ${nachricht || "(keine)"}`);

  // Hiện thông báo thành công
  alert(
    `Vielen Dank, ${firma}!\n\n` +
    `Wir haben Ihre Anfrage erhalten ` +
    `und melden uns innerhalb von 24 Stunden.\n\n` +
    `Zusammenfassung:\n` +
    `Land: ${landName}\n` +
    `E-Mail: ${email}`
  );

  contactForm.reset(); // Xóa sạch form
}); // end of addEventListener submit

// === NGÔN NGỮ ===
const translations = {
  de: {
    hero: "Ihr zuverlässiger Bubble Tea Großhändler in der DACH-Region",
    heroSub: "Über 200 B2B-Kunden vertrauen uns. Premium-Marken Boboq & Possmei — direkt ab Lager Stuttgart.",
    cta: "Jetzt Angebot anfragen",
    produkte: "Unsere Produkte",
    vorteile: "Warum PikaBoba?",
    kontakt: "Kontaktieren Sie uns",
    senden: "Anfrage senden",
    navProdukte: "Produkte",
    navVorteile: "Vorteile",
    navKontakt: "Kontakt"
  },
  en: {
    hero: "Your Reliable Bubble Tea Wholesaler in the DACH Region",
    heroSub: "Over 200 B2B customers trust us. Premium brands Boboq & Possmei — shipped directly from our Stuttgart warehouse.",
    cta: "Request a Quote",
    produkte: "Our Products",
    vorteile: "Why PikaBoba?",
    kontakt: "Contact Us",
    senden: "Send Inquiry",
    navProdukte: "Products",
    navVorteile: "Benefits",
    navKontakt: "Contact"
  },
  vi: {
    hero: "Nhà phân phối Bubble Tea uy tín tại khu vực DACH",
    heroSub: "Hơn 200 khách hàng B2B tin tưởng. Thương hiệu cao cấp Boboq & Possmei — giao trực tiếp từ kho Stuttgart.",
    cta: "Yêu cầu báo giá",
    produkte: "Sản phẩm",
    vorteile: "Tại sao chọn PikaBoba?",
    kontakt: "Liên hệ",
    senden: "Gửi yêu cầu",
    navProdukte: "Sản phẩm",
    navVorteile: "Ưu điểm",
    navKontakt: "Liên hệ"
  }
}; // end of translations

const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    langButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    const t = translations[lang];

    document.querySelector("#hero h1").textContent = t.hero;
    document.querySelector(".hero-sub").textContent = t.heroSub;
    document.querySelector(".cta-button").textContent = t.cta;
    document.querySelector("#produkte h2").textContent = t.produkte;
    document.querySelector("#kontakt h2").textContent = t.kontakt;
    document.querySelector(".contact-form button").textContent = t.senden;

    const vorteilH2 = document.querySelector("#vorteile h2");
    if (vorteilH2) {
      vorteilH2.textContent = t.vorteile;
    } // end of if vorteilH2
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks[0].textContent = t.navProdukte;
    navLinks[1].textContent = t.navVorteile;
    navLinks[2].textContent = t.navKontakt;

    console.log("Sprache:", lang);
  }); // end of addEventListener click
}); // end of forEach langButtons