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
document.getElementById('playerData').innerText = `Name : Anonymous \nBalance : 0 \nHighest score : 0 \nExtra Health : 0 \nSkin : default`;

const checkPlayer = await apiController.getCurrentPlayer();
var playerName = "Anonymous"
const nameTag = document.getElementById('nameChange');
if(checkPlayer[0] != null){
    var playerBalance = await checkPlayer[0].balance;
    var playerHighScore = await checkPlayer[0].score;
    var playerExtra = await checkPlayer[0].extraHealth;
    var playerCur = await checkPlayer[0].selectedSkin;
    playerName = checkPlayer[0].name;
    document.getElementById('playerData').innerText = `Name : ${await playerName} \nBalance : ${await playerBalance} \nHighest score : ${await playerHighScore} \nExtra Health : ${await playerExtra} \nSkin : ${await playerCur}`;
}
await apiController.startGame(playerName)



nameTag.innerHTML = playerName
document.getElementById('changeAc').addEventListener('click', ()=>{
    playerName = window.prompt("Your Name")
    if(playerName == '' || playerName == null) playerName = "Anonymous"
    // alert(playerName)
    console.log(playerName)
    document.getElementById('nameChange').innerHTML = playerName
    reAc();
});

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
    var playerExtra = await player[0].extraHealth;
    var playerCur = await player[0].selectedSkin;
    document.getElementById('playerData').innerText = `Name : ${playerName} \nBalance : ${playerBalance} \nHighest score : ${playerHighScore} \nExtra Health : ${playerExtra} \nSkin : ${playerCur}`;

    // console.log(await apiController.getCurrentPlayer())
}
// const aboutButton = document.getElementById("about-botton");
// aboutButton.addEventListener("click", function(){
//     for (var i = 0; i < hideable.length; i++) {
//         hideable[i].style.display = "none";
//     }
//     aboutalreadycreate = about(aboutalreadycreate);
    
// });