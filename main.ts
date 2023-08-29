import * as crypto from 'crypto';

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


//? Inferencia para Funciones:
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


//? Objetos como Parámetros de una Función:

//! ({name: string,age: number})
// Esta sintaxis de objetos como parámetros no es permitida porque entra en colisión con Javascript y su permiso
// para renombrar la propiedad de un objeto.

//* Forma 1: 
function saludar2({name,age}: {name: string, age: number}){
    console.log(`\nOBJETOS COMO PARÁMETROS DE UNA FUNCIÓN (Forma 1):\nHola ${name}, tienes ${age} años.`);
}
saludar2({name:'Felipe',age:76});

//* Forma 2: 
function saludar3(persona: {name: string, age: number}){
    const { name, age } = persona;
    console.log(`\nOBJETOS COMO PARÁMETROS DE UNA FUNCIÓN (Forma 2):\nHola ${name}, tienes ${age} años.`);
}
saludar3({name:'Felipe',age:76});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Tipo de Dato de Retorno:
// La sintaxis propone indicar los tipos de datos de los parámetros que son un objeto y después el tipo de dato que espera retornar una función.

function saludar4({name,age}: {name: string, age: number}) : number{
    return age;
}

const saludar4Age = saludar4({name:'Felipe',age:76});

console.log(`\nTIPO DE DATO DEL RETURN DE UNA FUNCIÓN:\nEdad extraída de la función: ${saludar4Age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Funciones que Reciben Funciones como Parámetros (Callbacks):
// Al momento de realizar este procedimiento se debe tener en cuenta que no se puede definir el tipo Function para el parámetro "fn" puesto que al
// igual que el resto de los tipos de datos, éste sería el "any" para funciones.

/* 

!const sayHiFromFunction = (fn) => {
!    return fn('Felipe');
!}

!sayHiFromFunction((name)=> {
!    console.log(`\nFUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHola ${name}`)
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
    let cadena = `\nFUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHolaqweqwe ${name}.`;
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
    let cadena = `\nFUNCIONES QUE RECIBEN FUNCIONES COMO PARÁMETRO (Callback):\nHolaqweqwe ${name}.`;
    return cadena;
}
console.log(sayHiFromFunction(sayHi)); 
*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Tipado de Arrow Functions:
// De la misma manera que se trataron los ejemplos anteriores, el tipado de una arrow function sugiere dos formas de aplicarse:

// La primera es que se coloquen directamente en los parámetros el tipo de dato que se desea para cada uno, al igual que el tipo de dato que espera
// retornar.
const sumar = (a: number, b: number): number => {
    return a + b;
}
console.log(`\nTIPADO DE ARROW FUNCTIONS (Forma 1):\nEl resultado de la operación es: ${sumar(5,7)}`);

// La segunda indica, después del nombre de la variable, indicar el tipo de dato de los parámetros, el tipo de dato que retornará y por último la arrow
// function.
const restar: (a: number, b: number) => number = (a,b) => {
    return a - b;
}
console.log(`\nTIPADO DE ARROW FUNCTIONS (Forma 2):\nEl resultado de la operación es: ${restar(5,7)}`);

//* Cabe recalcar que para estos ejemplos, al ser sumas y restas de un mismo tipo de dato (number), no es necesario colocar el tipo de dato que retornarán
//* las funciones puesto que al ser operaciones matemáticas la inferencia de typescript sabrá que se devolverá un "number".


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Funciones que Nunca Devolverán Nada (Uso del "never"):

// El tipo de dato "never" se utiliza para funciones que no devolverán nada en su ejecución. És importante principalmente utilizado para evitar problemas
// al intentar guardar alguna variable

function throwError(message: string): never {
    throw new Error(message);
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Funciones Anónimas según el Contexto:

console.log(`\nFUNCIONES ANÓNIMAS SEGÚN EL CONTEXTO:`)

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


//? Objetos:

// La los objetos nos limita a que tengamos una especie de "contrato" con ellos, es decir, no podemos modificar con otro tipo de dato
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

console.log(`\nOBJETOS:\nHéroe se llama ${thor.name}. Su edad es ${thor.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Objetos con Type Alias:

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

console.log(`\nOBJETOS CON TYPE ALIAS:\nHéroe se llama ${hulk.name}. Su edad es ${hulk.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Objetos con Type Alias y Destructuring:

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
console.log(`\nOBJETOS CON TYPE ALIAS Y DESTRUCTURING:\nHéroe se llama ${hawkeye.name}. Su edad es ${hawkeye.age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Objetos con Type Alias, Destructuring y Optional Properties:

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
console.log(`\nOBJETOS CON TYPE ALIAS, DESTRUCTURING Y OPTIONAL PROPERTIES:\nHéroe se llama "${blackwidow.name}". Su edad es ${blackwidow.age}. Estado Activo: ${blackwidow.isActive}`);

/* 

* Optional Chaining

El "optional chaining" (encadenamiento opcional) es una característica introducida en TypeScript y en otros lenguajes de programación como JavaScript para
tratar con propiedades anidadas en objetos y evitar errores cuando una propiedad en la cadena de acceso puede ser nula o indefinida.

En situaciones normales, cuando intentas acceder a una propiedad anidada en un objeto y alguna de las propiedades en la cadena de acceso es nula o indefinida, se producirá un 
error de tipo "Cannot read property 'propiedad' of null/undefined". El "optional chaining" resuelve este problema al permitirte acceder a propiedades anidadas de forma 
segura, evitando estos errores.

*/

// Para el tema del Optional Chaining, existen varias formas de controlar a lo que se puede acceder de un objeto y a lo que no.

// La primera forma es predefinir en el "type" que se está creando, la propiedad a la que necesitemos que no se pueda acceder para modificar, es decir, que sólo sea de lectura.

// Existe un problema con esta forma de manejar el modo de sólo lectura de una propiedad de un objeto, y es que al momento de compilar  el código de TS a JS no "transifere"
// la orden de que sea sólo de lectura la propiedad en concreto, la pasa por alto y el código de JS sí permite que se pueda modificar.

type HeroIII = {
    readonly id?: number,
    name: string,
    age: number,
    isActive?: boolean
};

function createHero5(hero: HeroIII): HeroIII {
    const { name, age } = hero
    return { name, age, isActive: true}
}

const naruto = createHero5({name:'Naruto', age:30})
console.log(`\nOBJETOS CON TYPE ALIAS, DESTRUCTURING Y OPTIONAL CHAINING (readonly):\nHéroe se llama "${naruto.name}". Su edad es ${naruto.age}. Estado Activo: ${naruto.isActive}`);

//! naruto.id = 'Hola' <--- En compilación JS permite realizar las modificaciones pasando por alto el readonly de previamente configurado del type de este objeto.

// La segunda forma es utilizando el método para objetos Object.freeze(). Este método es directo de JS, así que al momento de compilar y pasar de TS a JS, el objeto
// entero será sólo de lectura (sea inmutable).

type HeroIV = {
    id?: number,
    name: string,
    age: number,
    isActive?: boolean
};

function createHero6(hero: HeroIV): HeroIV {
    const { name, age } = hero
    return { name, age, isActive: true}
}

const luffy = Object.freeze(createHero6({name:'Luffy', age:20}));
console.log(`\nOBJETOS CON TYPE ALIAS, DESTRUCTURING Y OPTIONAL CHAINING (Object.freeze()):\nHéroe se llama "${luffy.name}". Su edad es ${luffy.age}. Estado Activo: ${luffy.isActive}`);

//! luffy.age= 19; <---- Este código al igual que en la primera forma arroja un error, la diferencia está en que al momento de compilarlo a JS éste seguirá igualmente allí.


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia con Union Type, Template Union Type e Intersection Types:


/* 

* Union Type:
Te permite definir un tipo que puede ser uno de varios tipos posibles. En otras palabras, puedes combinar varios tipos en uno solo y una variable 
de este tipo puede contener un valor de cualquiera de los tipos especificados. Se definen utilizando el operador de tubería | entre los tipos.

* Template Union Type:
Son una característica específica de TypeScript que se introdujo en la versión 4.1. Te permiten crear tipos que son combinaciones específicas de 
cadenas literales (template literals). Esto es especialmente útil cuando deseas definir un tipo que acepta solo ciertos valores específicos en 
un patrón determinado.

* Intersection Types:
Es un concepto que te permite combinar varios tipos en uno solo, de manera que el nuevo tipo resultante contenga todas las propiedades y características 
de los tipos originales. En otras palabras, un tipo de intersección representa un conjunto de propiedades y métodos que existen en todos los tipos 
intersecados.

*/

//* Template Union Type

type HeroID = `${string}-${string}-${string}-${string}-${string}`;

type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal';

type HeroBasicInfo = {
    name: string,
    age: number,
}

type HeroProperties = {
    readonly id?: HeroID,    
    isActive?: boolean,
    powerScale?: HeroPowerScale
}

type HeroV = HeroBasicInfo & HeroProperties;

function createHero7(input: HeroBasicInfo): HeroV {
    const { name, age } = input
    return { 
        id: crypto.randomUUID(),
        name, 
        age, 
        isActive: true,
        powerScale:'multiversal'
    }
}

const kaido = createHero7({name:'Kaido',age:75})

console.log(`\nOBJETOS CON TEMPLATE UNION TYPE E INTERSECTION TYPE:\nID del Héroe: "${kaido.id}". Héroe se llama: "${kaido.name}". Su edad es: ${kaido.age}. Estado Activo: ${kaido.isActive}. Escala de Poder: ${kaido.powerScale}.`);


//* UNION TYPE

const enableAnimationDurationI: boolean | number = 200; // 200ms
const enableAnimationDurationII: boolean | number = true; // if true return 200ms

console.log(`\nOBJETOS CON UNION TYPE:\nIndicando la duración de la animación directamente: ${enableAnimationDurationI}. Indicando la activación de la duración ya previamente definida: ${enableAnimationDurationII}`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia con Type Indexing:

/* 

TypeScript se refiere a la capacidad de acceder a propiedades de un tipo utilizando un tipo de índice. Esto es similar a cómo accedes a los elementos 
de un array o las propiedades de un objeto mediante su clave.

*/

type HeroPropertiesII = {
    isActive: boolean,
    address: {
        planet: string,
        city: string
    }
}

const addressHero: HeroPropertiesII['address'] = {
    planet:"Earth",
    city:"New York"
}

console.log(`\nOBJETOS CON TYPE INDEXING:\nPlaneta del Héroe: ${addressHero.planet}. Ciudad del Héroe: ${addressHero.city}`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Inferencia con Type from:

// Es la capacidad que tiene Typescript de indicar que una nueva variable o tipo de dato, será idéntico al que le estamos pasando como referencia.

//* Básico (from Value):

const address = {
    planet: 'Earth',
    city: 'Wisconsin'
}

type AddressI = typeof address;

const addressShowI: AddressI = {
    planet: 'Earth',
    city: 'Medellín'
}

console.log(`\nOBJETOS CON TYPE FROM (Value):\nPlaneta: ${addressShowI.planet}. Ciudad: ${addressShowI.city}`);

//* Avanzado (from Function Return):

function createAddress(){
    return {
        planet: 'Earth',
        city: 'Barcelona'
    }
}

type AddressII = ReturnType<typeof createAddress>

const addressShowII: AddressII = {
    planet: 'Earth',
    city: 'París'
}

console.log(`\nOBJETOS CON TYPE FROM (Return Function):\nPlaneta type de Muestra: ${createAddress().planet}. Ciudad type de Muestra: ${createAddress().city}. Planeta type Utilizado: ${addressShowII.planet}. Ciudad type Utilizada: ${addressShowII.city}`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Arrays:

// Si definimos de una forma convencional un array, Typescript lo va a tomar como un type "never", es decir, que nunca tendrá nada. Ejemplo:

/* 
! Type: "never".
const languages = [];

! Argumento de tipo "string" no es asignable en un tipo "never"
languages.push('JavaScript'); 
*/

// Existen 2 formas de darle el tipo de dato a un Array:

//* Forma 1:
const languagesI: string[] = [];

//* Forma 2:
const languagesII: Array<string> = [];

// Así mismo existen dos formas de indicar que el array puede recibir más de dos tipos de datos:

//* Forma 1:
const languagesIII: (string | number)[] = [];

languagesIII.push('Python');
languagesIII.push(25);
//! languagesIII.push(true); <--- Devuelve error puesto que no se le ha indicado que este tipo de dato lo recibirá el array.

console.log(`\nARRAYS (Multi Type Form):\n${languagesIII}`);

//* Forma 2:
const languagesIV: Array<(string | number)> = [];

languagesIV.push('C#');
languagesIV.push(25);
//! languagesIV.push(true); <--- Devuelve error puesto que no se le ha indicado que este tipo de dato lo recibirá el array.

console.log(`\nARRAYS (Multi Type Form):\n${languagesIV}`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Arrays con Types para Objetos:

// En este caso podemos observar cómo puede crearse un array con un type custom para objetos.

type ExampleArrayBasicInfo = {
    id?: string | number,
    name: string,
    age: number
}

const peopleBasicInfo: ExampleArrayBasicInfo[] = [];

peopleBasicInfo.push({id:1,name:'Felipe',age:25})

console.log(`\nARRAYS (con types de Objetos):\nID: ${peopleBasicInfo[0].id}, Nombre: ${peopleBasicInfo[0].name}, Edad: ${peopleBasicInfo[0].age}.`);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Matríces y Tuplas:

// En este ejercicio se está haciendo uso de diferentes herramientas/temas que se han visto en partes anteriores, convirtiéndolo en un ejemplo robusto 
// de un uso más avanzado de typescript.

// Primeramente parametrizamos el tipo de datos que van a recibir las celdas, es decir, cada una de las posiciones de los arrays.
type CellValue = 'X' | 'O' | ''

// Segundo parametrizamos el tipo de dato que llevará el Game Board. Indicamos que va a ser un array que dentro de él tendrá 3 array con 3 posiciones
// cada uno y que estas 3 posiciones serán datos parametrizados con CellValue previamente creado.
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]

// Por último creamos el array final con los parámetros establecidos en los types creados anteriormente.
const gameBoard: GameBoard = [
    ['O','X','O'],
    ['X','X','X'],
    ['X','O','X'],
]

/* gameBoard.forEach((value) => {
    value.forEach(i=>{
        console.log(i)
    })
    console.log('\n')
}) */


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Enums

/* 

Los enums en TypeScript son un tipo de datos que permiten definir un conjunto de constantes con nombre. Los enums permiten documentar la intención de 
una variable o crear un conjunto de casos distintos. TypeScript proporciona enums numéricos y basados en cadenas. Los enums numéricos se definen usando 
la palabra clave enum y pueden ser inicializados con un valor numérico o no inicializados. Los enums basados en cadenas se definen de manera similar a 
los enums numéricos, pero cada miembro debe ser inicializado con una cadena literal.

*/

//! Forma incorrecta:

function mostrarMensajeErrorI(tipoDeError: string){
    if(tipoDeError === 'notFound'){
        console.log('No se encuentra el recurso');
    }else if (tipoDeError === 'unauthorized'){
        console.log('No tiene permisos para realizar esta acción.');
    }else if (tipoDeError === 'forbidden') {
        console.log('No tienes permisos para acceder');
    }
}

console.log(`\nENUMS JavaScript (Forma incorrecta):\nMensaje de Error:`);
mostrarMensajeErrorI('notFound');


//* Forma Correcta para JavaScript:

const ERROR_TYPESJS = {
    NOT_FOUND: 'notFound',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden'
}

function mostrarMensajeErrorII(tipoDeError: string){
    if(tipoDeError === ERROR_TYPESJS.NOT_FOUND){
        console.log('No se encuentra el recurso');
    }else if (tipoDeError === ERROR_TYPESJS.UNAUTHORIZED){
        console.log('No tiene permisos para realizar esta acción.');
    }else if (tipoDeError === ERROR_TYPESJS.FORBIDDEN) {
        console.log('No tienes permisos para acceder');
    }
}

console.log(`\nENUMS JavaScript (Forma Correcta):\nMensaje de Error:`);
mostrarMensajeErrorII(ERROR_TYPESJS.UNAUTHORIZED);

//* Forma Correcta para Typescript:

// En typescript se utilizan los enums para una colección de datos finitos. Al momento de definir un enum, cada una de las propiedades dentro de él
// recibe una posición comenzando desde el 0 (es conveniente el no abusar de la cantidad de propiedades que se crean en un enum).

//* Algo muy importante a tener en cuenta es que al momento de definir el enum, es muy recomendable, por temas de código JS generado después de la 
//* compilación, el hecho de colocarle un tipo 

enum ERROR_TYPESTS{
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

function mostrarMensajeErrorIII(tipoDeError: ERROR_TYPESTS){
    if(tipoDeError === ERROR_TYPESTS.NOT_FOUND){
        console.log('No se encuentra el recurso');
    }else if (tipoDeError === ERROR_TYPESTS.UNAUTHORIZED){
        console.log('No tiene permisos para realizar esta acción.');
    }else if (tipoDeError === ERROR_TYPESTS.FORBIDDEN) {
        console.log('No tienes permisos para acceder');
    }
}

console.log(`\nENUMS Typescript (Forma Correcta):\nMensaje de Error:`);
mostrarMensajeErrorIII(ERROR_TYPESTS.UNAUTHORIZED);

//* El uso del const en el enum varía dependiendo de los casos. Se utiliza en la mayoría de ocasiones para no generar código de más al momento de la 
//* compilación a JavaScript. Pero se utiliza el enum sin el const cuando se quiere que el objeto que se generó con el enum se consuma fuera del proyecto,
//* es más recomendable que no lo lleve. Resumidamente, depende del caso de uso.


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Aserciones de Tipos:

// Muchas veces al momento de referenciar elementos HTML el mismo TypeScript no es capaz de generar la inferencia para reconocer estos elementos.
// Para ello se utilizan las aserciones de tipos, aunque tienen una definición más amplia la cual indica que le permite al compilador saber el tipo 
// de una variable.

// Uno de los mejores ejemplos que pueden tener las aserciones de tipos es al momento en el cual estamos referenciando elementos HTML en nuestro
// código typescript.

/* 

const canvas = document.getElementById('canvas');

if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    console.log('Entra al condicional.')
} 

*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//? Aserciones Fetching:

