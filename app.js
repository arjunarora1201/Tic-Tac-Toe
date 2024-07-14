let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let winnermsg = document.querySelector(".winner");
let lastClass = document.querySelector(".final");
let turn = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    lastClass.innerText = `Congratulations!! Winner is ${winner}`;
    winnermsg.classList.remove("hide");
}

const resetGame = () => {
    turn = true;
    enableBoxes();
    winnermsg.classList.add("hide");
    count = 0;
}
const gameDraw = () => {
    lastClass.innerText = `Game is a Draw.`;
    winnermsg.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner",pos1Val);
                disableBoxes();
                showWinner(pos1Val);
                return true;
            }  
        }
    }
}

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if(turn){
            box.innerText = "O";
            turn = false;
            box.disabled = true;
        }
        else{
            box.innerText = "X";
            turn = true;
            box.disabled = true;
        }

        count++;
        checkWinner();

        let isWinner = checkWinner();

        if(count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);