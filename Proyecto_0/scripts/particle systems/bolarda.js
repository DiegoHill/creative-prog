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
    for(let i = 0; i<1000; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){        

        
        this.x = (Math.random()*2-1);
        this.y = (Math.random()*2-1);
        this.z = (Math.random()*2-1);

        this.mag = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    
        this.x = this.x/this.mag*(canvas.width/3) + canvas.height*2*0.8;
        this.y = this.y/this.mag*(canvas.width/3) + canvas.height*0.8;
        this.z = this.z/this.mag*(canvas.width/3);
        
        this.size = Math.random() + 5;
        this.lifetime = 100;
        console.log();
        this.hue = hue;
        this.color = "hsl(" + hue +", 50%, " + 88 + "%)";
        //(this.z/(canvas.width/5)+1)/2*100
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
            const dz = particlesArray[i].z - particlesArray[j].z;
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if(distance < 120){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/5;
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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();