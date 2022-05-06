//constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europe 1.35    */
    const base = 2000;
    let cantidad;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    //leer el a=year
    const diferencia = new Date().getFullYear() - this.year;

    //Cada year que la diferencias es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad)/ 100;

    /*
    si el seguro es basico se multiplica por un 30% mas 
    si el seguro es completo se multiplica por un 50% mas
    */
   if(this.tipo === 'basico'){
       cantidad *= 1.30
   }else {
       cantidad *= 1.50
   }
   return cantidad;
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
//Muestra alertas en pantalla 
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);
}
UI.prototype.mostrarResultado = (total, seguro) => {
    //crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    const {marca, year, tipo} = seguro;
    let textomarca;
    switch (marca) {
        case '1':
            textomarca = 'Americano';
            break;
        case '2':
            textomarca = 'Asiatico';
            break;
        case '3':
            textomarca='Europeo';
            break;
    
        default:
            break;
    }
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class ="font-bold">Marca: <span class="font-normal"> ${textomarca}</span></p>
        <p class ="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class ="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class ="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
        `
    const resultadoDiv = document.querySelector('#resultado');
    

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //se borra el spinner
        resultadoDiv.appendChild(div); // se muestra el resultado
    }, 3000);
}
//instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarSelect(); //llena el select con los years
});

registrarAddEvent();
function registrarAddEvent(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca
    const marca = document.querySelector('#marca').value;
    //leer year
    const year = document.querySelector('#year').value;
    //seleccionar el tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');

    //ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados !== null){
        resultados.remove();
    }

    //Instanciar
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype
    ui.mostrarResultado(total, seguro);
}