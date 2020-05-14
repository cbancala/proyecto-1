export{init, setListeners, createChart};
import {getPassScore, cleanHistory, createLocalHistory, saveResult, getAverage} from '../js/data_functions.js';

/*
	Inicializa componentes y setea las configuraciones iniciales de la web.
*/
function init(array,storage,chart){
	storage.setItem('score',"0");
	$("#saveButton").attr("disabled",false);

	// Verifico ya inicialice las variables del local storage para almacenar la puntuacion, si no es asi, creo el historial local. 
	if (storage.getItem("one") == null)
			createLocalHistory(array,storage);

	updateValuesToDisplay(array,storage,chart);
	// Modifico el tiempo por defecto de las transiciones del carousel. 
	$("#first-carousel").carousel({interval: 3000});

	// Verifico si cuento con el mapeo theme en el local storage. En caso de tenerlo, seteo el tema que corresponda. De lo contrario lo creo.
	var theme = storage.getItem("theme");
	if (theme == null){		
		localStorage.setItem('theme','theme-light');
	} else if (theme == 'theme-dark'){
		localStorage.setItem('theme','theme-light');
		toggleTheme(storage);
	}	
}

/*
	Función que inicializa el gráfico de la web. 
*/
function createChart(){
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {

    type: 'bar',
    data: {
        labels: ['1°', '2°', '3°', '4°', '5°'],
        datasets: [{
        	label: "Puntuación obtenida",
            data: [0, 100, 0, 100, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'            
            ],
            borderColor: [
                'rgba(41, 43, 44, 1)',
                'rgba(41, 43, 44, 1)',
                'rgba(41, 43, 44, 1)',
                'rgba(41, 43, 44, 1)',
                'rgba(41, 43, 44, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}, {responsive: true});
	return myChart;
};

/*
	Setea los distintos listeners.
*/
function setListeners(array,storage,chart) {
	//Evento que por cada tecla presionada dentro de el campo de texto de password, verifica cuan segura es la password a medida que se va tecleando, reflejando el resultado en la progress bar
	$("#pass").keyup(function(){
		checkPassListener(storage);
	});

	$("#mode").click(function(){
		toggleTheme(storage);	
	});

	$("#saveButton").click(function(){ 
		saveButtonListener(array,storage,chart)
	});
	
	$("#cleanHistory").click(function(){
		cleanHistory(array,storage);	
		updateValuesToDisplay(array,storage,chart);
		$("#saveButton").removeClass('disabled');
		$("#saveButton").attr("disabled", false);
	});
}

function checkPassListener(storage){
	var score = getPassScore($("#pass").val());
	modifyProBar(score);	
	$("#saveButton").removeClass('disabled');
	$("#saveButton").attr("disabled", false);
	storage.setItem('score',score);
}

function saveButtonListener(array,storage,chart){
	saveResult(array,storage);	
	updateValuesToDisplay(array,storage,chart);
	$("#saveButton").removeClass('disabled');
	$("#saveButton").attr("disabled", true);
};

/*
	Carga los datos del almacenamiento interno, los muestra en un grafico y tambien actualiza la informacion en relacion a los promedios.
*/
function updateValuesToDisplay(array,storage,chart){ 
	loadLocalHistoryIntoChart(array,storage,chart);
	updateAverageText(getAverage(array,storage));
};

/*
	Carga los valores de resultados almacenados en el almacenamiento interno, almacenandolos en un arreglo para luego mostrarlos por el grafico, con los correspondientes colores. 
*/
function loadLocalHistoryIntoChart(array,storage,chart){
	var value;
	var updateData = [0,0,0,0,0];
	var updateBgData = [0,0,0,0,0];

	for (var i=0; i < 5; i++){
		value = parseInt(storage.getItem(array[i]));
		if (value >= 0){
			updateData[i] = value;
			if (value >= 0 && value <= 25){
				updateBgData[i] = 'rgba(217, 83, 79, 0.2)';
			} else if (value >= 26 && value <= 50) {
				updateBgData[i] = 'rgba(240, 173, 78, 0.2)';
			} else if (value >= 51 && value <= 75) {
				updateBgData[i] = 'rgba(91, 192, 222, 0.2)';
			} else if (value >= 76 && value <= 100) {
				updateBgData[i] = 'rgba(92, 184, 92, 0.2)';
			}
		} else {
			updateData[i] = 0;
		}
	}
	chart.data.datasets.forEach((dataset) => {
        dataset.data = updateData;
        dataset.backgroundColor = updateBgData;
    });
    chart.update();
};


/*
	Muestra por pantalla el promedio recibido por parametro.
*/
function updateAverageText(average){
	var averageComponent = $("#average");
	averageComponent.removeClass("text-danger text-info text-warning text-success");
	if (average >= 0 && average <= 25){
		averageComponent.addClass("text-danger");
	} else if (average >= 26 && average <= 50) {
		averageComponent.addClass("text-warning");
	} else if (average >= 51 && average <= 70) {
		averageComponent.addClass("text-info");
	} else if (average >= 71 && average <= 100) {
		averageComponent.addClass("text-success");
	}

	averageComponent.text(average.toFixed(0));
	var avTextComponent = $("#avText");
	if (average > 0 && average < 70)
		avTextComponent.text("Tu promedio de puntuación se encuentra debajo de los valores aceptables. Te recomendamos que modifiques aquellas contraseñas cuyos resultados fueron menores a 70");
	else if (average >= 70)
		avTextComponent.text("Tu promedio de puntuación se encuentra por encima de los valores aceptables ¡felicitaciones!. A partir de ahora, te recomendamos continuar con estos consejos. También, cada cierto tiempo, deberías modificar tus contraseñas para seguir elevando tu seguridad.")
	else if(average == 0)
		avTextComponent.text("Comienza a almacenar contraseñas para ofrecerte más información");
}

/*
	Realiza los cambios necesarios en las clases de los componentes HTML para obtener un estilo oscuro.
*/
function toggleTheme(storage){
	var theme = storage.getItem("theme");
	if (theme == 'theme-light'){		
		localStorage.setItem('theme','theme-dark');
		$("#mode")
	} else {
		localStorage.setItem('theme','theme-light');
	}

	$('body').toggleClass("text-dark")
	$('body').toggleClass("text-light")
	$('body').toggleClass("bg-dark")

	$("#navbar").toggleClass('bg-light');
	$("#navbar").toggleClass('custom-dark-grey text-light');
	$("#firstContainer").toggleClass('text-dark');
	$("#firstContainer").toggleClass('bg-dark text-light');
	$("#secondContainer").toggleClass('text-dark');
	$("#secondContainer").toggleClass('bg-dark text-light');
	
	$("#firstJumbotron").toggleClass('bg-dark text-light');

	$("#thirdContainer").toggleClass('text-dark');
	$("#thirdContainer").toggleClass('bg-dark text-light');
	
	$("#footerNavBar").toggleClass('bg-light');
	$("#footerNavBar").toggleClass('custom-dark-grey');
}

/*
	Modifica la barra de progeso de la web, mostrando el valor recibido por parametro a través de su tamaño y con distintos colores.
*/
function modifyProBar(percentage){
	var probar = $("#probar");

	if (percentage < 0)
		probar.attr("style", "width:"+0+"%");	
	else if(percentage >= 0 && percentage <= 100)
		probar.attr("style", "width:"+percentage+"%");
	else 
		probar.attr("style", "width:"+100+"%");

	if (percentage <= 25){
		probar.attr("class","progress-bar progress-bar-striped bg-danger");
		if (percentage >=18)
			probar.text("MUY INSEGURA");
		else
			probar.text("");
	} else if (percentage >= 26 && percentage <= 50){
		probar.attr("class","progress-bar progress-bar-striped bg-warning");
		probar.text("INSEGURA");
	} else if (percentage >= 51 && percentage <= 75){
		probar.attr("class","progress-bar progress-bar-striped bg-info");
		probar.text("CORRECTA");
	} else if (percentage > 76){
		probar.attr("class","progress-bar progress-bar-striped bg-success");
		probar.text("¡INSUPERABLE!");
	}
	
};
