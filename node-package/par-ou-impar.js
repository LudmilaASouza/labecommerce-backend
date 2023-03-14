const parOuImpar = process.argv[2]

console.log("Digite par ou ímpar:")

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min ;
}

const numero = Number (getRndInteger (0,10))
console.log(numero)

if(parOuImpar === "par" && numero % 2 === 0) {
    console.log(`Você escolheu um número par e o computador escolheu ímpar. O resultado foi ${numero}. Você ganhou.`)
} else{
    if(parOuImpar === "impar" && numero % 2 !==0) {
    console.log(`Você escolheu um número ímpar e o computador escolheu par. O resultado foi ${numero}. Você ganhou.`)
    } else{
        if(parOuImpar === "par" && numero % 2 !== 0){
            console.log(`Você escolheu um número par e o computador escolheu ímpar. O resultado foi ${numero}. Você perdeu.`)
        } else{
            if(parOuImpar === "impar" && numero % 2 === 0){
                console.log(`Você escolheu um número ímpar e o computador escolheu par. O resultado foi ${numero}. Você perdeu.`)
            }
        }
    }
}