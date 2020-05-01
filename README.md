# Proyecto 1:  HTML - CSS - Javascript - DOM

**Fecha de entrega:** 14 de Mayo de 2020 (inclusive).

## **Introducción**

El proyecto consiste en la implementación de una aplicación web utilizando las tencnologías HTML, CSS y Javascript. Se permite la utilización de librerías Javascript Open Source, siempre y cuando se otorguen los créditos correspondientes a el o los autores:
* Algoritmo para comprobar la fortaleza de una pw: http://www.passwordmeter.com/
* JQuery: https://jquery.com/
* Bootstrap: https://getbootstrap.com/
* Chart https://www.chartjs.org/ (junto a PopperJS https://popper.js.org/ requerido para su funcionamiento)
* FontAwesome: https://fontawesome.com/

## **Funcionalidad**

La web representa una herramienta para determinar cuán segura es una password. 

* El usuario puede ingresar información en un campo de texto y existe un algoritmo que se ejecuta sobre dicha entrada. 
* Por cada caracter tecleado, se visualiza una puntuación a través de una barra de progreso. 
* Además, permite guardar las puntuaciones obtenidas: mantiene un registro de los últimas cinco, acompañado de información al respecto.
* Posee dos temas diferentes, el usuario puede elegir uno de ellos.
* El navegador recuerda cualquier cambio que el usuario haga en la aplicación para la próxima vez que el mismo acceda a la página.

## **Otras consideraciones**


* Documento **válido HTML5**. Solo contiene dos warnings debido a componentes que no se encuentran inicializados con texto, pero que son completos luego de que se hace un uso normal de la web.
* Probado en: Chromium, Chrome mobile, Firefox.
* Pendiente: modularización de la logica implementada en el js.