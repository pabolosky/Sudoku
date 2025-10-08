
    
// generar el html en tiempo de ejecución

let h1 = document.createElement("h1")
h1.id = "tit"
document.body.appendChild(h1)

document.getElementById("tit").innerHTML = "Sudoku"

let div = document.createElement("div")
div.id = "caja"
document.body.appendChild(div)

let caja = document.getElementById("caja")

let p = document.createElement("p")
p.id = "parraf"
document.body.appendChild(p)

let b1 = document.createElement("button")
b1.innerHTML = "Reset"
p.appendChild(b1)

let b2 = document.createElement("button")
b2.innerHTML = "Volver"
p.appendChild(b2)


// función que genera inputs simulando un Sudoku 

let matriz = []

function crearInputs() {
    caja.innerHTML = ""
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let input = document.createElement("input")
            input.type = "text"
            input.id = "i" + i + j

            if (i % 3 == 0) {
                input.style.borderTop = "8px solid"
            }
            if (j % 3 == 0) {
                input.style.borderLeft = "4px solid"
                if (j == 0) {
                    input.style.borderLeft = "8px solid"
                }
            }
            if (j == 2 || j == 5 || j == 8) {
                input.style.borderRight = "4px solid"
                if (j == 8) {
                    input.style.borderRight = "8px solid"
                }
            }
            if (i == 8) {
                input.style.borderBottom = "8px solid"
            }

            caja.appendChild(input)
        }
        caja.appendChild(document.createElement("br"))
    }


    for (let i = 0; i < 9; i++) {
        matriz[i] = []
        for (let j = 0; j < 9; j++) {
            matriz[i][j] = document.getElementById("i" + i + j)
        }
    }
}

crearInputs()


// crear la función que limpia todos los números del Sudoku

function limpiarNums() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            matriz[i][j].value = ""
            matriz[i][j].style.background = "white"
            matriz[i][j].readOnly = false
        }
    }
}

// crear la función que rellena el Sudoku 

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

// función para comprobar

let valido

function validarNums() {
    valido = true

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if (matriz[i][j].value != "") {
                for (let n = 0; n < 9; n++) {

                    if (j != n && matriz[i][j].value == matriz[i][n].value) {
                        valido = false
                    } else if (i != n && matriz[i][j].value == matriz[n][j].value) {
                        valido = false
                    }
                }
            }

            for (let fil = 0; fil < 9; fil += 3) {
                for (let col = 0; col < 9; col += 3) {

                    let valores = {}

                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {

                            let fila = fil + i
                            let columna = col + j
                            let celda = matriz[fila][columna]
                            let val = celda.value

                            if (val != "") {
                                if (valores[val]) {
                                    valido = false
                                } else {
                                    valores[val] = celda
                                }
                            }
                        }
                    }
                }
            }

            if (matriz[i][j].value == "") {
                valido = false
            }
        }
    }
}

// añadir el listener a los inputs

let todosInputs = document.getElementsByTagName("input")

for (let i = 0; i < todosInputs.length; i++) {

    todosInputs[i].addEventListener("input", function (x) {

        if (isNaN(x.target.value) || x.target.value < 1) {
            x.target.value = ""

        } else if (x.target.value > 10) {
            let abc = x.target.value.toString()
            x.target.value = abc.charAt(0)
        }
        validarNums()
        if(valido){
            alert("Enhorabuena, has completado el Sudoku :)")
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    matriz[i][j].readOnly = true

                }
            }
        }
    })
}

// añadir el listener al botón que resetea Sudoku

b1.addEventListener("click", function () {
    limpiarNums()
    generearNums()
})
