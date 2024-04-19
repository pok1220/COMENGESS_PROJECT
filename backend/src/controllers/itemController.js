// import { resolveSoa } from "dns";
import scoreboard from "../models/itemModel.js";


export const startGame = async (req, res) => {
  // res.send('1');
  const {name} = req.query;
  // if(name == "null") name = "Anonymous";
  const time = Date();
    const Thailand = time.toLocaleString('en-US', {
        timeZone : "Thailand"
    })
    let timeSplit=time.split()
  const checkPlayer = await scoreboard.find({isPlay : true});

  const player = await scoreboard.find({name : name})
  // res.send(player)
  // return;
  if(checkPlayer[0] != null){
    await scoreboard.updateMany({isPlay : true}, {$set : {isPlay : false}})
  }
  if(player[0] == null){
  // else res.send('1')
  // return;
    const curPlayer = new scoreboard({
      // _id : ObjectId("currentPlayer"),
      name : name,
      score : 0,
      balance : 0,
      time : Thailand,
      isPlay : true
      
    })
    await curPlayer.save();
  }
  else {
    await scoreboard.updateOne({name : player[0].name}, {$set : {isPlay : true}});
  }
  // res.send(curPlayer);
  // return;
  res.send(await scoreboard.find({isPlay : true}));
  console.log("1");
}

// startGame, endGame, changeExtraHealth, addSkin
export const endGame = async (req, res) => {
  const time = Date();
    const Thailand = time.toLocaleString('en-US', {
        timeZone : "Thailand"
    })
  const {balance, score} = req.query;
  // balance = parseInt(balance)

  const curPlayer = await scoreboard.find({isPlay : true})
  if(curPlayer[0] == null) return;
  if(score > curPlayer[0].score){
    await scoreboard.updateOne({isPlay : true}, {score : score, time : Thailand});
  }
  await scoreboard.updateOne({isPlay : true}, {balance : parseInt(balance) + parseInt(curPlayer[0].balance)});
  res.status(200).json({message : "EndGame Success"})
}
export const showScoreboard = async (req, res) => {
  const board = await scoreboard.find().sort({score : -1});

  res.send(board)
  
}

export const changeExtraHealth = async (req, res) => {
  const {isAdd} = req.query;
  const player = await scoreboard.find({isPlay : true});
  if(isAdd == "1"){
    await scoreboard.updateOne({isPlay : true}, {$set : {extraHealth : parseInt(player[0].extraHealth + 1)}});
  }
  else{
    if(player[0].extraHealth > 0){
      await scoreboard.updateOne({isPlay : true}, {$set : {extraHealth : parseInt(player[0].extraHealth - 1)}});
    }
  }
  res.send(await scoreboard.find({isPlay : true}));
}

export const changeExtraHealthInGame = async (req, res) => {
  const {extraHealth} = req.query;
  await scoreboard.updateOne({isPlay : true}, {extraHealth : parseInt(extraHealth)})
  res.send(await scoreboard.find({isPlay : true}));
}

export const getCurrentPlayer = async (req, res) => {
  const player = await scoreboard.find({isPlay : true})
  res.send(player);
}

export const clearScoreboard = async (req, res) => {
  await scoreboard.deleteMany();
  res.send("Clear Success")
  console.log("Clear Success")
}

export const deleteScore = async (req, res) => {
  const name = req.query.name;
  await scoreboard.deleteOne({name : name});
  console.log("Delete Success")
}

export const changeBalance = async (req, res) => {
  const newBalance = req.query.newBalance;
  await scoreboard.updateOne({isPlay : true}, {balance : parseInt(newBalance)});
  console.log("Change Balance Success")
  res.send(await scoreboard.find({isPlay : true}))
}


export const addSkin = async (req, res) => {
  const {skinId} = req.query;
  // const player = await scoreboard.find({isPlay : true})
  await scoreboard.updateOne({isPlay : true}, {$push : {skinCollection : skinId}})
  res.send(await scoreboard.find({isPlay : true}))
}

export const selectSkin = async (req, res) => {
  const skinId = req.query.skinId;
  await scoreboard.updateOne({isPlay : true}, {selectedSkin : skinId});
  res.send(await scoreboard.find({isPlay : true}));
}

// export {addData};
// export const createItem = async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();

//     res.status(200).json({ message: "OK" });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       res.status(400).json({ error: "Bad Request" });
//     } else {
//       res.status(500).json({ error: "Internal server error." });
//     }
//   }
// };

// export const getItems = async (req, res) => {
//   const items = await Item.find();

//   res.status(200).json(items);
// };

