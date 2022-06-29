//Creacion de Variables*/
var canvasWidth = 900;          //Designa el tamaño del ancho de la ventana
var canvasHeight = 500;         //Designa el tamaño del alto de la ventana

var player;                     //Crea la variable del jugador*/
var playerYPosition = 200;      //Crea la variable de la posision del jugador en 200

var fallSpeed = 0;                              //Asigna la velocidad inicial del jugador en 0
var interval = setInterval(updateCanvas, 20);   //Asigna un intervalo de velocidad a la que ira el juego

var isJumping = false;          //Crea la variable salto y la inicializa en falso
var jumpSpeed = 0;              //Crea la variable de velocidad de salto y la inicializa en 0

var block;                      //Crea la varible bloque

// Crea una puntuacion enpezando en 0
var score = 0;
// Crea la variable contenedora de scoreLabel
var scoreLabel;

function startGame() {
    /**Crea la funcion startGame()
     * Parametros
     * ----------
     * player : createPlayer()
     *      (30,30,10)
     * block : createBlock()
     * scoreLabel : createScoreLabel()
     *      (10,30)
     */
    gameCanvas.start();                             //Inicializa en canvas
    player = new createPlayer(30, 30, 10);          //Da dimenciones y posicion al jugdor
    block = new createBlock();                      //Da dimenciones a los obstaculos
    // Asigna a scoreLabel un valor de la funcion scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}
//Crea variable para inicializar el visualizador donde correra el juego
var gameCanvas = {
    canvas: document.createElement("canvas"),           //Visualizador Canvas
    start: function() {
        /**Crea la funcion start
         * Parametros
         * ----------
         * this.canvas.width : canvasWidth
         * this.canvas.height : canvasHeight
         * this.context : getContext("2d")
         * Retorna
         * -------
         * Inserta el canva en la etiqueta del body
         */
        this.canvas.width = canvasWidth;                                        //Asigna la dimencion de ancho de la ventana
        this.canvas.height = canvasHeight;                                      //Asigna dimencion del alto de la ventana
        this.context = this.canvas.getContext("2d");                            //Agrega la ventana como contenido 2d
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function createPlayer(width, height, x) {
    /**Crea la funcion createPlayer()
         * Parametros
         * ----------
         * this.width : width
         * this.height : height
         * this.x : x
         * this.y : playerYPosition
         */
    this.width = width;                 //Asigna la anchura
    this.height = height;               //Asigna la altura
    this.x = x;                         //Asigna la posicion en x
    this.y = playerYPosition;           //Asigna la posicion cuando se mueve en y

    this.draw = function() {
        /**Crea la funcion draw()
         * Parametros
         * ----------
         * ctx : gameCanvas.context
         *      Color, Posicion y tamaño
         */
        ctx = gameCanvas.context;                                   //Agrega a la dimencion 2d 
        ctx.fillStyle = "green";                                    //Asigna color
        ctx.fillRect(this.x, this.y, this.width, this.height);      //Asigna los ejes de movimiento y tamaño
    }

    //Funcion cuando el jugador esta de caida
    this.makeFall = function() {
        /**Crea la funcion makeFall
         * Parametros
         * ----------
         * this.y : fallSpeed
         *      Par al jugador
         * fallSpeed : fallSpeed
         *      Da velocidad al jugador
         * Retorna
         * -------
         * stopPlayer()
         */
        if (!isJumping) {               //Condicion para cuando realiza un salto el jugador
            this.y += fallSpeed;        //Asigna la velocidad al jugador en 0
            fallSpeed += 0.3;           //Aumenta la velocidad de caida al jugador
            this.stopPlayer();          //Para al jugador nuevamente
        }
    }
    //Funcion cuando el jugador esta quieto
    this.stopPlayer = function() {
        /**Crea la funcion stopPlayer
         * Parametros
         * ----------
         * ground : canvasHeight - this.height
         *      Resta la altura del canvas y la altura general
         * this.y : ground
         *      Asigna los valores de la resta entre las alturas
         */
        var ground = canvasHeight - this.height;    //Crea la variable para restar las alturas
        if (this.y > ground) {                      //Crea la condicion cuando la posicion en y es mayor a la resta de las alturas
            this.y = ground;                        //Asigna la posicion en y igual que la resta de las alturas
        }
    }
    //Funcion cuando el jugador salta
    this.jump = function() {
        /**Crea la funcion jump
         * Parametros
         * ----------
         * this.y : jumpSpeed
         *      Asigna al jugador la velocidad inicial
         * jumpSpeed : jumpSpeed
         *      Da velociada al jugador cuando hace la accion de saltar
         */
        if (isJumping) {                //Condicion para cuando realiza un salto
            this.y -= jumpSpeed;        //Asigna al eje y la velocidad del salto inicial
            jumpSpeed += 0.9;           //Asigna mas velocidad al jugador al hacer un salto
        }
    }
}

//Crea los obstaculos
function createBlock() {
    /**Crea la funcion createBlock()
     * Parametros
     * ----------
     * width : randomNumber()
     *      (10,50)
     * height : randomNumber()
     *      (10,200)
     * speed : randomNumber()
     *      (2,6)
     * Retorno
     * -------
     * this.x : canvasWidth
     * this.y : canvasHeight - height
     */
    var width = randomNumber(10, 50);       //Asigna un rango de ancho
    var height = randomNumber(10, 200);     //Asigna un rango de altura
    var speed = randomNumber(2, 6);         //Asigna un rango de velocidad
    
    this.x = canvasWidth;                   //Asigna a la variable x el ancho del canvas
    this.y = canvasHeight - height;         //Asigna el alto del canvas menos la altura general
    
    this.draw = function() {
        /**Crea la funcion draw()
         * Parametros
         * ----------
         * ctx : gameCanvas.context
         *      Color, Posicion y tamaño
         */
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        /**Crea la funcion attackPlayer()
         * Parametros
         * ----------
         * this.x : speed
         * 
         * retorna
         * -------
         * this.returnToAttackPosition()
         */
        this.x -= speed;                    //Da velocidad constante en x entre el intervalo seleccionado
        this.returnToAttackPosition();      //Retorna la posicion
    }
    this.returnToAttackPosition = function() {
        /**Crea la funcion createBlock()
         * Parametros
         * ----------
         * width : randomNumber()
         *      (10,50)
         * height : randomNumber()
         *      (50,200)
         * speed : randomNumber()
         *      (4,6)
         * Retorno
         * -------
         * this.y : canvasHeight - height
         * this.x : canvasWidth
         * score++
         *      Contador de puntos
         */
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Incrementa el contador cuando el obstaculo pasa
            score++;
        }
    }
}

//Funcion cuando realiza una colicion entre el jugador y los obstaculos
function detectCollision() {
    /**Crea la funcion createBlock()
     * Parametros
     * ----------
     * playerLeft : player.x
     * playerRight : player.x + player.width
     * blockLeft : block.x
     * playerBottom : player.y + player.height
     * blockTop : block.y
     * Retorno
     * -------
     * gameCanvas.stop()
     */
    var playerLeft = player.x                       //Agrega la derecha del jugador
    var playerRight = player.x + player.width;      //Agrega la izquierda del jugador
    var blockLeft = block.x;                        //Agrega la derecha del bloque
    var playerBottom = player.y + player.height;    //Agrega la base del jugador
    var blockTop = block.y;                         //Agrega la parte superior del bloque
    
    if (playerRight > blockLeft &&                  //Condiciones para la colicion entre los cubos
        playerLeft < blockLeft &&                   
        playerBottom > blockTop) {                  
        
        gameCanvas.stop();                          //Para el juego cuando se cumplen estas condiciones
    }
}

//Crea el contador de puntos y le da su formato
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
    }
}

//Agrega los componentes del canvas
function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Actualiza en contador cuando este va aumentando
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

//Funcion random para consegir la altura o la velocidad
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Reinicia el salto del jugador
function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

//Agrega la ventana del onkeyup a la etiqueta de boby
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 630);
    }
}