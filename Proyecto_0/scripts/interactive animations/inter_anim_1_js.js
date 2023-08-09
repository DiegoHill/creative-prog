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
        this.x0 = 10;
        this.y0 = 10;
        this.x = this.x0;
        this.y = this.y0;
        this.lengthX = 300;
        this.lengthY = 300;
        this.going_down = true;
        this.going_right = true;
        this.velX = 3;
        this.velY = 3;
    }
    #draw(x,y){
        this.#ctx.beginPath(); //beginPath indica que vamos a empezar
        //a dibujar una nueva figura. Cuando llamemos posteriormente
        //al método stroke, este dibujará la fugura que se haya
        //definido a partir de la última llamada a beginPath. [1]
        this.#ctx.moveTo(x,y);
        this.#ctx.lineTo(x+this.lengthX, y+this.lengthY);
        this.#ctx.stroke();
    }
    //El siguiente método genera el bucle de animación.
    animate(){

        //movimiento en eje y
        if (this.y + this.lengthY <= this.#height - this.y0 & this.going_down == true){
            this.#ctx.clearRect(0,0,this.#width,this.#height)
            this.#draw(this.x,this.y);
            this.y += this.velY;
        }else if (this.y >= this.y0){
            this.going_down = false;
            this.#ctx.clearRect(0,0,this.#width,this.#height)
            this.#draw(this.x,this.y);
            this.y -= this.velY;
        }else{
            this.going_down = true;
        }

        //movimiento en eje x
        if (this.x + this.lengthX <= this.#width - this.x0 & this.going_right == true){
            this.#ctx.clearRect(0,0,this.#width,this.#height)
            this.#draw(this.x,this.y);
            this.x += this.velX;
        }else if (this.x >= this.x0){
            this.going_right = false;
            this.#ctx.clearRect(0,0,this.#width,this.#height)
            this.#draw(this.x,this.y);
            this.x -= this.velX;
        }else{
            this.going_right = true;
        }

        console.log("animating!");
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
        //Llamada recursiva que genera un bucle de animación infinito.
        //La frecuencia a la que se repite el bucle se ajusta en la
        //mayoría de navegadores a la frecuencia de refresco de la 
        //pantalla. [1]
    }
}

//[6] Tutorial de Franks laboratory sobre animación interactiva en
//Javascript nativo: https://www.youtube.com/watch?v=uCH1ta5OUHw
