class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        fill("blue");
        circle(this.x,this.y,this.size)
    }
}

const particlesArray = [];

function initParticles(){
    for(let i = 0; i<100; i++){
        particlesArray.push(new Particle());
    }
}

function handleParticles(){
    for (let i = 0; i< particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    background("black");
    const canvas = document.getElementById("defaultCanvas0");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles();
    console.log(particlesArray);

}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function draw(){
    handleParticles();
}