"use strict";

//! Get elements
const totalScore0=document.querySelector("#score--0");
const totalScore1=document.querySelector("#score--1");
const current0=document.querySelector("#current--0");
const current1=document.querySelector("#current--1");
const dice=document.querySelector(".dice");
const btnNew=document.querySelector(".btn--new");
const btnRoll=document.querySelector(".btn--roll");
const btnHold=document.querySelector(".btn--hold");
const player0=document.querySelector(".player--0");
const player1=document.querySelector(".player--1");

//! reset conditions
totalScore0.textContent=0;
totalScore1.textContent=0;
current0.textContent=0;
current1.textContent=0;
dice.classList.add("hidden");

let scores=[0,0];
let currentUser=0;
let currentScore=0;
let playing=true;

function switchUser(){
    if(currentUser===0){
        totalScore0.textContent=scores[0];
        currentScore=0;
        current0.textContent=currentScore;
    }else{
        totalScore1.textContent=scores[1];
        currentScore=0;
        current1.textContent=currentScore;
    }
    currentUser=currentUser===0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

//! Button function
btnRoll.addEventListener("click", function(){
    if(playing){
        let diceNumber=Math.round(Math.random()*5)+1;
        console.log(diceNumber);
        dice.src=`dice-${diceNumber}.png`;
        dice.classList.remove("hidden");

        if(diceNumber!==1){
            if(currentUser===0){
                currentScore+=diceNumber;
                current0.textContent=currentScore;
            }else{
                currentScore+=diceNumber;
                current1.textContent=currentScore;
            }
        }else{
            switchUser();
        }
    }
});

btnNew.addEventListener("click", function(){
    totalScore0.textContent=0;
    totalScore1.textContent=0;
    current0.textContent=0;
    current1.textContent=0;
    document.querySelector(`.player--${currentUser}`).classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");

     scores=[0,0];
     currentUser=0;
     currentScore=0;
     playing=true;
});

btnHold.addEventListener("click", function(){
    if(playing){
        scores[currentUser]+=currentScore;
        document.querySelector(`#score--${currentUser}`).textContent=scores[currentUser];

        if(scores[currentUser]>=66){
            playing=false;
            dice.classList.add("hidden");
            document.querySelector(`.player--${currentUser}`).classList.add("player--winner");
            document.querySelector(`.player--${currentUser}`).classList.remove("player--active");
        }else{
            switchUser();
        }
    }
});