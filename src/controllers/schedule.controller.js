const scheduleService = require('../services/schedule.service')
const ScheduleModel = require('../models/Schedule');

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

const updateSchedule = async (req, res) => {
    try {
        const { date, uid } = req.body; // Recebe apenas UM UID

        // Busca o documento da escala
        const scheduleDoc = await ScheduleModel.findOne();

        if (!scheduleDoc) {
            return res.status(404).json({ message: "Nenhuma escala encontrada." });
        }

        // Obtém a escala do dia específico ou cria um array vazio
        const scheduleForDate = scheduleDoc.schedule.get(date) || [];

        if (scheduleForDate.includes(uid)) {
            // Remove o UID se já estiver na lista (toggle)
            scheduleDoc.schedule.set(date, scheduleForDate.filter(u => u !== uid));
        } else {
            // Adiciona o UID se não estiver presente
            scheduleForDate.push(uid);
            scheduleDoc.schedule.set(date, scheduleForDate);
        }

        await scheduleDoc.save();

        res.json({ success: true, message: "Escala atualizada com sucesso!", schedule: scheduleDoc.schedule.get(date) });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar escala", details: error.message });
    }
};

const findByDate = async (req, res) => {
    const date = req.params.date; // Pega a data da URL

    try {
        const schedule = await scheduleService.findByDate(date); // Chama o serviço para buscar no banco

        if (!schedule) {
            return res.status(404).json({ message: "Nenhuma escala encontrada para essa data." });
        }

        res.json(schedule); // Retorna a escala do dia
    } catch (error) {
        console.error("Erro ao buscar escala por data:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};


module.exports = {
    createSchedule,
    findByUID,
    findAll,
    updateSchedule,
    findByDate
}