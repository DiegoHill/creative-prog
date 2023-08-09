function setup(){
    createCanvas(windowWidth, windowHeight);
    background("black");
    const canvas = document.getElementById("defaultCanvas0");
    const ctx = canvas.getContext('2d');
    mouseWasPressed = false;
}

function draw(){

    // Dibujar un círculo en cada punto por el que pase el ratón, cambiar el color con el que se dibujan los cículos a un color aleatorio
    // cada vez que el usuario haga click

    if(mouseIsPressed & !mouseWasPressed){

        //Generar un color aleatorio
        r=0; g=0; b=0;
        while(Math.max(r,g,b)==0){
            rand = (Math.round(Math.random()))*255;
            r = (Math.round(Math.random()))*255;
            g = (Math.round(Math.random()))*255;
            b = (Math.round(Math.random()))*255;
        }
        a = 255;
  
        fill(r, g, b, a);
        noStroke();

        mouseWasPressed = true;

    }
    else if(!mouseIsPressed){
        mouseWasPressed = false;
    }

    noStroke();
    circle(mouseX,mouseY,100);
}