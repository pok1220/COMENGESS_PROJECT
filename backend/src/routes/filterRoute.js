import express from "express";
// import scoreboard from "../models/itemModel.js";
// startGame, endGame, changeExtraHealth, addSkin
import * as itemController from "../controllers/itemController.js";
const filterRouter = express.Router();
filterRouter.get("/board", itemController.showScoreboard);
filterRouter.get("/clear", itemController.clearScoreboard);
// filterRouter.get("/addBalance", itemController.addBalance);
filterRouter.get("/start", itemController.startGame);
filterRouter.get("/end", itemController.endGame);
filterRouter.get("/updateHealth", itemController.changeExtraHealth)
filterRouter.get("/addSkin", itemController.addSkin)
filterRouter.get("/current", itemController.getCurrentPlayer);
filterRouter.get("/changeBalance", itemController.changeBalance)
filterRouter.get("/changeSkin", itemController.selectSkin)
// filterRouter.get("/changePage", (req, res) => {
//     res.sendFile('')
// })
filterRouter.route('/')
// .get(itemController.addData)
.delete(itemController.deleteScore);



export default filterRouter;