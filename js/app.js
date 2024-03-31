// Llamo a los elementos del DOM, los casilleros y el boton
const spots = document.querySelectorAll(".spot");
const btn = document.querySelector(".btn");

// Inicializo las variables de puntaje en 0
let pointsX = 0;
let pointsO = 0;

// Creo un mapa virtual del tablero del dom, para saber cuando hay un ganador
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// inicializo la variable del turno, en este caso empieza en X
let turn = "X";

// Hago un forEach por cada casilla que alla y a cada uno le asigno un evento de click
spots.forEach(spot => {
    spot.addEventListener("click", handleClick);
});

// fucion que maneja el click en una casilla 
function handleClick(event) {

    // Inicializo la variable que es, el elemento que se apreto
    const spot = event.target;

    // Condicional que revisa si tiene la clase clicked de no tenerla la agrega
    if(!spot.classList.contains('clicked')) {
        spot.classList.add('clicked');

        // Creo una variable que dependiendo de lo que tenga turn se pone una x o un circulo 
        let icon = turn === 'X' ? '<i class="fa-solid fa-x"></i>' : '<i class="fa-regular fa-circle"></i>';

        // Se inserta en el DOM el icono que correspondaa
        spot.insertAdjacentHTML("beforeend", icon);

        // Obtengo que la posicion en el tablero, de la casilla que se apreto
        const rowIndex = spot.dataset.row;
        const colIndex = spot.dataset.column;
        
        // Se actualiza el tablero con los datos obtenidos y esa posicion se iguala a lo que contenga turn
        board[rowIndex][colIndex] = turn;

        // Se remueve el evento de click del elemento, para que no se pueda interactuar
        spot.removeEventListener("click", handleClick);

        // Verifica en cada movimiento si se forma una linea, en caso de ser true se agrega un punto y se reinicia el tablero 
        if (winner()) {
            addPoint(turn)
            restarWinner()
            return;
        }

        // Se cambia el dato de la variable
        turn = turn === 'X' ? 'O' : 'X';

    }
}

// Recibe el turn de parte handleClick
function addPoint(player) {
    // Si player es igual a X, se agrega un 1 pointsX y se iguala al texto de X 
    if(player === 'X') {
        pointsX++;
        document.querySelector('#playerX .score').textContent = pointsX;

    // Si player es igual a O, se agrega un 1 pointsO y se iguala al texto de O
    } else if( player === 'O') {
        pointsO++;
        document.querySelector('#playerO .score').textContent = pointsO;
    }
}

function winner() {
    // Verificar filas
    for(let i = 0; i < 3; i++) {
        if(board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true;
        }
    }

    // Verificar columnas
    for (let j = 0; j < 3; j++) {
       if(board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return true;
       }
    }

    // Verificar diagonales
    if(board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }

    if(board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }

    return false;
}

function restarWinner() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Reiniciar las casillas y el estado de clic
    spots.forEach(spot => {
        spot.textContent = ''; 
        spot.classList.remove('clicked');
    });

    // Volver a agregar eventos de clic a todas las casillas
    spots.forEach(spot => {
        spot.addEventListener("click", handleClick);
    });
}

function restartBoard() {
    // Limpiar el tablero
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Reiniciar las casillas y el estado de clic
    spots.forEach(spot => {
        spot.textContent = ''; 
        spot.classList.remove('clicked');
    });

    // Volver a agregar eventos de clic a todas las casillas
    spots.forEach(spot => {
        spot.addEventListener("click", handleClick);
    });

    // Reiniciar los puntajes
    pointsX = 0;
    pointsO = 0;
    document.querySelector('#playerX .score').textContent = pointsX;
    document.querySelector('#playerO .score').textContent = pointsO;
}

btn.addEventListener('click',  restartBoard);
