$(function(){
	storage = window.localStorage;
	//storage.clear();
	storage.setItem('score',"0");
	$("#saveButton").attr("disabled",false);
	var array = ["one","two","three","four","five"];
	chart = createChart();

	if (storage.getItem("one") == null)
			createLocalHistory(array,storage);

	updateValues(array,storage,chart);
	// Modifico el tiempo por defecto de las transiciones del carousel. 
	var carouselId = "#first-carousel";
	$(carouselId).carousel({interval: 7000});

	var theme = storage.getItem("theme");
	if (theme == null){		
		localStorage.setItem('theme','theme-light');
	} else if (theme == 'theme-dark'){
		localStorage.setItem('theme','theme-light');
		toggleTheme();
	}
	
	
	
	//Evento que por cada tecla presionada dentro de el campo de texto de password, verifica cuan segura es la password a medida que se va tecleando, reflejando el resultado en la progress bar
	
	$("#pass").keyup(function(){
		var value = chkPass($("#pass").val());
		modifyProBar(value);	
		$("#saveButton").toggleClass('disabled');
		$("#saveButton").attr("disabled", false);
		storage.setItem('score',value);
	});

	$("#mode").click(function(){
		toggleTheme();	
		console.log("toggle");
	});

	$("#saveButton").click(function(){
			saveResult(array,storage);	
			updateValues(array,storage,chart);
			$("#saveButton").toggleClass('disabled');
			$("#saveButton").attr("disabled", true);
		
	});
	
});

function updateValues(array,storage,chart){ 
	loadLocalHistory(array,storage,chart);
	setAverage(array,storage);
};

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


function loadLocalHistory(array,storage,chart){
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
			} else if (value >= 51 && value <= 70) {
				updateBgData[i] = 'rgba(91, 192, 222, 0.2)';
			} else if (value >= 71 && value <= 100) {
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
	/*chart.data.datasets.data = updateData;
	chart.data.datasets.backgroundColor = updateBgData;*/
};


function createLocalHistory(array, storage){
	for (var i = 0; i < array.length; i++)
		storage.setItem(array[i],"0");
};
function saveResult(array,storage){
	var i;
	
	var value;
	var toInsert;
	var	score = parseInt(storage.getItem("score"));
	if (score > 0){
		// We are looking for a free place.
		toInsert = array[0];
		
		for (i = 4; i > 0; i--){
			storage.setItem(array[i],storage.getItem(array[i-1]));
		}
			
		if (score < 0)
			score = 0;	
		else if(score > 100)
			score = 100;

		storage.setItem(toInsert,score);	
	}
	
};

function setAverage(array,storage){
	var averageComponent = $("#average");
	var i;
	var average = 0;
	for (i = 0; i < 5; i++){
		average+= parseInt(storage.getItem(array[i]));
	}
	average = average/5;
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
	averageComponent.text(average+"%")


}

	
function toggleTheme(){
	var theme = storage.getItem("theme");
	if (theme == 'theme-light'){		
		localStorage.setItem('theme','theme-dark');
		$("#mode")
	} else {
		localStorage.setItem('theme','theme-light');
	}

	$('body').toggleClass("text-dark")
	$('body').toggleClass("text-light")

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
	} else {
		probar.attr("class","progress-bar progress-bar-striped bg-success");
		probar.text("¡INSUPERABLE!");
	}
	
};

function chkPass(pwd) {

	// Simultaneous variable declaration and value assignment aren't supported in IE apparently
	// so I'm forced to assign the same value individually per var to support a crappy browser *sigh* 
	var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphaUC="0", sAlphaLC="0", sNumber="0", sSymbol="0", sMidChar="0", sRequirements="0", sAlphasOnly="0", sNumbersOnly="0", sRepChar="0", sConsecAlphaUC="0", sConsecAlphaLC="0", sConsecNumber="0", sSeqAlpha="0", sSeqNumber="0", sSeqSymbol="0";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sSymbols = ")!@#$%^&*()";
	var nMinPwdLen = 8;


	nScore = parseInt(pwd.length * nMultLength);
	nLength = pwd.length;
	var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
	var arrPwdLen = arrPwd.length;
	
	/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
	for (var a=0; a < arrPwdLen; a++) {
		if (arrPwd[a].match(/[A-Z]/g)) {
			if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
			nTmpAlphaUC = a;
			nAlphaUC++;
		}
		else if (arrPwd[a].match(/[a-z]/g)) { 
			if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
			nTmpAlphaLC = a;
			nAlphaLC++;
		}
		else if (arrPwd[a].match(/[0-9]/g)) { 
			if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
			if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
			nTmpNumber = a;
			nNumber++;
		}
		else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
			if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
			if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
			nTmpSymbol = a;
			nSymbol++;
		}
		/* Internal loop through password to check for repeat characters */
		var bCharExists = false;
		for (var b=0; b < arrPwdLen; b++) {
			if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
				bCharExists = true;
				/* 
				Calculate icrement deduction based on proximity to identical characters
				Deduction is incremented each time a new match is discovered
				Deduction amount is based on total password length divided by the
				difference of distance between currently selected match
				*/
				nRepInc += Math.abs(arrPwdLen/(b-a));
			}
		}
		if (bCharExists) { 
			nRepChar++; 
			nUnqChar = arrPwdLen-nRepChar;
			nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
		}
	}
	
	/* Check for sequential alpha string patterns (forward and reverse) */
	for (var s=0; s < 23; s++) {
		var sFwd = sAlphas.substring(s,parseInt(s+3));
		var sRev = sFwd.strReverse();
		if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
	}
	
	/* Check for sequential numeric string patterns (forward and reverse) */
	for (var s=0; s < 8; s++) {
		var sFwd = sNumerics.substring(s,parseInt(s+3));
		var sRev = sFwd.strReverse();
		if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
	}
	
	/* Check for sequential symbol string patterns (forward and reverse) */
	for (var s=0; s < 8; s++) {
		var sFwd = sSymbols.substring(s,parseInt(s+3));
		var sRev = sFwd.strReverse();
		if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
	}
	
/* Modify overall score value based on usage vs requirements */

	/* General point assignment */
	$("nLengthBonus").innerHTML = "+ " + nScore; 
	if (nAlphaUC > 0 && nAlphaUC < nLength) {	
		nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
	}
	if (nAlphaLC > 0 && nAlphaLC < nLength) {	
		nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
	}
	if (nNumber > 0 && nNumber < nLength) {	
		nScore = parseInt(nScore + (nNumber * nMultNumber));
	}
	if (nSymbol > 0) {	
		nScore = parseInt(nScore + (nSymbol * nMultSymbol));
	}
	if (nMidChar > 0) {	
		nScore = parseInt(nScore + (nMidChar * nMultMidChar));
	}
			
	/* Point deductions for poor practices */
	if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
		nScore = parseInt(nScore - nLength);
		nAlphasOnly = nLength;
	}
	if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
		nScore = parseInt(nScore - nLength); 
		nNumbersOnly = nLength;
	}
	if (nRepChar > 0) {  // Same character exists more than once
		nScore = parseInt(nScore - nRepInc);
	}
	if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
		nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
	}
	if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
		nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
	}
	if (nConsecNumber > 0) {  // Consecutive Numbers exist
		nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
	}
	if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
		nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
	}
	if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
		nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
	}
	if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
		nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
	}
	
	if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
	if (nRequirements > nMinReqChars) {  // One or more required characters exist
		nScore = parseInt(nScore + (nRequirements * 2)); 
	}		
	return nScore;
	
};

// Funcion auxiliar de extensión para dar vuelta una cadena de caracteres
String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;

};