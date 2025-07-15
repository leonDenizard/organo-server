const supervisorService = require('../services/supervisor.service')

const create = async (req, res) => {
    try{
        await supervisorService.create(req.body)
        console.log(req.body)
        res.status(201).send({
            message: "Super criado",
            super: req.body
        })
    }catch(error){
        res.status(500).json({ message: "Erro interno no servidor", error})
    }
}

module.exports = {
    create
}