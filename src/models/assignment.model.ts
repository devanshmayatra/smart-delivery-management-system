import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    ref: 'DeliveryPartner',
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  reason: {
    type: String,
    default:""
  }
}, {
  timestamps: true,
});

export const Assignment = models.Assigmnent || model("Assigmnent" , assignmentSchema);
