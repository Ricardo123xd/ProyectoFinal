//Función asíncrona que se ejecuta al buscar una película
async function peliculas() {
  //Obtener valores del usuario desde las cajas de texto
  const titulo = document.getElementById("titulo").value.trim();
  const anio = document.getElementById("anio").value.trim();

  //Validamos que el título no este vacío
  if (!titulo) {
    document.getElementById("resultado").textContent = "Ingrese un título.";
    return;
  }

  //Crear una Promesa
  let myPromise = new Promise(function (resolve, reject) {
    //Creamos un objeto XMLHttpRequest
    let req = new XMLHttpRequest();

    //Configuramos la petición GET a la API(A Person in India) de películas
    req.open(
      "GET",
      "https://www.omdbapi.com/?apikey=43adbf2f&t=" + titulo + "&y=" + anio
    );

    //Funcion que se ejecuta cuando la respuesta del servidor llega
    req.onload = function () {
      //Validamos que el estado HTTP sea exitoso
      if (req.status >= 200 && req.status < 300) {
        try {
          //Convertir JSON a objeto JS
          const data = JSON.parse(req.responseText);

          //En caso de error
          if (data.Response === "False") {
            reject(new Error("Movie Not Found."));
          } else {
            resolve(data);
          }
        } catch (e) {
          reject(new Error("La respuesta JSON no es válida"));
        }
      } else {
        //Error en el HTTP (404, 500, etc.)
        reject(new Error("Error HTTP " + req.status));
      }
    }; //Cierre de la funcion onload()

    //Error en la comunicación (internet, CORS, etc.)
    req.onerror = function () {
      reject(new Error("Error de red o CORS"));
    };

    req.send();
  }); //Fin de promise

  //Esperamos la promesa
  try {
    const data = await myPromise;
    console.log(data);

    //Mostramos e imprimimos los datos de la película
    document.getElementById("resultado").innerHTML = `
        <strong>Title:</strong> ${data.Title}<br>
        <strong>Actors:</strong> ${data.Actors}<br>
        <strong>Year:</strong> ${data.Year}<br>
        <strong>Plot:</strong> ${data.Plot}<br>
        <strong>Genre:</strong> ${data.Genre}<br>
        <strong>BoxOffice:</strong> ${data.BoxOffice}<br>
        `;

    //Mostramos el poster de la película
    document.getElementById("poster").innerHTML = `
        <img src="${data.Poster}" class="img-fluid rounded">
        `;
  } catch (err) {
    //Mostramos un mensaje de error
    document.getElementById(
      "resultado"
    ).innerHTML = `<span style="color: red;">${err.message}</span>`;

    //Limpiamos el área del poster si hubo error
    document.getElementById("poster").innerHTML = "";
  } //cierre catch
} // fin de función peliculas()

// Notesé que también en este caso `min` será incluido y `max` excluido
function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(5);
  return Math.floor(Math.random() * (max - min) + min);
}

console.log(getRandomInt());

if (getRandomInt() == 2) {
  document.getElementById("footer").innerHTML = `
<div class="container-fluid bg-dark text-white text-center p-4 mt-4">
  &copy; 2025 Movie Database Online | It works with magic, adhesive tape,
  and without having any idea how it works. | Hosted with UAZ.
</div>`;
} else {
  document.getElementById("footer").innerHTML = `
<div class="container-fluid bg-dark text-white text-center p-4 mt-4">
  &copy; 2025 Movie Database Online | Powered by CampusJalpa | Hosted with UAZ.
</div>`;
}
