import { Gift } from "./clases.js";

const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

let idGiftUpdate = null;


const cargarDatosDesdeLocalStorage = () => {
  const datos = JSON.parse(localStorage.getItem('giftCards')) || [];

 
  if (datos.length === 0) {
    const datosPredeterminados = [
      {
        "id": 1,
        "gift": "Spotify Premium",
        "tipo": "Suscripción",
        "tiempo": "1 mes",
        "precio": 250,
        "imagen": "https://http2.mlstatic.com/D_NQ_NP_714537-MLA53061400161_122022-V.jpg"
      },
      {
        "id": 2,
        "gift": "XBOX Game Pass Ultimate",
        "tipo": "Suscripción",
        "tiempo": "1 mes",
        "precio": 300,
        "imagen": "https://http2.mlstatic.com/D_NQ_NP_991054-MLA44207335557_112020-O.jpg"
      },
      {
        "id": 3,
        "gift": "HBO Max",
        "tipo": "Suscripción",
        "tiempo": "1 mes",
        "precio": 290,
        "imagen": "https://i0.wp.com/fhalcongaming.com/wp-content/uploads/2021/07/GIFTC0109_1.png?fit=1080%2C1080&ssl=1"
      }
 
    ];
    localStorage.setItem('giftCards', JSON.stringify(datosPredeterminados));
    return datosPredeterminados;
  }

  return datos;
};

const datos = cargarDatosDesdeLocalStorage();


const guardarDatosEnLocalStorage = (nuevosDatos) => {
  localStorage.setItem('giftCards', JSON.stringify(nuevosDatos));
};

window.mostrarModal = (id) => {
  console.log(id);
  idGiftUpdate = id;
  let index = datos.findIndex((item) => item.id == idGiftUpdate);

  document.querySelector("#giftModal").value = datos[index].gift;
  document.querySelector("#tipoModal").value = datos[index].tipo;
  document.querySelector("#tiempoModal").value = datos[index].tiempo;
  document.querySelector("#precioModal").value = datos[index].precio;
  document.querySelector("#imagenModal").value = datos[index].imagen;

  myModal.show();
};

const giftUpdate = (e) => {
  e.preventDefault();
  let index = datos.findIndex((item) => item.id == idGiftUpdate);
  datos[index].gift = document.querySelector("#giftModal").value;
  datos[index].tipo = document.querySelector("#tipoModal").value;
  datos[index].tiempo = document.querySelector("#tiempoModal").value;
  datos[index].precio = document.querySelector("#precioModal").value;
  datos[index].imagen = document.querySelector("#imagenModal").value;

  cargarTabla();
  myModal.hide();

 
  guardarDatosEnLocalStorage(datos);
};

const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";
  datos.map((item) => {
    const fila = document.createElement("tr");

    const celdas = `<th>${item.gift}</th>
        <td>${item.tipo}</td>
        <td>${item.tiempo}</td>
        <td>${item.precio}</td>
        <td><img src="${item.imagen}" width="100px" height="100%" /></td>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class="btn btn-outline-danger" onclick="borrarGift(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        </td>
        `;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};

const agregarGift = (event) => {
  event.preventDefault();

  let id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
  let gift = document.querySelector("#gift").value;
  let tipo = document.querySelector("#tipo").value;
  let tiempo = document.querySelector("#tiempo").value;
  let precio = document.querySelector("#precio").value;
  let imagen = document.querySelector("#imagen").value;

  datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
  document.querySelector("#formGift").reset();
  cargarTabla();

 
  guardarDatosEnLocalStorage(datos);
};

window.borrarGift = (id) => {
  let index = datos.findIndex((item) => item.id == id);

  let validar = confirm(
    'Está seguro/a que quiere eliminar la gift card ${datos[index].gift}?'
  );

  if (validar) {
    datos.splice(index, 1);
    cargarTabla();

    
    guardarDatosEnLocalStorage(datos);
  }
};

cargarTabla();

document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector("#formModal").addEventListener("submit", giftUpdate);