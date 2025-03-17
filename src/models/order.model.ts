import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true
  },
  customer: {
    type: {
      name: {
        type: String
      },
      phone: {
        type: String
      },
      address: {
        type: String
      }
    },
    required: true
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  },
  items: {
    type: [
      {
        name: {
          type: String
        },
        quantity: {
          type: Number
        },
        price: {
          type: Number
        }
      },
    ],
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'assigned', 'picked', 'delivered', 'failed']
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'DeliveryPartner',
    default: null
  },
  totalAmount: Number,
}, {
  timestamps: true
});

export const Order = models.Order || model("Order", orderSchema);