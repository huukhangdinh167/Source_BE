import userService from "../service/userService";
import cookieParser from "cookie-parser"; 
// Store hash in your password DB.



// Create the connection to database



const handleHelloword = (req, res) => {

    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    // model => get data from database
   
    let userList = await userService.getUserList()

    return res.render("user.ejs", { userList });

}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)


    return res.redirect("/user");
}
const handleDeleteUser = async (req, res) => {
    // console.log("checkkk id ", req.params.id)
    await userService.deleteUser(req.params.id)

    return res.redirect("/user");
}
const gethandleUpdateUser = async (req, res) => {
    let id = req.params.id
    let userData = await userService.getUserById(id)
    // let userData = [];
    // if (user && user.length > 0) {

    //     userData = user[0]
    //     // console.log("Chekc useerrrr by id", userData)

    // }
    // console.log("Chekc useerrrr by id ham findOne", userData)
    return res.render("update.ejs", { userData })

}
const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    await userService.updateUser(email, username, id)
    return res.redirect("/user")
    //  console.log("Checkk bodyy", email, username, id)
}
module.exports = {
    handleHelloword, handleUserPage, handleCreateNewUser,
    handleDeleteUser, gethandleUpdateUser, handleUpdateUser
}