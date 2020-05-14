import {init, setListeners, createChart} from "../js/view.js";

$(function(){
	var storage = window.localStorage;
	var array = ["one","two","three","four","five"];
	var chart = createChart();
	// Inicializo componentes: seteo tema actual, score actual y otros.
	init(array,storage,chart);
	setListeners(array,storage,chart);
	
});