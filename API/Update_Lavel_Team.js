const UserData = require("../Modals/registration");
const userNameType = require("../Modals/userNameType");


const updateLevel = async (user_Id) => {
    const new_userdata = await UserData.findOne({ user_Id })
    let level_upline = new_userdata.level_upline
    objectLenght = Object.keys(level_upline).length;
    var k = 0;
    for (let x in level_upline) {
        var update = await UserData.findOne({ user_Id: level_upline[x] })
        if (update !== null) {
            const objKeys = Object.keys(update?.level_Team)[k]
            console.log(`${objKeys} ${k}`)
            const newTeamData = await update?.level_Team[objKeys].push({
                name: new_userdata.name,
                phone: new_userdata.phone,
                status: new_userdata.status,
                user_Id: new_userdata.user_Id,
                sponsor_Id: new_userdata.sponsor_Id,
            })
            const upload_updated_data = await UserData.findOneAndUpdate({ user_Id: level_upline[x] }, update)
        }
        k++;
        if (k === objectLenght) {
            break;
        }
    }
}

module.exports = {updateLevel}