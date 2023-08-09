const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 85;

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
    for(let i = 0; i<600; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = Math.random()*(canvas.width -20) + 10;
        this.y = Math.random()*(canvas.height -20) + 10;
        this.size = Math.random() * 4 + 3;
        this.lifetime = 100;
        console.log();
        this.hue = hue;
        this.color = "hsl(" + hue +", 100%, 100%)";
        console.log(this.color);
    }

    update(){}

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function handleParticles(){
    for (let i = 0; i< particlesArray.length;i++){
        particlesArray[i].draw();
        for (let j = i; j< particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/7;
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background_color = "hsl(" + hue +", 50%, 88%)";
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();