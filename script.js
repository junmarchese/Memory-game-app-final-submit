let state = {
    matched: 0, 
    matchedIndex: [], 
    cardOne: null, 
    cardTwo: null,
    currentScore: 0,
    lowestScore: localStorage.getItem("low-score") ? +localStorage.getItem("low-score") : false ,
    screen: 1, 
    disable: false, 
    imageList: shuffle([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8])
}

const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartButton");

function shuffle(array) { 
    let currentIndex = array.length,  randomIndex; 

    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--; 

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array; 
}

function flipCard (e){ 
    let cardId = e.currentTarget.getAttribute("data-index"); 
    let imageId = e.currentTarget.getAttribute("data-image"); 
    if(state.disable){console.log("disabled")} 

    if(!state.disable && state.cardOne?.cardId != cardId ){ 
        state.currentScore++; 

        if(state.cardOne){  
            state.disable = true;
            state.cardTwo = {cardId, imageId}; 

             if(state.cardOne.imageId === state.cardTwo.imageId){
                state.matched++;
                state.matchedIndex.push(+state.cardOne.cardId);
                state.matchedIndex.push(+state.cardTwo.cardId);
                state.disable = true;

                if(state.matched ==  state.imageList.length/2 ){
                    if (state.lowestScore ==  false || state.currentScore < state.lowestScore) {
                        state.lowestScore = +state.currentScore;
                        localStorage.setItem("low-score", state.currentScore);
                    }

                    state.screen = 3;
                    render();
                } else {
                    setTimeout(function() {
                    state.disable = false;
                    state.cardOne = null;
                    state.cardTwo = null;
                    render();
                    }, 1000); 
                }
            } else {
                setTimeout(function() {
                    state.disable = false;
                    state.cardOne = null;
                    state.cardTwo = null;
                    render();
                }, 1000); 
            }

        } else {
            state.cardOne = {cardId, imageId};
        }
    }
    render();
}


function renderCards() {

    let gameEl =  document.querySelector("#game .cards-wrapper");
    gameEl.innerHTML = ""; 

    for(let i = 0; i < state.imageList.length; i++){
        const liEl = document.createElement("li");
        liEl.classList.add("card");

        if(state.cardOne?.cardId == i || state.cardTwo?.cardId == i || state.matchedIndex.includes(i)){
            liEl.classList.add("flip")
        }

        liEl.setAttribute("data-index", i) 
        liEl.setAttribute("data-image", state.imageList[i]) 
        liEl.innerHTML = 
        `<div class="view front">
            <img src="images/scale_pattern.svg.png" alt="icon">
        </div>
        <div class="view back">
            <img src="images/${state.imageList[i]}.jpg" alt="icon">
        </div>`;
        liEl.addEventListener("click", flipCard)
        gameEl.append(liEl);
    }
}


function render(){
    renderScreen(state.screen);
    renderScore();
    renderCards();
}


function renderScore() {

    document.querySelector(".current-score-game").innerText = state.currentScore;
     
    document.querySelector("#final-score").innerText = state.currentScore; 

    document.querySelector("#best-score").innerText = state.lowestScore;

    document.querySelector("#best-score2").innerText = state.lowestScore;
}

function renderScreen(num){
    const allScreens = document.querySelectorAll(".screen");
    for(let i = 0; i < allScreens.length; i++){
        allScreens[i].style.display = "none";
    }
    document.querySelector(`.screen${num}`).style.display = "flex";
}


startBtn.addEventListener("click", (event) => {
    state.screen = 2;
    render();
});


restartBtn.addEventListener("click", (event) => {
    state = {
        matched: 0,
        matchedIndex: [],
        cardOne: null,
        cardTwo: null,
        currentScore: 0,
        lowestScore: +localStorage.getItem("low-score") ? +localStorage.getItem("low-score") : 0,
        screen: 1,
        disable: false,
        imageList: shuffle([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8])
    }

    render();
});


render();