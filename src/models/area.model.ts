import { Schema, models, model } from "mongoose";

const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate area names
    trim: true
  }
}, {
  timestamps: true,
});

export const Area = models.Area || model("Area", areaSchema);