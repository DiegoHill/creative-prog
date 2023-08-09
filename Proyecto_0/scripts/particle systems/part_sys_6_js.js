const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 100;

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
    for(let i = 0; i<100; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = mouse.x + Math.random()*1000;
        this.y = mouse.y + Math.random()*100;
        this.size = Math.random() * 2 + 3;
        this.lifetime = 100;
        console.log();
        this.hue = hue;
        this.lightness = Math.random() * 100;
        if(this.lightness<85){
            this.lightness = 85;
        }
        else if(this.lightness>90){
            this.lightness = 90;
        }
        this.color = "hsl(" + hue +", 40%, " + this.lightness +"%)";
        this.sinapsis_lightness = this.lightness;
        this.sinapsis_color = "hsl(" + hue +", 40%, " + this.sinapsis_lightness +"%)";
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
        number_of_neighbors = 0;
        /*isolated = true;
        for (let j = i; j< particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 5){
                isolated = false;
            }
        }*/
        for (let j = i; j< particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(/*isolated == true &*/ distance < 70 & number_of_neighbors<5){
                number_of_neighbors++;
                particlesArray[i].draw();
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].sinapsis_color;
                ctx.lineWidth = particlesArray[i].size/3;
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