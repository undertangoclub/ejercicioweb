function obtener(num) {
    fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(res => {  //EN ESTE MOMENTO YA OBTUVO LOS DATOS 
    console.log(res)
    contenido=`
    <img class="img-bailarin" src="${res.results[0].picture.large}">
    <p class="nombre-bailarin">${res.results[0].name.first} ${res.results[0].name.last}</p>`
    document.querySelector(`.f${num}`).innerHTML = contenido;
    })

}

obtener(0)
obtener(1)
obtener(2)