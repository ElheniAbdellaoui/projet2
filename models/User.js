const { mongoose } = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  registerDate: {
    type: Date,
    default: Date.now,
  },
  userRole: {
    type: String,
    default: "User",
    roles: ["User", "Admin"],
  },
});
module.exports = mongoose.model("User", userSchema);
