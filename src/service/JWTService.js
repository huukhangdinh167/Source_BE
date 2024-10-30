import db from "../models/index";

const getGroupWithRole = async (user) => {
    let role = await db.Group.findOne({
        
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        // attributes: ["id", "name", "description"],
        include: { model: db.Role,
             attributes: ["id", "url", "description"],
             through: {attributes: []}
            },
        
    })
    return role ? role : {};
}
module.exports = {
    getGroupWithRole
}