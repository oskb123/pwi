const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector('#statusText');
const restartButton = document.querySelector('#restartButton');
const opplayerbutton = document.querySelector('#withopp'); 
const aibutton = document.querySelector('#ai');


let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let count = 0;
let gamestatus = false;
let previous = false;
let aistatus = false;

choose();

function choose(){
	statusText.textContent = "Wybierz rodzaj gry";
	aibutton.addEventListener("click", ai);
	opplayerbutton.addEventListener("click", op);
}


function ai(){
	aistatus = true;
	if (previous==true)
	{
		restart();
	}
	start();
}

function op(){
	if (previous==true)
	{
		restart();
	}
	start();
}

function start(){
	
	boxes.forEach(box => box.addEventListener("click", click));
	restartButton.addEventListener("click", restart);
	statusText.textContent = `Ruch gracza: ${currentPlayer}`;
	gamestatus = true;
	
}

function click(){
	const boxIndex = this.getAttribute("boxIndex");
	
	if(!options[boxIndex] && gamestatus == true){     //sprawdzamy czy puste, jak tak to mozna zaktualizowac
		options[boxIndex] = currentPlayer;
		this.textContent = currentPlayer;              //options[boxindex] to X lub 0 
		count += 1;
		
		
		checkwin();
	
		if(checkwin()==true){
			count = 0;
			gamestatus = false;
			previous = true;
			return;
		}
		if (!checkwin() && count == 9){
			statusText.textContent = `Remis`;
			count = 0;
			gamestatus = false;
			previous = true;
			return;		
		}
	
		if(currentPlayer == "X"){
			currentPlayer="O";
		}
		else if (currentPlayer=="O"){
			currentPlayer="X";
		}	
		statusText.textContent = `Ruch gracza: ${currentPlayer}`;
	}
}


//wygrane kombinacje mozna tez podwojna petle po nich
	// [0, 1, 2],
	// [0, 3, 6],
	// [0, 4, 8],
	// [1, 4, 7],
	// [2, 5, 8],
	// [2, 4, 6],
	// [3, 4, 5],
	// [6, 7, 8],

function checkwin(){
	
	if(options[0] == currentPlayer){
		if(options[1] == currentPlayer && options[2] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
		if(options[3] == currentPlayer && options[6] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
		if(options[4] == currentPlayer && options[8] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;		
		}		
	}
	if(options[8] == currentPlayer){
		if(options[6] == currentPlayer && options[7] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
		if(options[2] == currentPlayer && options[5] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
	}
	if(options[4] == currentPlayer){
		if(options[3] == currentPlayer && options[5] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
		if(options[1] == currentPlayer && options[7] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
		if(options[2] == currentPlayer && options[6] == currentPlayer)
		{
			statusText.textContent = `wygral gracz: ${currentPlayer}`;
			return true;
		}
	}	
}

function restart(){

	statusText.textContent = 'Kliknij by rozpocząć';
	currentPlayer = "X";
	options = ["", "", "", "", "", "", "", "", ""];
	boxes.forEach(box => box.textContent = "");
	gamestatus = true;
	
}