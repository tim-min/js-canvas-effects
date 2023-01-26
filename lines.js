class Dot {
    constructor(x, y, xdir, ydir) {
        this.x = x;
        this.y = y;
        this.xdir = xdir;
        this.ydir = ydir;
    }

    move(speed, max_x, max_y) {
        this.x += speed * this.xdir;
        this.y += speed * this.ydir;

        if (this.x >= max_x || this.x <= 0) {
            this.xdir *= -1;
        }
        if (this.y >= max_y || this.y <= 0) {
            this.ydir *= -1;
        }
    }
}

class LinesEffect {
    constructor(cvs_el, context, wwidth, wheight, bg_color, particles_color, lines_color, particles_size) {
        this.cvs = document.querySelector(cvs_el);
        this.ctx = this.cvs.getContext(context);
        this.dots = [];
        this.wwidth = wwidth;
        this.wheight = wheight;
        this.bg_color = bg_color;
        this.particles_color = particles_color;
        this.lines_color = lines_color;
        this.particles_size = particles_size;
        this.add_dot(window.innerWidth, window.innerHeight);
        this.add_dot(window.innerWidth, window.innerHeight);
    }

    add_dot(max_x, max_y) {
        let xdir = 1; let ydir = 1;
        if (Math.floor(Math.random() * 2) == 1) xdir *= -1;
        if (Math.floor(Math.random() * 2) == 1) ydir *= -1;
        let dot = new Dot(Math.floor(Math.random() * max_x), Math.floor(Math.random() * max_y), xdir, ydir);
        this.dots.push(dot);
    }

    generate_dots(count, max_x, max_y) {
        for (let x = 0; x < count; x++) {
            this.add_dot(max_x, max_y);
        }
        let mouse_dot = new Dot(0, 0, 0, 0);
        this.dots.push(mouse_dot);
    }

    draw() {
        this.ctx.fillStyle = this.bg_color;
        this.ctx.fillRect(0, 0, this.wwidth, this.wheight);

        for (let x = 0; x < this.dots.length; x++) {
            this.ctx.fillStyle = this.particles_color;
            this.ctx.fillRect(this.dots[x].x, this.dots[x].y, this.particles_size, this.particles_size);
            for (let j = 0; j < this.dots.length; j++) {
                if (Math.sqrt(Math.pow(Math.abs(this.dots[x].x - this.dots[j].x), 2) + Math.pow(Math.abs(this.dots[x].y - this.dots[j].y), 2)) <= 100) {
                    this.ctx.strokeStyle = this.lines_color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.dots[x].x, this.dots[x].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.stroke();
                }
            }
            this.dots[x].move(0.3, this.wwidth, this.wheight);
        }
    }
}

function lines(canvas_div, canvas_width, canvas_height, particles_count, bg_color='black', particles_color='white', lines_color='white', particles_size=3) {
    document.getElementById(canvas_div).innerHTML = `<canvas id='TmminLinesCanvas' width='${canvas_width}' height='${canvas_height}'></canvas>`;
    let effect = new LinesEffect('#TmminLinesCanvas', '2d', canvas_width, canvas_height, bg_color, particles_color, lines_color, particles_size);
    effect.generate_dots(particles_count, canvas_width, canvas_height);

    $("body").mousemove(function (e) {
        var rect = effect.cvs.getBoundingClientRect(),
        scaleX = effect.cvs.width / rect.width,
        scaleY = effect.cvs.height / rect.height;

        effect.dots[effect.dots.length - 1].x = (e.clientX - rect.left) * scaleX;
        effect.dots[effect.dots.length - 1].y = (e.clientY - rect.top) * scaleY;
    })

    setInterval(function () {
        effect.draw();
    }, 1)
}
