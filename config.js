var startAmt = 1500;
var constStartingAmt = 1500;
//var gameInProgress = false;

function initConfig() {
	updateDOM();	
}
function updateDOM() {

	var gameInProgress = localStorage.getItem("gameinprogress") == "true";
	
	if (gameInProgress) {
		document.getElementById("speed").setAttribute("disabled", "true");
		document.getElementById("input-start-amount").setAttribute("disabled", "true");
	} else {
		//reset(false);
		document.getElementById("speed").removeAttribute("disabled");
		document.getElementById("input-start-amount").removeAttribute("disabled");
	}

	document.getElementById("inprogressmessage").style.visibility =
		gameInProgress == "true" ? "visible" : "hidden";
		
	setInputVal("input-p1", "p1name");
	setInputVal("input-p2", "p2name");
	setInputVal("input-p3", "p3name");
	initCheckBox("speed", "speeddice");
	initCheckBox("debug", "debugmode");
	initCheckBox("test", "testmode");
	document.getElementById("input-start-amount").value = localStorage.getItem("startamount");
}
function updateStartingAmount() {
	if (localStorage.getItem("speeddice") == "true") {
		startAmt = constStartingAmt + 1000;
	} else {
		startAmt = constStartingAmt;
	}
}
function updateBalances() {
	var start = getInputVal("input-start-amount");
	
	localStorage.setItem("startamount", start);
	
	var bankStartingAmount = 20580 - (start * 3);
	localStorage.setItem("p0balance", bankStartingAmount);				
	localStorage.setItem("p1balance", start);
	localStorage.setItem("p2balance", start);
	localStorage.setItem("p3balance", start);
	localStorage.setItem("p4balance", 0);
}
function saveChanges() {
	//Only allow names to be updated if a game is in progress
	var gameInProgress = localStorage.getItem("gameinprogress") == "true";
	if (gameInProgress) {
		localStorage.setItem("p1name", getInputVal("input-p1"));
		localStorage.setItem("p2name", getInputVal("input-p2"));
		localStorage.setItem("p3name", getInputVal("input-p3"));
	} else {	
		localStorage.setItem("p1name", getInputVal("input-p1"));
		localStorage.setItem("p2name", getInputVal("input-p2"));
		localStorage.setItem("p3name", getInputVal("input-p3"));
		localStorage.setItem("speeddice", document.getElementById("speed").checked);
		localStorage.setItem("debugmode", document.getElementById("debug").checked);
		localStorage.setItem("testmode", document.getElementById("test").checked);	
		
		updateBalances();
	}
	
	localStorage.setItem("p0name", "Bank");
	localStorage.setItem("configsaved", "true");
	localStorage.setItem("p4name", "Free Parking");
}
function getInputVal(id) {
	return document.getElementById(id).value;
}		
function setInputVal(id, storageKey) {
	document.getElementById(id).value = localStorage.getItem(storageKey);
}
function initCheckBox(id, storageKey) {
	if (localStorage.getItem(storageKey) == "true") {
		document.getElementById(id).checked = true;
	} else {
		document.getElementById(id).checked = false;
	}
}
function reset(prompt) {
	//if (prompt) {	
		if (confirm("Are you sure you want to reset?")) {
			resetPlayerNames();
			resetConfig();
			resetBalances();
			resetUndo();
			resetChart();
			updateDOM();
			
			document.getElementById("speed").removeAttribute("disabled");
			document.getElementById("input-start-amount").removeAttribute("disabled");
			
			/*gameInProgress = localStorage.getItem("gameinprogress") == "true";
			if (gameInProgress) {
				document.getElementById("speed").setAttribute("disabled", "true");
				document.getElementById("input-start-amount").setAttribute("disabled", "true");
			} else {
				reset(false);
				document.getElementById("speed").removeAttribute("disabled");
				document.getElementById("input-start-amount").removeAttribute("disabled");
			}	*/		
		}
	//} else {
	//	resetPlayerNames();
	//	//resetConfig();
	//	resetBalances();
	//}
}
function resetPlayerNames() {
	localStorage.setItem("p0name", "Bank");
	localStorage.setItem("p1name", "Player 1");
	localStorage.setItem("p2name", "Player 2");
	localStorage.setItem("p3name", "Player 3");
	localStorage.setItem("p4name", "Free Parking");
}
function resetConfig() {
	localStorage.setItem("configsaved", "false");
	localStorage.setItem("speeddice", "true");	
	localStorage.setItem("debugmode", "false");
	localStorage.setItem("testmode", "false");
}
function resetBalances() {
	updateStartingAmount();

	localStorage.setItem("startamount", startAmt);
	localStorage.setItem("gameinprogress", false);
	
	var bankStartingAmount = 20580 - (startAmt * 3);
	localStorage.setItem("p0balance", bankStartingAmount);				
	localStorage.setItem("p1balance", startAmt);
	localStorage.setItem("p2balance", startAmt);
	localStorage.setItem("p3balance", startAmt);
	localStorage.setItem("p4balance", 0);
}
function resetUndo() {
	localStorage.setItem("lastFrom", '');
	localStorage.setItem("lastTo", '');
	localStorage.setItem("lastAmount", '');
}
function resetChart() {
	localStorage.setItem("p1history", JSON.stringify([startAmt]));
	localStorage.setItem("p2history", JSON.stringify([startAmt]));
	localStorage.setItem("p3history", JSON.stringify([startAmt]));
	localStorage.setItem("xcategoryhistory", JSON.stringify([]));
}