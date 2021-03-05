const total = document.getElementById("total");
let price = document.querySelector(".price");
let quantity = document.querySelector(".quantity");
console.log(total, price, quantity);

let newQuantity = parseInt(quantity.innerHTML);
let newPrice = parseInt(price.innerHTML);

console.log(newQuantity, newPrice);

window.onload = getMoney();

function getMoney() {
  const newTotal = newQuantity * newPrice;
  total.innerHTML = `$${newTotal}`;
}
