import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    image: { type: String, required: true },
    expertise: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;
