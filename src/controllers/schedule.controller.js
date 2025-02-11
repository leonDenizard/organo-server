const scheduleService = require('../services/schedule.service')

const createSchedule = async (req, res) => {

    try {
        const scheduleData = req.body

        if (!scheduleData || typeof scheduleData !== 'object' || Object.keys(scheduleData).length === 0) {
            return res.status(400).json({ message: "Dados inválidos ou vazios" })
        }

        const scheduleMap = new Map(Object.entries(scheduleData))
        const schedule = await scheduleService.create({ schedule: scheduleMap });

        res.status(201).send({ message: "Escala criada" })


    } catch (error) {
        console.error("Erro ao criar escala:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }

}

const findByUID = async (req, res) => {

    const uid = req.params.uid

    const schedules = await scheduleService.findById(uid);

    if (!schedules || schedules.length === 0) {
        return res.status(404).send({ message: `Nenhuma escala encontrada para UID ${uid}` });
    }

    //Retorna as escalas encontradas
    res.send(schedules);
}

const findAll = async (req, res) => {

    const schedule = await scheduleService.findAll()

    if(schedule){
        res.send(schedule)
    }else{
        res.send({message: "Escala não encontrada"})
    }
}
module.exports = {
    createSchedule,
    findByUID,
    findAll
}