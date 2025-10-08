

// generar el html en tiempo de ejecución

let h1 = document.createElement("h1")
h1.id = "tit"
document.body.appendChild(h1)

document.getElementById("tit").innerHTML = "Sudoku"

let p1 = document.createElement("p")
p1.id = "contador"
document.body.appendChild(p1)

document.getElementById("contador").innerHTML = "Número de fallos: 0"

let div = document.createElement("div")
div.id = "caja"
document.body.appendChild(div)

let caja = document.getElementById("caja")

let p2 = document.createElement("p")
p2.id = "parraf"
document.body.appendChild(p2)

let b1 = document.createElement("button")
b1.innerHTML = "Reset"
p2.appendChild(b1)

// función que genera inputs simulando un Sudoku 

let matriz = []

function crearInputs(){
    caja.innerHTML = ""
    for (let i = 0 ; i < 9 ; i++) {
    for (let j = 0 ; j < 9 ; j++) {
        let input = document.createElement("input")
        input.type = "text"
        input.id = "i" + i + j

        if (i % 3 == 0){
            input.style.borderTop = "8px solid"
        } 
        if (j % 3 == 0){
            input.style.borderLeft = "4px solid"
            if(j == 0){
                input.style.borderLeft = "8px solid"
            }
        }
        if (j == 2 || j == 5 || j == 8){
            input.style.borderRight = "4px solid"
            if(j == 8){
                input.style.borderRight = "8px solid"
            }
        }
        if (i == 8){
            input.style.borderBottom = "8px solid"
        }

        caja.appendChild(input)
        }
        caja.appendChild(document.createElement("br"))
    }
    

    for (let i = 0 ; i < 9 ; i++) {
        matriz[i] = []      
        for (let j = 0 ; j < 9 ; j++) {
        matriz[i][j] = document.getElementById("i" + i + j)
        }
    }
}

crearInputs()


// crear la función que rellena el Sudoku 

let sol = [
    [7, 1, 5, 6, 3, 4, 9, 8, 2],
    [6, 8, 4, 9, 2, 1, 5, 3, 7],
    [2, 9, 3, 5, 7, 8, 6, 4, 1],
    [3, 7, 6, 1, 5, 2, 4, 9, 8],
    [8, 4, 1, 3, 9, 6, 2, 7, 5],
    [5, 2, 9, 4, 8, 7, 3, 1, 6],
    [1, 6, 7, 2, 4, 9, 8, 5, 3],
    [9, 3, 2, 8, 1, 5, 7, 6, 4],
    [4, 5, 8, 7, 6, 3, 1, 2, 9]
]

function generearNums() {
    let numeros = [
        [7, "", "", "", "", "", "", 8, ""],
        ["", 8, "", 9, 2, "", 5, "", ""],
        ["", "", 3, 5, "", "", "", "", ""],
        ["", 7, "", "", "", "", 4, "", ""],
        ["", "", 1, "", 9, 6, "", "", ""],
        [5, "", "", 4, "", 7, 3, "", ""],
        ["", "", "", "", "", "", "", 5, ""],
        ["", 3, 2, "", 1, "", 7, 6, 4],
        ["", "", "", "", "", 3, 1, "",""]
    ]

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            matriz[i][j].value = numeros[i][j]
            if(matriz[i][j].value != ""){
            matriz[i][j].style.background = "#A6A6A6"
            matriz[i][j].readOnly = true
            }
        }
    }

}

generearNums()

// crear la función que limpia todos los números del Sudoku

function limpiarNums(){
    for (let i = 0 ; i < 9 ; i++) {       
    for (let j = 0 ; j < 9 ; j++) {
        matriz[i][j].value = ""
        matriz[i][j].readOnly = false
        matriz[i][j].style.background = "white"
    }
  }
  errores = 0
  document.getElementById("contador").innerHTML = "El número de fallos es: " + errores
}

// función para comprobar

let valido = false

function validarNums(){
    if(matriz == sol){
        valido = true
    }
}


// añadir el listener a los inputs

let errores = 0

let todosInputs = document.getElementsByTagName("input")

for (let i = 0 ; i < matriz.length ; i++) {
    for (let j = 0 ; j < matriz.length ; j++) {

        matriz[i][j].addEventListener("input", function(x){

            if(matriz[i][j].value != sol[i][j]){
                errores++
                matriz[i][j].value = ""
                document.getElementById("contador").innerHTML = "Número de fallos es: " + errores
            }else{
                matriz[i][j].value = x.target.value
                matriz[i][j].readOnly = true
            }

            if(errores == 10){
                alert("Has perdido")
                limpiarNums()
                generearNums()
            }
            
            validarNums()
            
            if(valido){
                alert("Enhorabuena, has resuleto el Sudoku :)")
            }
        })
    }
}

// añadir el listener al botón que crea un nuevo Sudoku

b1.addEventListener("click", function(){
    limpiarNums()
    generearNums()
})