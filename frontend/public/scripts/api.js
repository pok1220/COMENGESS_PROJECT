import { BACKEND_URL } from "./config.js";

// get Scoreboard don't forget to use await it already sort with high to low
export async function getScoreboard() {
  const board = await fetch(`${BACKEND_URL}/filter/board`)
  .then(data => data.json());
  return await board;

}
// startGame, endGame, changeExtraHealth, addSkin

export async function startGame(name){
  // console.log(name)
  // if(name == null || name == '') name = "Anonymous"
  await fetch(`${BACKEND_URL}/filter/start?name=${name}`)
}
export async function endGame(balance, score){
  await fetch(`${BACKEND_URL}/filter/end?balance=${balance}&score=${score}`)
}

export async function selectSkin(skinId){
  await fetch(`${BACKEND_URL}/filter/changeSkin?skinId=${skinId}`)
}

//isAdd == "true" to add Extra Health to player
//isAdd is boolean true to increment extra false to decrement
export async function changeExtraHealth(isAdd){
  if(isAdd == "true"){
    await fetch(`${BACKEND_URL}/filter/updateHealth?isAdd=1`)
  }
  else{
    await fetch(`${BACKEND_URL}/filter/updateHealth?isAdd=0`)
  }
}

//want to get Array use .skinCollection
export async function addSkin(skinId){
  if(skinId == "") return;
  await fetch(`${BACKEND_URL}/filter/addSkin?skinId=${skinId}`)
}
// pass name and score parameter to create if don't fill any string in input it will do nothing
// export async function addScore(name, score) {
//   if(name == '' || score == '') {return;}
//   await fetch(`${BACKEND_URL}/filter?name=${name}&score=${score}`);
// }

// delete player name from scoreboard
export async function deleteItem(name) {
  if(name == '') return;
  await fetch(`${BACKEND_URL}/filter?name=${name}`, {
    method: "DELETE",
  });
}

// clear scoreboard
export async function clearScore(){
  await fetch(`${BACKEND_URL}/filter/clear`);
}

//get CurrentPlayer
export async function getCurrentPlayer(){

  const data = await fetch(`${BACKEND_URL}/filter/current`)
  .then(data => data.json());
  return data;
}

export async function changeBalance(newBalance){
  await fetch(`${BACKEND_URL}/filter/changeBalance?newBalance=${newBalance}`);
}

// export async function changePage(page){
//   await redirect(`${BACKEND_URL}/f`)
// }