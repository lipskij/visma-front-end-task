const submitForm = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const errMessage = document.querySelector(".no-error");
const uniqueName = document.getElementById("unique");
const deleteButton = document.querySelector(".delete-item");

const heat = [inputs[2], inputs[3], inputs[4]];
const toppings = [
  inputs[5],
  inputs[6],
  inputs[7],
  inputs[8],
  inputs[9],
  inputs[10],
];
const photos = [inputs[11], inputs[12], inputs[13], inputs[14]];

submitForm.addEventListener("submit", handleSubmit);
const pizzas = loadItem();
updateMenu(pizzas);

function photoCheckBox() {
  return photos.map((i) => (i.checked ? i.value : ""));
}

function toppingsCheckBox() {
  return toppings.map((i) => (i.checked ? i.value : "")).filter(Boolean);
}

function heatCheckBox() {
  return heat.map((i) => (i.checked ? i.value : "")).join("");
}

function handleSubmit(e) {
  e.preventDefault();

  const pizza = {
    name: document.querySelector(".name").value,
    price: document.querySelector(".price").value,
    heat: heatCheckBox(),
    toppings: toppingsCheckBox(),
    photo: photoCheckBox(),
    createdAt: new Date().toISOString(),
  };

  addToSessionStorage(pizza);
  e.target.reset();
  updateMenu(loadItem());
}

function addToSessionStorage(pizza) {
  let pizzas = loadItem();
  pizzas.push(pizza);
  sessionStorage.setItem("pizzas", JSON.stringify(pizzas));
}

function loadItem() {
  return JSON.parse(sessionStorage.getItem("pizzas")) || [];
}

inputs[0].addEventListener("change", nameInputCheck);

function nameInputCheck() {
  if (inputs[0].value.length > 30) {
    document.querySelector(".form-btn").disabled = true;
    errMessage.className = "error";
  } else {
    errMessage.className = "no-error";
    document.querySelector(".form-btn").disabled = false;
  }
  uniqueNameCheck();
}

function uniqueNameCheck() {
  const pizzas = loadItem();
  if (pizzas.length === 0) {
    return;
  }
  const pizzaName = pizzas.map((i) => i.name);
  if (pizzaName.includes(inputs[0].value)) {
    uniqueName.classList.toggle("error");
    document.querySelector(".form-btn").disabled = true;
  } else {
    uniqueName.className = "no-error";
    document.querySelector(".form-btn").disabled = false;
  }
}

function updateMenu(pizzas = []) {
  const existingList = document.querySelector(".list-div");
  if (existingList) {
    existingList.innerHTML = "";
  }

  const list = existingList || document.createElement("div");

  const items = pizzas
    .map(
      (pizza) => `
      <li>Name: ${pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)} ${
        pizza.heat
      }<br></br>
      Price: ${pizza.price}<br></br>
      Toppings: ${pizza.toppings} <br></br>
      <div class='image-div'>${pizza.photo
        .map((i) => (i ? `<img src='./images/${i}.svg' />` : ""))
        .join("")}
      </div>
      <div class='delete-btn'><button id=${
        pizza.name
      } class='delete-session'>Delete</button></div>
      </li>`
    )
    .join("");
  list.innerHTML = "";
  list.innerHTML = `<ul class='list'>${items}</ul>`;

  document.body.append(list);
}
