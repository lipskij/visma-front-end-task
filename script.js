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
}

function addToSessionStorage(pizza) {
  let pizzas = loadItem();
  pizzas.push(pizza);
  sessionStorage.setItem("pizzas", JSON.stringify(pizzas));
}

function loadItem() {
  return JSON.parse(sessionStorage.getItem("pizzas")) || [];
}
