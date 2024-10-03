let gameBlock = document.querySelector(".game--container");
let gameStatus = document.querySelector(".game--status");
let reStart = document.querySelector(".game--restart");
turnSelector = ["Noobat O !", "Noobat X !", "X Bord :)", "O Bord :)", "Mosavi! :("];
gameStatus.innerHTML=turnSelector[1];
let colorFlag = true;
let xPlayer = true;
let gameConti = true ; 
let drawTest = 0;
let state = [ "", "", "", "", "", "", "", "", ""];
let winState = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let timer=["", "", "", ""];


gameBlock.onclick = event => {
    if( xPlayer && !(event.target.innerHTML) && gameConti){
        drawTest+=1;
        gameStatus.innerHTML=turnSelector[0];
        event.target.innerHTML = "X";
        state[event.target.getAttribute('data-cell-index')] = "X" ; 
        xPlayer = !xPlayer;
        for (let ws of winState){
            let i=0;
            while(state[ws[i]]=="X" && i<4){
                i++;
            }
            if(i==3){ 
                gameConti = false;
                gameStatus.innerHTML=turnSelector[2];
                for(let k=0;k<3;k++){
                    timer[k] = setInterval(()=>{
                        document.querySelectorAll(".cell")[ws[k]].style.backgroundColor = "	teal";
                        setTimeout(() => {
                            document.querySelectorAll(".cell")[ws[k]].style.backgroundColor = "blanchedalmond";
                        },100);
                    },200)
                }
                timer[3] = setInterval(()=>{
                    document.body.style.transition = "background-color 300ms ease";
                    if(colorFlag){
                        document.body.style.background = "deeppink";
                    }else{
                        document.body.style.background = "gold";
                    }
                    colorFlag = !colorFlag;
                },300);
                break;
            }
        }
        if(drawTest == 5 && gameStatus.innerHTML != turnSelector[2] ) {
            gameStatus.innerHTML=turnSelector[4];
            document.body.style.backgroundColor = "saddlebrown"
        }
    } else if ( !xPlayer && !(event.target.innerHTML) && gameConti ){
        gameStatus.innerHTML=turnSelector[1];
        event.target.innerHTML = "O";
        state[event.target.getAttribute('data-cell-index')] = "O" ; 
        for (let ws of winState){
            let i=0;
            while(state[ws[i]]=="O" && i<4){
                i++;
            }
            if(i==3){ 
                gameConti = false;
                gameStatus.innerHTML=turnSelector[3];
                for(let k=0;k<3;k++){
                    timer[k] = setInterval(()=>{
                        document.querySelectorAll(".cell")[ws[k]].style.backgroundColor = "lime";
                        setTimeout(() => {
                            document.querySelectorAll(".cell")[ws[k]].style.backgroundColor = "blanchedalmond";
                        },100);
                    },200)
                }
                timer[3] = setInterval(()=>{
                    document.body.style.transition = "background-color 300ms ease";
                    if(colorFlag){
                        document.body.style.backgroundColor = "deeppink";
                    }else{
                        document.body.style.backgroundColor = "gold";
                    }
                    colorFlag = !colorFlag;
                },300);
                break;
            }
        }
        xPlayer = !xPlayer;
    }
}

reStart.onclick = () => {
    document.querySelectorAll(".cell").forEach(cel => {
        cel.innerHTML = "";
        state[cel.getAttribute('data-cell-index')] = "";
    })
    for(let k=0;k<4;k++){
        clearInterval(timer[k]);
    }
    gameStatus.innerHTML=turnSelector[1];
    document.body.style.backgroundColor = "darkseagreen" ;
    xPlayer = true;
    gameConti = true;
    drawTest = 0;
}
