const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

const particlesArray = [];

const mouse = {
    x: null,
    y: null,
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i<80; i++){
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i<10; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = "hsl(" + hue +", 100%, 50%)";
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function handleParticles(){
    for (let i = 0; i< particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size<=1){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();