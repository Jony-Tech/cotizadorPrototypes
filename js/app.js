//constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
function UI(){};
//Llena las opciones de los years
UI.prototype.llenarSelect = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const year = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}
//instanciar UI
const ui = new UI();
console.log(ui)

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarSelect();
})