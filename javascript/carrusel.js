class Carrusel {

    constructor(carruselContainerNode, timePerSlide = 3000){
        if(!carruselContainerNode) {
            throw new Error("El nodo para carrusel no es válido!!!");
        }
        this.carrusel = carruselContainerNode;
        this.cinta = this.carrusel.querySelector(".cinta");
        if(!this.cinta) {
            throw new Error("El carrusel no tiene una cinta declarada!!!");
        }
        this.slides = [...this.cinta.querySelectorAll(".slide")];
        // a = []; a.push(qsa[0]);  a.push(qsa[1]); a.push(qsa[2]);
        this.slideCount = this.slides.length;

        this.currentSlideIndex = 0;
        this.slideDirection = 1; // -1;
        this.interval = timePerSlide;
        this.timeOutId = null;
        this.indexBtns = [];
        this.createNavigation();
        this.tick();
    }

    tick() {
        this.timeOutId = setTimeout(
            this.move.bind(this),
            this.interval
        )
    }
    move() {
        this.currentSlideIndex += this.slideDirection;
        this.moveToIndex(this.currentSlideIndex);
    }

    moveToIndex(toIndex){
        clearTimeout(this.timeOutId);
        for(let i=0; i < this.slideCount; i++) {
            this.indexBtns[i].classList.remove("selected");
        }
        this.currentSlideIndex = toIndex;

        if (this.currentSlideIndex == this.slideCount){
            this.slideDirection = -1;
            this.currentSlideIndex -= 2;
        }
        if (this.currentSlideIndex < 0 ) {
            this.slideDirection = 1;
            this.currentSlideIndex += 2;
        }
        const transitionValue = `-${this.currentSlideIndex * 100}vw`;
        this.cinta.style.transform = `translateX(${transitionValue})`;
        this.indexBtns[this.currentSlideIndex].classList.add("selected");
        this.tick();
    }

    createNavigation(){
        const btnNavLeft = document.createElement("DIV");
        const btnNavRight = document.createElement("DIV");

        btnNavLeft.innerHTML = "&lt;";
        btnNavRight.innerHTML = "&gt;";

        btnNavLeft.classList.add(...["carrusel-btn", "carrusel-btn-left"]);
        btnNavRight.classList.add(...["carrusel-btn", "carrusel-btn-right"]);

        btnNavLeft.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            this.moveToIndex(this.currentSlideIndex += -1);
        });
        btnNavRight.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            this.moveToIndex(this.currentSlideIndex += 1);
        });

        this.carrusel.appendChild(btnNavLeft);
        this.carrusel.appendChild(btnNavRight);


        const NavIndexBtns = document.createElement("DIV");
        NavIndexBtns.classList.add("carrusel-index");

        for (let i = 0; i<this.slideCount ; i++) {
            const btnIndex = document.createElement("DIV");
            btnIndex.classList.add("index-btn");
            if (i == 0 ) {
                btnIndex.classList.add("selected");
            }
            btnIndex.addEventListener("click", (e)=>{
                e.preventDefault();
                e.stopPropagation();
                this.moveToIndex(i);
            });
            this.indexBtns.push(btnIndex);
            NavIndexBtns.appendChild(btnIndex);
        }

        this.carrusel.appendChild(NavIndexBtns);
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    const carruselNode = document.querySelector(".carrusel");
    let carruselInstance = new Carrusel(carruselNode);
});