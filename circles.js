class Circle {
    constructor(x, y, color, max_size, speed) {
        this.coords = {
            x: x,
            y: y
        }
        this.color = color;
        this.max_size = max_size;
        this.size = 1;
        this.speed = speed;
        this.direction = 1;
        this.killed = false;
    }

    anim() {
        if (this.killed) return;

        if (this.size < this.max_size && this.size > 0) {
            this.size += this.speed * this.direction;
            if (this.size >= this.max_size) {
                this.direction = -1;
                this.size-=this.speed;
            } if (this.size <= 0) {
                this.killed = true;
            }
        }
    }
}


class CirclesEffect {
    constructor(canvas, ctx, width, height, bg_color, particles_colors, particles_size, particles_count, particles_speed) {
        this.cvs = document.querySelector(canvas);
        this.ctx = this.cvs.getContext(ctx);
        this.circles = [];
        this.wwidth = width;
        this.wheight = height;
        this.bg_color = bg_color;
        this.particles_colors = particles_colors;
        this.particles_size = particles_size;
        this.particles_count = particles_count;
        this.particles_speed = particles_speed;
    }

    create_particles() {
        for (let x = 0; x < this.particles_count; x++) {
            let circle = new Circle(Math.floor(Math.random() * this.wwidth), Math.floor(Math.random() * this.wheight), this.particles_colors[Math.floor(Math.random() * this.particles_colors.length)], this.particles_size, this.particles_speed);
            this.circles.push(circle);
        }
    }

    loop() {
        this.ctx.fillStyle = this.bg_color;
        this.ctx.fillRect(0, 0, this.wwidth, this.wheight);

        if (!this.circles.length) {
            console.log(this.circles.length);
            this.create_particles();
        }

        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.coords.x, circle.coords.y, circle.size, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = circle.color;
            this.ctx.fill();

            circle.anim();
            if (circle.killed) {
                let index = this.circles.indexOf(circle);
                this.circles.splice(index, 1);
            }
        });
    }
}

function circles(canvas_div, canvas_width, canvas_height, particles_count, bg_color = "white", particles_colors = ["yellow", "red", "blue", "purple", "green"], particles_size = 100, particles_speed = 1) {

    document.getElementById(canvas_div).innerHTML = `<canvas id='TmminCirclesCanvas' width='${canvas_width}' height='${canvas_height}'></canvas>`;
    let effect = new CirclesEffect('#TmminCirclesCanvas', '2d', canvas_width, canvas_height, bg_color, particles_colors, particles_size, particles_count, particles_speed);

    setInterval(function () {
        effect.loop();
    }, 1)

}
