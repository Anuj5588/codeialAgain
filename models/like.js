const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.objectId,
    },
    // this define the object id of the liked object
    likeable: {
      type: mongoose.Schema.objectId,
      require: true,
      refPath: "onModel",
    },
    // this fiels is use for define the  type of the liked object since this is dynamic reference
    onModel: {
      type: String,
      require: true,
      enum: ["Post", "comment"],
    }
  },

  {
    timestamps: true,
  }
);

const Like = mongoose.model('Like',likeSchema);

module.exports= Like;