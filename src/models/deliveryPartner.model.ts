import { Schema, models, model } from "mongoose";

const deliveryPartnerSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    default: 'inactive',
    enum: ['active', 'inactive']
  },
  currentLoad: {
    type: Number,
    default: 0,
    max: 3
  },
  areas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Area'
    }
  ],
  shift: {
      start: String,
      end: String
  },
  metrics: {
    rating: {
      type: Number,
      default: 0
    },
    completedOrders: {
      type: Number,
      default: 0
    },
    cancelledOrders: {
      type: Number,
      default: 0
    },
  }
}, {
  timestamps: true
});

export const DeliveryPartner = models.DeliveryPartner || model("DeliveryPartner", deliveryPartnerSchema);