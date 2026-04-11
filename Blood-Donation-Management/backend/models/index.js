import User from "./User.js";
import Request from "./Request.js";
import Donor from "./Donor.js";
//one request can have many donors
Request.hasMany(Donor, { as: "donors" });
Donor.belongsTo(Request);
Request.belongsTo(User);
User.hasMany(Request);
export { User, Request, Donor };
