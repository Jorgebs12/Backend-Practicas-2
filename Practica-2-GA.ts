//PRACTICA 2 JORGE BEJARANO SOLER

//DEFINIR TIPO RESPUESTAS CORRECTAS
type RespuestasCorrectas = {
    
    jugador : string,
    respuestasCorrectas : number
}

//DEFINIR TIPO TRIVIAL
type Trivial = {

    numeroJugadores : number,
    nombreJugadores : RespuestasCorrectas [],
    numeroPreguntas : number 
}

const jugar: Trivial = {

    numeroJugadores: 0,
    nombreJugadores: [],
    numeroPreguntas: 0 
}

//PEDIR NUMERO DE JUGADORES
const pedirNumJuga = prompt("Introduce el numero de jugadores: ")

if (pedirNumJuga !== null) {

    const numJugadores = parseInt(pedirNumJuga)

    if (!isNaN(numJugadores)) {

        jugar.numeroJugadores = numJugadores
        console.log("Numero de jugadores seleccionado: " + numJugadores)

    } else {

        console.log("El valor introducido no es un número válido.")
    }

} else {

    console.log("Introduce un valor correcto")
}

//PEDIR NOMBRE DE JUGADORES
for(let i=0; i<jugar.numeroJugadores; i++){

    const pedirNombre = prompt("Introduce el nombre del jugador: ")

    if(pedirNombre !== null){
        
        jugar.nombreJugadores.push({jugador: pedirNombre, respuestasCorrectas: 0})
        console.log("Nombre del jugador: " + pedirNombre)
    }
}


//PEDIR NUMERO DE PREGUNTAS
const pedirNumPreg = prompt("Introduce el numero de preguntas: ")

if (pedirNumPreg !== null) {

    const numPreguntas = parseInt(pedirNumPreg)

    if (!isNaN(numPreguntas)) {

        jugar.numeroPreguntas = numPreguntas
        console.log("Numero de preguntas seleccionadas: " + numPreguntas)

    } else {
        console.log("El valor introducido no es un número válido.")
    }
}

//API TRIVIAL
const url = "https://opentdb.com/api.php?amount=10&category=27&type=boolean"


//FUNCION OBTENER PREGUNTA
const getQuestion = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data.results[0]
}

//FUNCION INICIAR JUEGO
const inicioJuego = async(numeroPreguntas: number, numeroJugadores: number) => {

    for(let i=0; i<numeroPreguntas; i++){

        for(let i=0; i<numeroJugadores; i++){

            const jugadorNombres = jugar.nombreJugadores[i]

            console.log("Pregunta para: " + jugadorNombres.jugador)

            //PEDIR PREGUNTAS A LA API CON AWAIT 
            const preguntas = await getQuestion()

            console.log(preguntas.question)

            const respuesta = prompt("1. Verdadero 2. Falso")

            //COMPROBAR SI ES CORRECTA O INCORRECTA LA RESPUESTA
            if(respuesta !== null){

                const respuestaUsu = parseInt(respuesta)

                if(respuestaUsu === 1){

                    if(preguntas.correct_answer === "True"){

                        console.log("Respuesta correcta")

                        jugadorNombres.respuestasCorrectas++
                    }else{

                        console.log("Respuesta incorrecta")
                    }
                }else if(respuestaUsu === 2){

                    if(preguntas.correct_answer === "False"){

                        console.log("Respuesta correcta")
                        
                        jugadorNombres.respuestasCorrectas++
                    }else{

                        console.log("Respuesta incorrecta")
                    }
                }
            }
        }
    }

    //COMPROBAR GANADOR
    let ganador = jugar.nombreJugadores[0]

    for (let i = 1; i < jugar.numeroJugadores; i++) {

        const jugadorNombres = jugar.nombreJugadores[i]

        if (jugadorNombres.respuestasCorrectas > ganador.respuestasCorrectas) {

             ganador = jugadorNombres
        }
    }

    console.log("El ganador es: " + ganador.jugador);
}

//LLAMADA A LA FUNCION INICIAR JUEGO
inicioJuego(jugar.numeroPreguntas, jugar.numeroJugadores)
