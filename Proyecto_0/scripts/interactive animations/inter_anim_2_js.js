let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
window.onload = function(){
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate();
}

window.addEventListener("resize",function(){
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate();
});

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

//Se van a utilizar los principios de programación orientada a objetos
//y encapsulación para generar un bucle de animación.

class FlowFieldEffect {

    //Una buena práctica al programar animación es definir variables
    //privadas que representan (encapsulan) variables globales en lugar 
    //de usar estas directamente. [1]

    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#ctx.strokeStyle= "white";
        this.#width = width;
        this.#height = height;
        this.x = this.#width/2;
        this.y = this.#height/2;
        this.lastTime = 0;
        this.interval = 100;
        this.timer = 0;
    }
    #draw(x,y){
        this.#ctx.beginPath(); //beginPath indica que vamos a empezar
        //a dibujar una nueva figura. Cuando llamemos posteriormente
        //al método stroke, este dibujará la fugura que se haya
        //definido a partir de la última llamada a beginPath. [1]
        this.#ctx.moveTo(x,y);
        this.#ctx.lineTo(mouse.x, mouse.y);
        this.#ctx.stroke();
    }
    //El siguiente método genera el bucle de animación.
    animate(timeStamp){
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height)
            this.#draw(this.x,this.y);
            this.timer = 0;
        }
        else{
            this.timer += deltaTime;
            console.log(this.timer);
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
        //Llamada recursiva que genera un bucle de animación infinito.
        //La frecuencia a la que se repite el bucle se ajusta en la
        //mayoría de navegadores a la frecuencia de refresco de la 
        //pantalla. [1]
    }
}

//[6] Tutorial de Franks laboratory sobre animación interactiva en
//Javascript nativo: https://www.youtube.com/watch?v=uCH1ta5OUHw
