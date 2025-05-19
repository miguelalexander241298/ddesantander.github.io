/* Muestro hamburguer */

const hamburguer = document.querySelector('.hamburguer')
const navbar_options = document.querySelector('.navbar_options')
var hamburguer_cont = 0
hamburguer.addEventListener('click', mostrar_navbar);

function mostrar_navbar() {
    if (hamburguer_cont === 0) {
        navbar_options.style.left = '50%'
        hamburguer_cont = 1
    } else {
        navbar_options.style.left = '-50%'
        hamburguer_cont = 0
    }
}

/* Oculto hamburguer cuando clickeo*/

function oculto_navbar() {
    navbar_options.style.left = '-50%'
    hamburguer_cont = 0
}

/* Muestro grajeas segun tipo de dispositivo */

const grajea = document.querySelectorAll('.grajea')
const lista_grajea = [[10, '#5f8ec9', 45], [0, '#87d4de', 20], [30, '#a01919', -20], [30, '#25a019', -40], [60, '#d487de', 15]]

if (window.innerWidth < 600) {
    var const_grajea = 0
    const left_grajea = [20, 50, 35, 10, 10]
    grajea.forEach(element => {
        element.style.left = `${left_grajea[const_grajea]}%`
        element.style.top = `${lista_grajea[const_grajea][0]}%`
        element.style.background = `${lista_grajea[const_grajea][1]}`
        element.style.transform = `rotate(${lista_grajea[const_grajea][2]}deg)`
        const_grajea += 1
    });

} else {
    const left_grajea = [80, 50, 65, 90, 90]
    var const_grajea = 0
    grajea.forEach(element => {
        element.style.left = `${left_grajea[const_grajea]}%`
        element.style.top = `${lista_grajea[const_grajea][0]}%`
        element.style.background = `${lista_grajea[const_grajea][1]}`
        element.style.transform = `rotate(${lista_grajea[const_grajea][2]}deg)`
        const_grajea += 1
    });
}

/* Trabajo con las diferentes ventanas */

const window_princ = document.querySelector('.window_princ')
const window_flanes = document.querySelector('.window_flanes')
const window_pasteles = document.querySelector('.window_pasteles')
const window_otros = document.querySelector('.window_otros')

function mostrar_home() {
    window.scrollTo({ top: 0 })
    window_princ.style.display = 'inline'
    window_flanes.style.display = 'none'
    window_pasteles.style.display = 'none'
    window_otros.style.display = 'none'
}

function mostrar_dispensa_1() {
    window.scrollTo({ top: 0 })
    window_princ.style.display = 'none'
    window_flanes.style.display = 'inline'
    window_pasteles.style.display = 'none'
    window_otros.style.display = 'none'
}

function mostrar_dispensa_2() {
    window.scrollTo({ top: 0 })
    window_princ.style.display = 'none'
    window_flanes.style.display = 'none'
    window_pasteles.style.display = 'inline'
    window_otros.style.display = 'none'
}

function mostrar_dispensa_3() {
    window.scrollTo({ top: 0 })
    window_princ.style.display = 'none'
    window_flanes.style.display = 'none'
    window_pasteles.style.display = 'none'
    window_otros.style.display = 'inline'
}

/* Trabajo con el constructor para dispensa */

/* Constructor de cuerpo de dispensas */
function const_cuerpo([nombre, precio, foto, id]) {
    let nombreApp = document.createElement('div');
    nombreApp.className = `product_cont ${id}`
    nombreApp.innerHTML = `<h2>${nombre}</h2>
                    <img src="resources/${foto}.webp">
                    <div class="product_cont_pie">
                        <h3>$${precio}</h3>
                        <button class="button_carrito" onclick="agregar_carrito(event)" id="${id}">Compro</button>
                    </div>`
    return nombreApp
}

/* Constructor de agregar al carrito */
function agrego_items([foto, precio, id, nombre]) {
    let nombreApp = document.createElement('div');
    nombreApp.className = `cont_compra ${id}`
    nombreApp.innerHTML = `
            <img src="${foto}" alt="${nombre}">
            <div>
                <p class="importe_parcial">${precio}</p>
                <button id='${id}' onclick="elimino_item(event)">Cancelar</button>
            </div>`
    agrego_info_ok('Añadido al carrito')
    return nombreApp
}

/* Constructor de contenedor informativo */
function agrego_info(texto) {
    let nombreApp = document.createElement('section');
    nombreApp.className = `informativo`
    nombreApp.innerHTML = `
            <div class="informativo_div">
                <p class="informativo_text">${texto}</p>
            </div>`
    document.body.appendChild(nombreApp)
    document.querySelector('.informativo_text').textContent = texto
    setTimeout(() => {
        document.body.removeChild(nombreApp)
    }, 4000);
}

function agrego_info_ok(texto) {
    let nombreApp = document.createElement('section');
    nombreApp.className = `informativo`
    nombreApp.innerHTML = `
            <div class="informativo_div informativo_div_ok">
                <p class="informativo_text informativo_text_ok">${texto}</p>
            </div>`
    document.body.appendChild(nombreApp)
    document.querySelector('.informativo_text').textContent = texto
    setTimeout(() => {
        document.body.removeChild(nombreApp)
    }, 4000);
}

const cart_container = document.querySelector('.cart_container')
const contador_cart = document.querySelector('.contador_cart')
const window_carrito = document.querySelector('.window_carrito')
const control_peticion = document.querySelector('.control_peticion')

let cont = 0
function agregar_carrito(event) {
    cart_container.style.transform = 'scale(1)'
    contador_cart.style.display = 'flex'
    contador_cart.textContent = window_carrito.children[0].childElementCount - 1

    const item_selected = document.querySelector(`.${event.target.id}`)
    window_carrito.children[0].appendChild(agrego_items([item_selected.children[1].src, item_selected.children[2].children[0].textContent, `item_${cont}`, item_selected.children[0].textContent]))
    cont += 1

    total_pagar()
}

function aparecer_compra() {
    window_carrito.style.display = 'flex'
    contador_cart.style.display = 'none'
}

function ocultar_compra() {
    window_carrito.style.display = 'none'
}

function elimino_item(event) {
    const contenedor = document.querySelector(`.${event.target.id}`)
    window_carrito.children[0].removeChild(contenedor)
    if (window_carrito.children[0].childElementCount == 2) {
        window_carrito.style.display = 'none'
    }

    total_pagar()
}

const total_a_pagar = document.querySelector('.total_a_pagar')
function total_pagar() {
    let total = 0
    const importe_parcial = document.querySelectorAll('.importe_parcial')
    importe_parcial.forEach(e => {
        total += Number(e.textContent.substring(1, e.textContent.length));
    });
    total_a_pagar.textContent = total
}

function enviar_pedido() {
    if (window_carrito.children[0].childElementCount != 2) {
        window_carrito.style.display = 'none'
        control_peticion.style.display = 'flex'
    }
}

const peticion_direccion = document.querySelector('.peticion_direccion')
function mostrar_direccion(event) {
    if (event.target.checked) {
        peticion_direccion.style.display = 'inline'
    } else {
        peticion_direccion.style.display = 'none'
    }
}

function desaparecer_control() {
    control_peticion.style.display = 'none'
}

function const_whatsapp(pedido, dia, direccion) {
    let texto = 'https://wa.me/5355580762?text='
    function total_a_pagar() {
        let total = 0
        const importe_parcial = document.querySelectorAll('.importe_parcial')
        importe_parcial.forEach(e => {
            total += Number(e.textContent.substring(1, e.textContent.length));
        });
        return total
    }
    if (direccion == '') {
        texto += `%2APedido%3A%2A%0A${pedido}%0A%2ADia%20de%20encarga%3A%2A%0A${dia}%0A%0A%2ATOTAL%3A%2A%20%24${total_a_pagar()}%0A%0A%2AConfirmación%20en%20proceso%20%2E%2E%2E%2A`
        return texto
    } else {
        texto += `%2APedido%3A%2A%0A${pedido}%0A%2ADia%20de%20encarga%3A%2A%0A${dia}%0A%2ACon%20domicilio%20a%3A%2A%0A${direccion}%0A%0A%2ATOTAL%3A%2A%20%24${total_a_pagar() + 250}%0A%0A%2AConfirmación%20en%20proceso%20%2E%2E%2E%2A`
        return texto
    }
}

function envio_whatsapp() {
    const domicilio = 'Con domicilio'
    const peticion_fecha = document.querySelector('.date').value.replaceAll('-', '%2D').replaceAll('/', '%2F').replaceAll(' ', '%20').replaceAll('.', '%2E')
    const direccion = document.querySelector('.peticion_direccion').value
    const items = document.querySelectorAll('.cont_compra')

    if (peticion_fecha == '') {
        agrego_info('Ingrese la fecha para su pedido')
    } else {
        let pedidos = ''
        items.forEach(element => {
            pedidos += `${element.children[0].alt} por ${element.children[1].children[0].textContent.substring(1, element.children[1].children[0].textContent.length)}%0A`.replaceAll(' ', '%20')
        });
        if (peticion_direccion.style.display === 'inline') {
            if (direccion == '') {
                agrego_info('Inserte la direccion')
            } else {
                let const_fecha = `${direccion}`.replaceAll(' ', '%20').replaceAll('#', '%23').replaceAll('.', '%2E')
                const referencia = const_whatsapp(pedidos, peticion_fecha, const_fecha)
                open(referencia)
            }
        } else {
            const referencia = const_whatsapp(pedidos, peticion_fecha, '')
            open(referencia)
        }
    }
}

const lista_items_flanes = [
    ['Flan Cubierto de fanguito con decoracion de Nutella', 2300, 'flan_1', 'a1'],
    ['ConfiFlan', 2800, 'flan_2', 'a2'],
    ['Flan Natural', 1500, 'flan_3', 'a3'],
    ['Flan Santander', 3500, 'flan_4', 'a4'],
    ['NuteGallets', 2000, 'flan_5', 'a5'],
    ['ConfiFlan', 2800, 'flan_7', 'a7'],
    ['Flan Crema 3 Leches Extragrande', 2500, 'flan_8', 'a8'],
    ['Flan con Decoracion de Galletas y Nutella', 1800, 'flan_9', 'a9'],
    ['Flan Cubierto de Nutella', 3000, 'flan_10', 'a10']
]

const lista_items_pasteles = [
    ['Pastel cubierto de Chocolate', 2500, 'pastel_1', 'b1'],
    ['Pastel Beso del Cielo', 6000, 'pastel_2', 'b2'],
    ['Pastel 3 leches', 4000, 'pastel_3', 'b3'],
    ['Pastel Simple', 2000, 'pastel_4', 'b4'],
    ['Pastel de Merengue', 2500, 'pastel_6', 'b6'],
    ['Pastel Simple', 2800, 'pastel_7', 'b7'],
    ['Pastel Pequeño', 1500, 'pastel_8', 'b8'],
    ['Pastel cubierto de Chocolate', 2800, 'pastel_9', 'b9'],
    ['Pastel Húmedo', 2500, 'pastel_10', 'b10'],
    ['Pastel Simple Grande', 3000, 'pastel_11', 'b11'],
    ['Pastel de Fanguito', 3000, 'pastel_12', 'b12']
]

const lista_items_otros = [
    ['Donut\'s cubiertas de Nutella', 100, 'otros_1', 'c1'],
    ['Besos del Cielo', 550, 'otros_2', 'c2'],
    ['Donut\'s de Azúcar', 70, 'otros_3', 'c3'],
    ['Flan con Panetela Decorado', 3000, 'otros_4', 'c4'],
    ['Torta Humeda de Chocolate', 2000, 'otros_5', 'c5']
]

let dispensa_prod = document.querySelector('.dispensa_prod');
let dispensa_prod_pasteles = document.querySelector('.dispensa_prod_pasteles');
let dispensa_prod_otros = document.querySelector('.dispensa_prod_otros');

lista_items_flanes.forEach(element => {
    dispensa_prod.appendChild(const_cuerpo(element))
});

lista_items_pasteles.forEach(element => {
    dispensa_prod_pasteles.appendChild(const_cuerpo(element))
});

lista_items_otros.forEach(element => {
    dispensa_prod_otros.appendChild(const_cuerpo(element))
});
