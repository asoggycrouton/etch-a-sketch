// 1. select elements on the page: canvas and shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 25;

// 2. select canvas for drawing
const {width, height} = canvas;

// 3. creat random starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

// 4. write a draw function
function draw ({key}) {
    console.log(key);

    //  start the drawing path
ctx.beginPath();
ctx.moveTo(x,y);

// move the x and y properties according to the users path
switch (key){
    case 'ArrowUp':
        y -= MOVE_AMOUNT;
        break;
    case 'ArrowDown':
        y += MOVE_AMOUNT;
        break;
    case 'ArrowRight':
        x += MOVE_AMOUNT;
        break;
    case 'ArrowLeft':
        x -= MOVE_AMOUNT;
        break;    
    default:
        break;    
}
ctx.lineTo(x,y);
ctx.stroke();
}

// 5. write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')){
        e.preventDefault();
        draw ({key: e.key});
    }
}

// 6. write a shake function
function deleteCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0,0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    },{once: true});
}

// 7. listen for keys * this  is how the etch will work *
window.addEventListener('keydown',  handleKey);
shakeButton.addEventListener('click', deleteCanvas);