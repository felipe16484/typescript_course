# Curso de Typescript

¿Qué es Typescript?

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