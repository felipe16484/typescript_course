
//? Importante:
//* Al momento de definir un tipo de dato como "any", estamos pasando por alto las indicaciones del lenguaje y le estamos diciendo a éste es que 
//* IGNORE el tipo de dato, por lo cual no nos recomendará utilizar métodos o funcionalidades estrictas de un tipo de dato aunque lo podamos hacer.

//* Si definimos un tipo como "unknown" y queremos hacer uso de métodos de otro tipo de dato, no nos lo va a permitir el mismo lenguaje.


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia:
// Como typescript infiere que a y b son number sin mencionárselo.

const a = 1;
const b = 2;
const c = a + b;

let cadena = 'Hola';

//*cadena.toLocaleLowerCase();
// Permite la utilización del método puesto que éste es utilizado específicamente para tipo string.
//! cadena.propiedadInexistente;
// No permite utilizar propiedades porque 'cadena' es de tipo string y este tipo de dato no maneja 
// la utilización de propiedades.
//! cadena=2;
// No permite la reasignación de valores diferentes al que tenía cuando se inicializó la variable.


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Functiones:
// La inferencia de typescript cuenta con un límite. Ésto lo podemos observar principalmente al momento de 
// hacer uso de funciones. Los parámetros siempre quedarán definidos por defecto con el tipo "any" a no ser
// de que manualmente se le settee el tipo de dato que necesitemos.

// A pesar de que la función no genere un error de sintaxis, si nos ubicamos sobre el parámetro sin definir 
// el tipo de dato, el lenguaje nos mostrará una advertencia de que es recomendable que se le asigne uno.

function saludar(nombre: string) {
    console.log(`\nINFERENCIA PARA FUNCIONES:\nHola ${nombre}`);
}
saludar('Felipe');

//* saludar('Felipe');
// Dándole el tipo string al parámetro, nos permite sin problemas ejecutar la función setteando un string.
//! saludar(2);
// Si mandamos un dato diferente, nos arroja error diciendo que no es el tipo de dato que recibe el parámetro.


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Objetos como Parámetros de una Función:

//! ({name: string,age: number})
// Esta sintaxis de objetos como parámetros no es permitida porque entra en colisión con Javascript y su permiso
// para renombrar la propiedad de un objeto.

//* Forma 1: 
function saludar2({name,age}: {name: string, age: number}){
    console.log(`\nINFERENCIA PARA OBJETOS COMO PARÁMETROS DE UNA FUNCIÓN (Forma 1):\nHola ${name}, tienes ${age} años.`);
}
saludar2({name:'Felipe',age:76});

//* Forma 2: 
function saludar3(persona: {name: string, age: number}){
    const { name, age } = persona;
    console.log(`\nINFERENCIA PARA OBJETOS COMO PARÁMETROS DE UNA FUNCIÓN (Forma 2):\nHola ${name}, tienes ${age} años.`);
}
saludar3({name:'Felipe',age:76});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Tipo de Dato de Retorno:
// La sintaxis propone indicar los tipos de datos de los parámetros que son un objeto y después el tipo de dato que espera retornar una función.

function saludar4({name,age}: {name: string, age: number}) : number{
    return age;
}

const saludar4Age = saludar4({name:'Felipe',age:76});

console.log(`\nINFERENCIA PARA TIPO DE DATO DEL RETURN DE UNA FUNCIÓN:\nEdad extraída de la función: ${saludar4Age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Funciones que Reciben Funciones como Parámetros (Callbacks):
// Al momento de realizar este procedimiento se debe tener en cuenta que no se puede definir el tipo Function para el parámetro "fn" puesto que al
// igual que el resto de los tipos de datos, éste sería el "any" para funciones.

/* 

!const sayHiFromFunction = (fn) => {
!    return fn('Felipe');
!}

!sayHiFromFunction((name)=> {
!    console.log(`\nINFERENCIA PARA FUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHola ${name}`)
!})

*/

// Inicialmente se crea la función con un parámetro muy específicado de la función que debería recibirse. Indica que la función que se recibirá, deberá
// tener un parámetro de tipo string y que no importará si devuelve algo o no. Ésta última parte es importante para la ejecución del ejercicio puesto
// que si cambiásemos el tipo "void" por algún otro, obligatoriamente deberíamos crear un return del mismo tipo de dato que hayamos puesto en la "marca"
// o en la "plantilla" que generamos en la primera función. Plantilla/Marca ----> (fn: (name: string) => void).
const sayHiFromFunction = (fn: (name: string) => string) => {
    return fn('Felipe');
}

// Posteriormente se crea la función la cuál va a ser dirigida como parámetro a la primera. Ésta debe de cumplir con las especificaciones que generamos
// en los parámetros de la anterior, es decir, que tenga un parámetro que se llame "name" y éste sea de tipo string, y que no devuelva nada/no importa 
// si devuelve algo.
const sayHi = (name: string) => {
    let cadena = `\nINFERENCIA PARA FUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHolaqweqwe ${name}.`;
    return cadena;
}

// Finalmente ejecutamos la primera función y pasamos como parámetro de ésta la segunda. Tengamos en cuenta que la ejecución de la primera función indica
// que se va a ejcutar la segunda con el parámetro "Felipe" en este caso y es por ésto que este string es transpotado al parámetro de la segunda función
// para su ejecución y uso en el console.log de ésta última.
console.log(sayHiFromFunction(sayHi));


/* 
* Otra forma para realizar este ejercicio: acá, el return del parámetro de la plantilla de la primera función sí espera un tipo de dato string.
* Y la manera que se tiene de mostrar por consola la información de la ejecución de las dos funciones es utilizando el "console.log" con las dos funciones
* dentro.

const sayHiFromFunction = (fn: (name: string) => string) => {
    return fn('Felipe');
}
const sayHi = (name: string) => {
    let cadena = `\nINFERENCIA PARA FUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHolaqweqwe ${name}.`;
    return cadena;
}
console.log(sayHiFromFunction(sayHi)); 
*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia en el Tipado de Arrow Functions:
// De la misma manera que se trataron los ejemplos anteriores, el tipado de una arrow function sugiere dos formas de aplicarse:

// La primera es que se coloquen directamente en los parámetros el tipo de dato que se desea para cada uno, al igual que el tipo de dato que espera
// retornar.
const sumar = (a: number, b: number): number => {
    return a + b;
}
console.log(`\nINFERENCIA DEL TIPADO DE ARROW FUNCTIONS (Forma 1):\nEl resultado de la operación es: ${sumar(5,7)}`);

// La segunda indica, después del nombre de la variable, indicar el tipo de dato de los parámetros, el tipo de dato que retornará y por último la arrow
// function.
const restar: (a: number, b: number) => number = (a,b) => {
    return a - b;
}
console.log(`\nINFERENCIA DEL TIPADO DE ARROW FUNCTIONS (Forma 2):\nEl resultado de la operación es: ${restar(5,7)}`);

//* Cabe recalcar que para estos ejemplos, al ser sumas y restas de un mismo tipo de dato (number), no es necesario colocar el tipo de dato que retornarán
//* las funciones puesto que al ser operaciones matemáticas la inferencia de typescript sabrá que se devolverá un "number".


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Funciones que Nunca Devolverán Nada (Uso del "never"):

// El tipo de dato "never" se utiliza para funciones que no devolverán nada en su ejecución. És importante principalmente utilizado para evitar problemas
// al intentar guardar alguna variable

function throwError(message: string): never {
    throw new Error(message);
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Funciones Anónimas según el Contexto:

console.log(`\nINFERENCIA PARA FUNCIONES ANÓNIMAS SEGÚN EL CONTEXTO:`)

const avengers = ['Spidey', 'Hulk', 'Hawkeye', 'Ironman'];
// En este caso tenemos un contexto el cual nos indica que vamos a estar recorriendo un array de strings, por lo tanto al momento de crear el forEach
// para realizar una acción en las diferentes posiciones podemos observar que el editor nos recomienda métodos para strings ya que la inferencia de 
// typescript reconoce que todo el array es de strings y se pueden trabajar métodos para ello.
// También si nos ubicamos en el parámetro de la función anónima (avenger) podemos observar que reconoce que su tipo de dato será "string" para cada una
// de las iteraciones del procedimiento.
avengers.forEach(function (avenger) {
    console.log(avenger.toUpperCase());
})


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Objetos:

// La inferencia para los objetos nos limita a que tengamos una especie de "contrato" con ellos, es decir, no podemos modificar con otro tipo de dato
// una propiedad que ya tenga otro y no podremos intentar crear propiedades accediendo a ellas fuera del bloque del objeto.
let hero = {
    name: 'Thor',
    age: 1500
};

// A pesar de que en esta función se estén creando las propiedades del objeto que está en el ejemplo de arriba, en el momento en el cual creamos la 
// variable "thor" y su valor va a ser la ejecución de la función "createHero", no tenemos la certeza de que "thor" sea del mismo tipo que "hero".
function createHero(name: string, age: number) {
    return { name, age }
}

const thor = createHero('Thor',1500);

console.log(`\nINFERENCIA PARA OBJETOS:\nHéroe se llama ${thor.name}. Su edad es ${thor.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Objetos con Type Alias:

// Los nombres de los Type Alias siempre deben ir en Pascal Case. Son utilizados para darles plantillas fijas a los objetos los cuales necesitamos
// que sean de un mismo tipo o que lleven una misma estructura, por lo tanto los Type Alias son eso, generadores de estructuras a través de tipos 
// para objetos.
type Hero = {
    name: string,
    age: number
};

// Al momento de crear el objeto, es muy explícita la creación y la advertencia de errores. Ésto se debe a que sí o sí, el objeto al ser de type
// "Hero" tendrá que tener la misma estructura que la plantilla que le indicamos al ponerle un "Custom Type".
let hero2: Hero = {
    name: "Spider-Man",
    age: 26
};

// Para funciones que crear objetos con un "Custom Type" también pasa lo mismo. En el momento en el cual se detecta que la función deberá devolver 
// un tipo "Hero", se infiere en el mismo momento que será un objeto con las propiedades que creamos en la platilla del tipo "Hero".
function createHero2(name: string, age: number): Hero {
    return { name, age }
}

const hulk = createHero2('Hulk',250);

console.log(`\nINFERENCIA PARA OBJETOS CON TYPE ALIAS:\nHéroe se llama ${hulk.name}. Su edad es ${hulk.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Objetos con Type Alias y Destructuring:

// En el momento en el cual se crea una función la cual crea objetos de un mismo tipo, los parámetros que ésta recibe son los mismos que tiene
// la plantilla del tipo que creamos anteriormente. Sin embargo podemos hacer uso de una sintaxis diferente para tratar la "ambiguedad" que se genera
// en las cosas anteriormente mencionadas.
// Mencionando que se va a recibir como parámetro un "hero" que es de tipo "Hero" inicialmente inferimos que se recibirá en él las propiedades de la 
// plantilla y así mismo que devolverá un tipo "Hero".
function createHero3(hero: Hero): Hero {
    const { name, age } = hero
    return { name, age }
}
// Para su ejecución lo único que debemos de tener en cuenta es que debemos mandar en los parámetros las propiedades que necesita la plantilla.
const hawkeye = createHero3({name: 'Hawkeye', age: 440});
console.log(`\nINFERENCIA PARA OBJETOS CON TYPE ALIAS Y DESTRUCTURING:\nHéroe se llama ${hawkeye.name}. Su edad es ${hawkeye.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia para Objetos con Type Alias, Destructuring y Optional Properties:

// Las optional propierties como su nombre lo indica son propiedades opcionales de los objetos tiene y no afecta si son usadas o no en la ejecución 
// del código.

type HeroII = {
    name: string,
    age: number,
    isActive?: boolean
};

function createHero4(hero: HeroII): HeroII {
    const { name, age } = hero
    return { name, age, isActive: true}
}

const blackwidow = createHero4({name:'Blackwidow',age:45})
console.log(`\nINFERENCIA PARA OBJETOS CON TYPE ALIAS, DESTRUCTURING Y OPTIONAL PROPERTIES:\nHéroe se llama ${blackwidow.name}. Su edad es ${blackwidow.age}. ¿Está activo?: ${blackwidow.isActive}`);