const userService = require('../services/user.service')
const mongoose = require('mongoose')

const createUser = async (req, res) => {

    try {
        const { uid, name, whatsapp, slack, email, time, role, manager, photoUrl, surname, birthday, child, admin, interval } = req.body

        const userRegistered = await userService.findById(uid)

        if (userRegistered) {
            return res.status(400).json({ message: "Usuário já cadastrado" })
        }

        const user = await userService.create(req.body)

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuário" })
        }

        res.status(201).send({
            message: "Usário cadastrado com sucesso",
            user: {
                id: res._id,
                uid,
                name,
                whatsapp,
                slack,
                email,
                time,
                role,
                manager,
                photoUrl,
                surname,
                birthday,
                child,
                admin,
                interval
            }
        })

    } catch (error) {
        console.log(`Erro ao criar usuário ${error}`)
        res.status(500).json({ message: "Erro interno no servidor", error })
    }

}

const findAllUsers = async (req, res) => {

    try {
        const users = await userService.findAll()
        res.status(200).send(users)
        
    } catch (error) {
        console.log("Erro ao buscar usuários", error)
        res.status(500).send({ message: "Erro interno no servidor" })
    }

}

const findById = async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await userService.findById(uid);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar usuário" });
    }
};

const deleteAll = async (req, res) => {
    const users = await userService.deleteAll()

    res.send({ message: "Usuários deletados" })
}

const findByUidAndUpdate = async (req, res) => {


    try {
        const uid = req.params.uid

        const update = req.body

        const updateUser = await userService.findByUidAndUpdate(uid, update)

        if (!updateUser) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.status(200).send(updateUser);

    } catch (error) {
        console.log(error),
            res.status(500).send({ message: 'Erro ao tentar atualizar usuário' })
    }



}

module.exports = {
    createUser,
    findAllUsers,
    findById,
    deleteAll,
    findByUidAndUpdate,
}