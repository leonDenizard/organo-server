const workShiftService = require('../services/workShift.service')

const createWorkShift = async (req, res) => {

    try {
        const { startTime, endTime } = req.body

        const existingShift = await workShiftService.findByStartAndEndTime(startTime, endTime)

        if (existingShift) {
            return res.status(400).json({ message: "Já existe esse horário cadastrado" })
        }
        const workShift = await workShiftService.create(req.body)

        if (!workShift) return res.status(400).send({ message: "Erro ao criar turno" })

        res.status(201).send({
            message: "Horário de turno criado com sucesso",
            startTime,
            endTime
        })

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuario" })
    }
}

const findById = async (req, res) => {

    try {
        const id = req.params.id

        const workShift = await workShiftService.findById(id)

        if (!workShift) {
            return res.status(404).json({ message: "Turno não encontrado" });
        }
        res.json(workShift);
    } catch (error) {
        res.send(error)
    }

}

const findAllWorkShift = async (req, res) => {

    try {
        const workShift = await workShiftService.findAllWorkShift()

        if (!workShift) {
            return res.status(404).json({ message: "Nenhum Turno encontrado" });
        }

        res.json(workShift)

    } catch (error) {
        res.send(error)
    }

}

const deleteAll = async (req, res) => {

    try {
        const workShift = await workShiftService.findAllWorkShift()

        if (!workShift || workShift.length === 0) {
            return res.send({ message: "Não existe turnos cadastrados" })
        }

        await workShiftService.deleteAll()

        res.status(200).json({ message: "Usuários deletados" })

    } catch (error) {
        res.send(error)
    }
}

const deleteById = async (req, res) => {

    try {
        const id = req.params.id

        const deleted = await workShiftService.deleteById(id)

        if(!deleted){
            return res.status(404).json({ message: `Turno com ID ${id} não encontrado`})
        }

        res.status(200).json({ message: `Turno deletado ${id}`})

    } catch (error) {
        res.send(error)
    }


}

module.exports = {
    createWorkShift,
    findById,
    findAllWorkShift,
    deleteAll,
    deleteById
}