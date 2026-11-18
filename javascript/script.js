// const btnClickHandler = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     alert("Hola Mundo desde Archivo JS!!!!");
// }
// const pageInit = ()=>{
//     let btnClick = document.querySelector(".button");
//     btnClick.addEventListener("click", btnClickHandler);
// }


// document.addEventListener("DOMContentLoaded", pageInit);


// Logica prar el Menu de Hamburguesa

document.addEventListener("DOMContentLoaded", ()=>{
    let hmbButton = document.querySelector(".hmb-button");
    let navNode = document.querySelector("header nav");
    hmbButton.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        navNode.classList.toggle("hidden");
    });
});