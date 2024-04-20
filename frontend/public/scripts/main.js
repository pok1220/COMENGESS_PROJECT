// import { handleCreateMember, populateMembers } from "./member.js";
// import { fetchAndDrawTable, handleCreateItem, handleFilterItem } from "./table.js";

import * as apiController from "./api.js";
import {snake} from "./snake.js"
// const snake = require('./snake.js')
// document.addEventListener("DOMContentLoaded", () => {
//   fetchAndDrawTable();  //Tien implement here

//   populateMembers();

//   const addItemButton = document.getElementById("add-newrow");
//   addItemButton.addEventListener("click", () => {
//     handleCreateItem();
//   });

//   const filterButton = document.getElementById("filter-button");
//   filterButton.addEventListener("click", () => {
//     handleFilterItem();
//   });

//   const addMemberButton = document.getElementById("add-member");
//   addMemberButton.addEventListener("click", () => {
//     handleCreateMember();
//   });
// });
// import { handleCreateMember, populateMembers } from "./member.js";
// import { fetchAndDrawTable, handleCreateItem, handleFilterItem } from "./table.js";

// document.addEventListener("DOMContentLoaded", () => {
//   fetchAndDrawTable();  //Tien implement here..

//   populateMembers();

//   const addItemButton = document.getElementById("add-newrow");
//   addItemButton.addEventListener("click", () => {
//     handleCreateItem();
//   });

//   const filterButton = document.getElementById("filter-button");
//   filterButton.addEventListener("click", () => {
//     handleFilterItem();
//   });

//   const addMemberButton = document.getElementById("add-member");
//   addMemberButton.addEventListener("click", () => {
//     handleCreateMember();
//   });
// });
// import * as apiController from "./api.js"
const checkPlayer = await apiController.getCurrentPlayer();
var playerName = "Anonymous"
var playerBalance = checkPlayer[0].balance;
var playerHighScore = checkPlayer[0].score;
const nameTag = document.getElementById('nameChange');
if(checkPlayer[0] != null){

    playerName = checkPlayer[0].name;
    document.getElementById('playerData').innerText = `Name : ${playerName} \nBalance : ${playerBalance} \nHighest score : ${playerHighScore}`;
}


nameTag.innerHTML = playerName
document.getElementById('changeAc').addEventListener('click', ()=>{
    playerName = window.prompt("Your Name")
    if(playerName == '' || playerName == null) playerName = "Anonymous"
    // alert(playerName)
    console.log(playerName)
    document.getElementById('nameChange').innerHTML = playerName
    reAc();
});
apiController.startGame(playerName)
console.log(await apiController.getCurrentPlayer());
var aboutalreadycreate = false;
const StartButton = document.getElementById("Start-botton");
export const hideable = document.getElementsByClassName("hide");
StartButton.addEventListener("click", function(){
    snake();
    for (var i = 0; i < hideable.length; i++) {
        hideable[i].style.display = "none";
    }
    // console.log(`${coin}`);
});

export async function reAc(){

    await apiController.startGame(playerName)
    const player = await apiController.getCurrentPlayer();
    var playerBalance = await player[0].balance;
    var playerHighScore = await player[0].score;
    document.getElementById('playerData').innerText = `Name : ${playerName} \nBalance : ${playerBalance} \nHighest score : ${playerHighScore}`;

    // console.log(await apiController.getCurrentPlayer())
}
// const aboutButton = document.getElementById("about-botton");
// aboutButton.addEventListener("click", function(){
//     for (var i = 0; i < hideable.length; i++) {
//         hideable[i].style.display = "none";
//     }
//     aboutalreadycreate = about(aboutalreadycreate);
    
// });