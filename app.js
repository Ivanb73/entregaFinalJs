const btn_form = document.getElementById("form-control");
const form_modal = document.getElementById("form-modal");
const window_modal = document.querySelector(".modal");
const container = document.getElementById("container");
const GlobalLocalStore = JSON.parse(localStorage.getItem("Payments"));


form_modal.addEventListener("submit", (e) => {
  e.preventDefault();
  AgregarMonto();
  window_modal.style.display = "none";
  capturar_total();
});

//agregandoMonto
const AgregarMonto = () => {
  let money = document.getElementById("money").value;
  localStorage.setItem("Monto", JSON.stringify(money));
};

//formularioPrincipal
btn_form.addEventListener("submit", (e) => {
  e.preventDefault();
  RestarMonto();
  MostrarDatos();
  btn_form.reset();
});

//funcionGastos
const descripcion = document.getElementById("description");
const precio = document.getElementById("price");

const AgregarPago = () => {
  let Datos = {
    descripcion: descripcion.value,
    precio: precio.value
  };
  let ArrayDatos = [];

  if (GlobalLocalStore === null) {
    ArrayDatos.push(Datos);
    localStorage.setItem("Payments", JSON.stringify(ArrayDatos));
  } else {
    let newdata = JSON.parse(localStorage.getItem("Payments"));
    newdata.push(Datos);
    localStorage.setItem("Payments", JSON.stringify(newdata));
  }
};

//funcionRestarDelMonto
const RestarMonto = () => {
  let monto = parseInt(JSON.parse(localStorage.getItem("Monto")));
  let price = parseInt(precio.value);
  if (price > monto) {
    alert("monto superado :S");
  } else {
    AgregarPago();
    let total = monto - price;
    localStorage.setItem("Monto", JSON.stringify(total));
    capturar_total();
  }
};

//datosEnPantalla
const MostrarDatos = () => {
  let data = JSON.parse(localStorage.getItem("Payments"));
  container.innerHTML = "";
  if (data === null) {
    alert("No Hay Datos Para Mostrar");
  } else {
    for (let index of data) {
      container.innerHTML += `
            <div class="items flex-global">
                <p>${index.descripcion} - ${index.precio}</p>
                <a class="flex-global" onclick="EliminarDatos('${index.descripcion}')"><i class="fas fa-trash-alt"></i></a>
          </div>
            `;
    }
  }
};

MostrarDatos();

//capturarElTotal
let capturar_total = () => {
  let monto_total = document.getElementById("total");
  let valor = JSON.parse(localStorage.getItem("Monto"));
  monto_total.textContent = "Total : " + valor;
};
capturar_total();

// Eliminardatos
const EliminarDatos = (valor) => {
  for (let i = 0; i < GlobalLocalStore.length; i++) {
    if (GlobalLocalStore[i].descripcion === valor) {
      GlobalLocalStore.splice(i, 1);
    }
    localStorage.setItem("Payments", JSON.stringify(GlobalLocalStore));
  }
  MostrarDatos();
};

//valorDiferenteANull
const ConfirmarModal = () => {
  if (GlobalLocalStore != null) {
    window_modal.style.display = "none";
  }
};

ConfirmarModal();

//filtandoElementosRegistrados
let filter = document.getElementById("filter");

filter.addEventListener("keyup", (e) => {
  container.innerHTML = "";
  let valor = e.target.value;
  GlobalLocalStore.forEach((element) => {
    let value = element.descripcion.includes(valor);
    if (value) {
      container.innerHTML += `
    <div class="items flex-global">
        <p>${element.descripcion} - ${element.precio}</p>
        <a class="flex-global" onclick="EliminarDatos('${element.descripcion}')"><i class="fas fa-trash-alt"></i></a>
  </div>
    `;
    }
  });
});
