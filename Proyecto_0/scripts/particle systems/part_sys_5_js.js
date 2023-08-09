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
    for(let i = 0; i<2000; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.random_x = Math.random();
        this.random_x = Math.round(this.random_x * 50) / 50;
        this.random_y = Math.random();
        this.random_y = Math.round(this.random_y * 50) / 50;
        this.x = this.random_x*canvas.width;
        this.y = this.random_y*canvas.width;
        this.size = Math.random() * 4 + 3;
        this.lifetime = 100;
        console.log();
        this.hue = hue;
        this.lightness = Math.random() * 100;
        if(this.lightness<88){
            this.lightness = 88;
        }
        else if(this.lightness>93){
            this.lightness = 93;
        }
        this.color = "hsl(" + hue +", 0%, " + this.lightness +"%)";
        this.sinapsis_lightness = this.lightness + 5;
        if(this.sinapsis_lightness>88){
            this.sinapsis_lightness = 88;
        }
        this.sinapsis_color = "hsl(" + hue +", 0%, " + this.sinapsis_lightness +"%)";
        console.log(this.color);
    }

    update(){}

    draw(){
        var innerRadius = this.size/3,
        outerRadius = this.size * 2;

        var gradient = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'white');
        
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        
        ctx.fillStyle = gradient;
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
            if(/*isolated == true &*/ distance < 50 & number_of_neighbors<5){
                number_of_neighbors++;
                particlesArray[i].draw();
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].sinapsis_color;
                ctx.lineWidth = particlesArray[i].size/3;
                if (ctx.lineWidth < 2){
                    ctx.lineWidth = 2
                }
                if (ctx.lineWidth > 4){
                    ctx.lineWidth = 4
                }
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