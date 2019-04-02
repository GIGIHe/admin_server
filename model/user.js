const mongoose = require("mongoose");
const user = new mongoose.Schema(
  {
   username:{
        type:String,
        required:true,
        unique:true
    },
    password: {
      required: true,
      type: String,
    },
    avatar: String,
    desc:{
        type:String,
        default:'这人很懒'
    },
    phone:{
        type:Number,
        unique:true,
        required:true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);
module.exports = mongoose.model("user", user); //表名，骨架名
