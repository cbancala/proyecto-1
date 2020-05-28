# Proyecto 1:  HTML - CSS - Javascript - DOM

**Fecha de entrega:** 14 de Mayo de 2020 (inclusive).

## **Introducción**

El proyecto consiste en la implementación de una aplicación web utilizando las tencnologías HTML, CSS y Javascript. Se permite la utilización de librerías Javascript Open Source, siempre y cuando se otorguen los créditos correspondientes a el o los autores:
* [Algoritmo para comprobar la fortaleza de una pw](http://www.passwordmeter.com/)
* [JQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Chart](https://www.chartjs.org/) (junto a [PopperJS](https://popper.js.org/) requerido para su funcionamiento)
* [FontAwesome](https://fontawesome.com/)

## **Funcionalidad**

La web representa una herramienta para determinar cuán segura es una password. 

* El usuario puede ingresar información en un campo de texto y existe un algoritmo que se ejecuta sobre dicha entrada. 
* Por cada caracter tecleado, se visualiza una puntuación a través de una barra de progreso. 
* Además, permite guardar las puntuaciones obtenidas: mantiene un registro de los últimas cinco, acompañado de información al respecto.
* Posee dos temas diferentes.
* El navegador recuerda cualquier cambio que el usuario haga en la aplicación para la próxima vez que el mismo acceda a la página.

## **Otras consideraciones**

* Documento **válido HTML5**. 
* **Funcionando para**: Chromium, Chrome para Android, Firefox, Firefox para Android, Microsoft Edge (based on Chromium).
* Sobre las imagenes utilizadas: en principio consideré el uso de imagenes en formato webp. Es un formato cuyos archivos son más livianos que los archivos almacenados en formatos tradicionales. Esto contribuye a una carga más rápida de la web. A pesar de esto, personas con iOS y MacOS me comentaron que no podían ver las imagenes. En la web encontré que Safari no incorpora webp. Luego de esto, a costa del rendimiento, decidí pasar todo a los formatos conocidos (jpg y png) para hacer posible su correcta visualización en más navegadores. Webp tampoco es soportado por Internet Explorer.