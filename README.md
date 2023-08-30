# Curso de Typescript

> Nota inicial
Para correr todo el curso completo se deben ejecutar los siguientes comandos:

Para instalar los módulos requeridos para la ejecución:
- npm install -D @types/node
- npm install axios

Para correr el curso entero después de la instalación de los módulos:
- npx ts-node main.ts

> ¿Qué es Typescript?

Es un lenguaje de programación que está basado Javascript, pero lo que hace es añadirle a éste último es un tipado más fuerte y robustés a la hora de desarrollar un proyecto grande. 
Lo que finalmente llega al navegador es el código que se compila de typescript transformado a Javascript. 

Éste lenguaje fue desarrollado sobre si mismo. Fue creado por Microsoft en el año 2012. Su creación nace a partir de la necesidad de transformar a Javascript que es un lenguaje débilmente tipado, a uno que sea totalmente fiable y fuera de problemas que con un grado más de tipado pueda brindar.

Typescript mejora la experiencia de desarrollo por medio de su trabajo de inferencia, lo que significa que automáticamente detecta el tipo de dato de una variable o algo con lo que vayamos a trabajar y brinda opciones en base a ello.

---

> Diferencia entre Type e Interface

En TypeScript, tanto type como interface son formas de definir estructuras de datos y formas de interactuar con ellas, pero tienen algunas diferencias clave en su uso y funcionalidad. Aquí hay una descripción de las diferencias entre type e interface:

**Interface**:

- Extensibilidad: Las interfaces son principalmente utilizadas para definir la forma de un objeto, especialmente cuando se trata de definir contratos para clases o estructuras. Son más adecuadas para casos en los que esperas que otras partes de tu código implementen o extiendan la interfaz.

- Declaración y fusión: Las interfaces se pueden declarar múltiples veces con el mismo nombre, y TypeScript las fusionará en una única interfaz. Esto permite que se agreguen propiedades o métodos a una interfaz existente desde diferentes lugares del código.

- Herencia múltiple: Las interfaces en TypeScript admiten la herencia múltiple, lo que significa que puedes extender varias interfaces en una sola declaración de interfaz.

Ejemplo de interface:

interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado extends Persona {
  puesto: string;
}


**Type**:

- Uniones y intersecciones más flexibles: Los tipos definidos con type permiten crear uniones y intersecciones de tipos de manera más flexible que las interfaces. Puedes utilizar tipos en situaciones donde necesitas trabajar con combinaciones complejas de tipos.

- Soporte para tipos primitivos y literales: Puedes usar type para definir tipos que representan literales, tipos primitivos y combinaciones de ellos.

- Alias de tipo: Puedes usar type para crear alias o nombres alternativos para tipos existentes. Esto puede hacer que tus tipos sean más descriptivos y legibles.

- Compatibilidad con asignación exacta: Los tipos definidos con type pueden ser más restrictivos en cuanto a la asignación exacta, lo que significa que pueden ser útiles para garantizar que los tipos sean idénticos en lugar de ser compatibles estructuralmente.

Ejemplo de type:

type Persona = {
  nombre: string;
  edad: number;
};

type Empleado = Persona & {
  puesto: string;
};

---

>Notas:
- Hay que tener presente de que TypeScript no funciona en entornos de ejecución. Lo que se ejecuta es la compilación del código realizado en TypeScript a JavaScript, es decir, se transforma el archivo .ts a .js y éste último es el que se ejecuta.
- Utilizar de forma nativa la extensión '.ts' en un archivo TypeScript está indicando que no permitirá la utilización de las funcionalidades para importar o exportar (import / export). Si estamos utilizando empaquetadores como por ejemplo 'Vite', éste mismo ya hace toda la configuración para que se puedan realizar estas funciones. La forma correcta para 'crear' desde 0 un archivo Typescript y poder hacer uso de las funcionalidades import y export es utilizando la extesión '.mts' para los archivos.
- Al momento de crear las interfaces, nos podemos dar cuenta que no colisionan 2 ó más interfaces con el mismo nombre siempre y cuando nunca lleven las mismas propiedades. Ésto quiere decir que al momento de crear una segunda con el mismo nombre, TypeScript automáticamente hace como si fuera un "extends" de la primera. Pero ya hablando de "types", si queremos hacer lo mismo, sí entrarán en colisión los "types" que lleven el mismo nombre.
- Se debe tener en cuenta que si se necesita que el documento '.ts' pueda acceder a funcionalidades para importar y exportar se debe cambiar la extensión del mismo a '.mts' la cual indica que el archivo utilizara éstas mismas.