// import {getCurrentPlayer(),createItem()} from "./api.js";
import * as apiController from "./api.js"
document.getElementById('default').onclick = ()=>{
  selectSkin('default')
}
document.getElementById('changePage').onclick = clickTochange1;
const player = await apiController.getCurrentPlayer();
document.getElementById('money').innerHTML = player[0].balance;
const curS = document.getElementById('currentSkin')
// const curEx = doucment.getElementById('curEx');
curS.innerHTML = player[0].selectedSkin;
// curEx.innerHTML = toString(player[0].extraHealth);
document.getElementById('heart').onclick = addHeart;
document.getElementById('Skin-01').onclick = ()=>{
  selectSkin('Skin-01')
}
document.getElementById('Skin-02').onclick = ()=>{
  selectSkin('Skin-02')
}
document.getElementById('Skin-03').onclick = ()=>{
  selectSkin('Skin-03')
}
async function afterFetch(){
  const player = await apiController.getCurrentPlayer();
  document.getElementById('money').innerHTML = player[0].balance;
  const curS = document.getElementById('currentSkin')
  // const curEx = doucment.getElementById('curEx');
  // curEx.innerHTML = player[0].extraHealth;
  curS.innerHTML = player[0].selectedSkin;
}
function clickTochange1()
{
  location.href="index.html"
}

async function addHeart() {
  const player = await apiController.getCurrentPlayer(); //Tien
  let current_balance=player[0].balance;
  let current_extra_heart=player[0].extraHealth;
  
  if(current_balance>=3){
    current_extra_heart+=1
    current_balance-=3;
    await apiController.changeExtraHealth("true")
    await apiController.changeBalance(current_balance);
    await afterFetch();
  }
  else{console.log("Not have")}

  // const payload = { //ไม่แน่ใจว่าจะทำยังไง คิดว่าไม่จำเป็นแค่ส่งค่าไปแก้พอ
  //   item: itemToAdd.value,
  //   name: nameToAdd.value,
  //   price: priceToAdd.value,
  // };
    //await createItem(current_balance,current_extra_heart); //in the front end api to post it by change value
  }

async function selectSkin(id_skin) {
  const player = await apiController.getCurrentPlayer(); //Tien
  // apiController.selectSkin(id_skin)
  console.log(id_skin)
  let current_balance=player[0].balance;
  let current_PlayerSkin_All=player[0].skinCollection;
  // let current_PlayerSkinNow=player[0].selectedSkin /// Tien ยังไม่ได้ถามแต่ ตอนจะเอาไปใส่หนอนจะทำยังไง

  console.log(typeof(current_PlayerSkin_All))
  if(current_PlayerSkin_All.includes(id_skin)){
      //already have

      //current_PlayerSkinNow=document.getElementById(id_skin) สั้งในหน้า start game????????? 
      // current_PlayerSkinNow=id_skin
      await apiController.selectSkin(id_skin);

  }else{
    if(current_balance>=5){
      // current_PlayerSkin_All.push(id_skin)
      current_balance-=5
      await apiController.addSkin(id_skin);
      await apiController.changeBalance(current_balance);
      await apiController.selectSkin(id_skin)
     }
  }

  
  await afterFetch();
  // curS.innerHTML = player[0].selectedSkin;

  // const payload = { //ไม่แน่ใจว่าจะทำยังไง คิดว่าไม่จำเป็นแค่ส่งค่าไปแก้พอ
  //   item: itemToAdd.value,
  //   name: nameToAdd.value,
  //   price: priceToAdd.value,
  // };
    //await createItem(current_balance,current_PlayerSkinNow,current_PlayerSkin_All); //in the front end api to post it by change value
  }




  /*

  function in start game that will be core when start
    const playerSkin=playercurrentSkin //from fetch
   let img=document.querySelector("#Pictureofsnake") 
  if(player.currentskin==null){
       img.setAttribute("src","skin-00.png")
  }else if(player.currentskin=="Skin-01"){
      img.setAttribute("src","skin-01.png")
  }else if(player.currentskin=="Skin-02"){
      img.setAttribute("src","skin-02.png")
  }else if(player.currentskin=="Skin-03"){
      img.setAttribute("src","skin-03.png")
  }


  */







  function ChangeColor()
  {
    document.getElementById('changePage').style.backgroundColor="red"
  }

  function ChangeColor2()
  {
    document.getElementById('changePage').style.backgroundColor="green"
  }