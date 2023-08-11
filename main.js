const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

//İzleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//Toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

//Harcama oluşturma
function addExpense(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Ürün ve Fiyat Bilgisini Lütfen Tamalayınız!");
    return;
  }
  //div oluşturma
  const harcamaDiv = document.createElement("div");
  //class ekleme
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }
  //içerik oluşturma
  harcamaDiv.innerHTML = `
  
  ><h2>${harcamaInput.value}</h2>
  ><h2 id="value">${fiyatInput.value} <h1> &#8378;<h1/> </h2> 
  <div class="buttons">
    <img id="payment" src="images/wallet.png"> |
    <img id="remove" src="images/delete.png">
  <div/>
  `;
  //oluşan harcamayı html'e gönderme
  liste.appendChild(harcamaDiv);

  //toplamı güncelle
  updateToplam(fiyatInput.value);

  //formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//listeye tıklanma olayını yönetme
function handleClick(e) {
  //tıklanılan elemanı alma
  const element = e.target;
  if (element.id === "remove") {
    //tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;
    //silinin elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);
    //silinenin fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));
    //kapyasıcıyı htmlden silme
    wrapperElement.remove();
  }
}

//filtreleme işlemi
function handleFilter(e) {
  console.log(e.target.value);
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
