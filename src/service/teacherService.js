import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const createProject = async (name, description, require,
    knowledgeSkills, instructors, status, idUserTeacher) => {

    try {
        db.Project.create({
            name: name,
            description: description,
            require: require,
            knowledgeSkills: knowledgeSkills,
            instructors: instructors,
            status: status,
            idUserTeacher: idUserTeacher
        })
    } catch (error) {
        console.log("checkkkkk eroorrr", error)
    }
}

module.exports = {
    createProject
}