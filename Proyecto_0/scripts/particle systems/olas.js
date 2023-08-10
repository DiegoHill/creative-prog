const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 85;
time = 0;

var particlesArray = [];

const mouse = {
    x: null,
    y: null,
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(){        

        
        this.x = (Math.random()*2-1)*canvas.width;
        this.y = 0;
        this.z = (Math.random()*2-1)*canvas.width;
        
        this.size = Math.random() + 5;
        this.lifetime = 100;
        console.log();
        this.hue = hue;
        this.color = "hsl(" + hue +", 50%, " + 88 + "%)";
        //(this.z/(canvas.width/5)+1)/2*100
        this.x1 = this.x;
        this.z1 = this.z;
        this.angular_speed = Math.random()/100;
    }

    update(){

        this.y = 40*Math.sin(this.x*0.02 + time*50*0.02)+ canvas.height/2;
        this.y += 5*Math.sin(this.x*0.07 + time*10*0.07);
        this.y += 1*Math.sin(this.x*0.12 + time*10*0.12);
        this.y += 30*Math.sin(this.x*0.005 + time*10*0.005);
        
    }

    draw(){
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        if(distance<120){
            document.body.style.cursor = 'none';
            this.color = "hsl(" + hue +", 50%, " + Math.round(100 - distance/10) + "%)";
            console.log(100 - distance/10);
        }
        else{
            this.color = "hsl(" + hue +", 50%, " + 88.1 + "%)";
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i = 0; i<1000; i++){
    particlesArray.push(new Particle());
}

function handleParticles(){
    for (let i = 0; i< particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    time += 1/60;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();