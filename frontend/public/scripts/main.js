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
const nameTag = document.getElementById('nameChange');
if(checkPlayer[0] != null){

    playerName = checkPlayer[0].name;
}


nameTag.innerHTML = playerName
document.getElementById('changeAc').addEventListener('click', ()=>{
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

async function reAc(){
    playerName = window.prompt("Your Name")
    if(playerName == "") playerName = "Anonymous"
    console.log(playerName)
    document.getElementById('nameChange').innerHTML = playerName
    apiController.startGame(playerName)
    // console.log(await apiController.getCurrentPlayer())
}
// const aboutButton = document.getElementById("about-botton");
// aboutButton.addEventListener("click", function(){
//     for (var i = 0; i < hideable.length; i++) {
//         hideable[i].style.display = "none";
//     }
//     aboutalreadycreate = about(aboutalreadycreate);
    
// });