# js-canvas-effects

<a href="https://tim-min.github.io/js-canvas-effects/">Example</a>

<h3>Get started</h3>

<li>Connect JQuery:</li><br>

```javascript

<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>

```

<br>

<li>Connect effect:</li><br>

```javascript

<script src="https://tim-min.github.io/js-canvas-effects/lines.js"></script>

```

<br>

<li>Create effects div and call effects function:</li><br>

```javascript

<div id="effects_div" align="center"></div>

<script>
    lines("effects_div", 500, 500, 30, 'black', 'gray', 'white', 3);
</script>

```

<br>

<h3>Available effects functions:</h3>

<li>Lines effect:</li><br>

```javascript

lines("effects_div", 500, 500, 30, 'black', 'gray', 'white', 3);

// Arguments:
// lines(div_id, canvas_width, canvas_height, particles_count, bg_color='black', particles_color='gray', lines_color='white', particles_size=3);

```

<br>

<li>Circles Effect:</li><br>

```javascript

circles("effects_div", 500, 500, 30, 'black', ['white', 'gray'], 100, 0.1);

// Arguments:
// circles(div_id, canvas_width, canvas_height, particles_count, bg_color='black', particles_colors=["yellow", "red", "blue", "purple", "green"], particles_size=100, particles_speed=1);

```
