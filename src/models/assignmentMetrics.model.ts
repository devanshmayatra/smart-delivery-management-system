import clsx from "clsx";
import { Schema, model, models } from "mongoose";

const assignmentMetricsSchema = new Schema({
  _id: {
    type: String,
    default: "metrics"
  },
  totalAssigned: {
    type: Number,
    default:0
  },
  totalCompleted: {
    type: Number,
    default:0
  },
  successRate: {
    type: Number,
    default:0

  },
  averageTime: {
    type: Number,
    default:0

  },
  failureReasons: [
    {
      reason: String,
      count: {
        type: Number,
        default: 0
      },
    }
  ]
}, {
  timestamps: true
})

export const AssignmentMetrics = models.AssignmentMetrics || model('AssignmentMetrics', assignmentMetricsSchema)