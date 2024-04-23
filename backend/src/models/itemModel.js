import mongoose from "mongoose";

const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  score : {
    type : Number,
    required : true
  },
  time : {
    type : String,
    required : true
  },
  balance : {
    type : Number,
    required : true
  },
  isPlay : {
    type : Boolean,
    required : true,
    // default : false
  },
  extraHealth : {
    type : Number,
    required : true,
    default : 0
  },
  skinCollection : {
    type : Array,
    required : true,
    default : ["default"]
  },
  selectedSkin : {
    type : String,
    required : true,
    default : "default"
  }
},{timestamps : true})
const scoreboard = mongoose.model("Scoreboard", typeSchema);

export default scoreboard;