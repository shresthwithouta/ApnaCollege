import { Schema, models, model } from "mongoose";

const auditLogSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
    },

    actorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    actorEmail: {
      type: String,
      required: true,
    },

    targetUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuditLog =
  models.AuditLog || model("AuditLog", auditLogSchema);

export default AuditLog;
