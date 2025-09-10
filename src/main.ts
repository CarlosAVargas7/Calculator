function suma(a:number, b:number): number{
    
    return a+b;
}

console.log(suma(1, 2))

function multiplicacion(c: number, d:number): number {
    c=5
    d=3
    return c*d
}

console.log(multiplicacion(5,5))

// 1. Obtener referencia al botón y tiparlo
var boton = document.getElementById("fbutton") as HTMLButtonElement;
var cuenta = document.getElementById("contador") as HTMLParagraphElement
var num = document.getElementById("numero") as HTMLDataElement

// 2. Agregar un listener para el evento "click"
boton.addEventListener("click", (event: MouseEvent)=> {
    num++
});
