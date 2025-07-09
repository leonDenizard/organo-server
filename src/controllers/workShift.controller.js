const workShiftService = require('../services/workShift.service')

const createWorkShift = async (req, res) => {

    try{
        const { startTime, endTime } = req.body

        const workShift = await workShiftService.create(req.body)

        if(!workShift) return res.status(400).send({ message: "Erro ao criar turno" })

        res.status(201).send({ 
            message: "Horário de turno criado com sucesso",
            startTime,
            endTime
        })

    }catch (error){
        res.status(500).json({ message: "Erro ao criar usuario"}, error)
    }
}

module.exports = {
    createWorkShift
}