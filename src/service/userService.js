import bcrypt from 'bcryptjs';

import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}
const createNewUser = async (email, password, username) => {
    let hasspass = hashUserPassword(password);

    try {
        db.User.create({
            username: username,
            email: email,
            password: hasspass
        })
    } catch (error) {
        console.log("checkkkkk eroorrr", error)
    }
}

const getUserList = async () => {
    // test relationships
    let newuser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true
    })
        // Tìm những group id =1 thuộc về những role nào 
        // Ta có 2 cách 

        // Cách 1
    // let role = await db.Group.findAll({
    //     where: { id: 1 }, 
    //     attributes: ["id", "name", "description"],
    //     include: { model: db.Role, attributes: ["id", "url", "description"] },
    //     raw: true,
    //     nest: true
    // })
    // Cách 2 
    
    let role = await db.Role.findAll({
        attributes: ["id", "url", "description"] ,
        include:{model: db.Group, where: {id: 1},  attributes: ["id", "name", "description"]},
        raw: true, 
        nest: true
    })

    // console.log("CHekc new user2:", newuser)
    // console.log("Check rollleeee", role)
    let user = [];
    user = await db.User.findAll()
    return user;
    // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // let user = [];
    // try {
    //     const [rows, fields] = await connection.execute('Select *from user');
    //     return rows;
    // } catch (error) {
    //     console.log("checkkkkk eroorrr", error)
    // }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.log("checkkkkk eroorrr", error)
    }
    //DELETE FROM customers WHERE address = 'Mountain 21'
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log("checkkkkk eroorrr", error)
    // }
}

const getUserById = async (userid) => {

    // -- LUU Y : findAll -> [{}, {}, {}]  findOne -> {}

    const list = await db.User.findOne({
        where: {
            id: userid,
        },
    });
    return list;
    //     const connection = await mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         database: 'jwt',
    //         Promise: bluebird,
    //     });
    //     try {
    //         const [rows, fields] = await connection.execute('select* from user WHERE id = ?', [id]);
    //         return rows;
    //     } catch (error) {
    //         console.log("checkkkkk eroorrr", error)
    //     }
}
const updateUser = async (email, username, id) => {

    await db.User.update(
        { email: email, username: username },

        {
            where: {
                id: id,
            },
        },
    );

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user set email = ? , username= ? WHERE id = ?;', [email, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log("checkkkkk eroorrr", error)
    // }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}