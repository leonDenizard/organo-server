const scheduleService = require('../services/schedule.service')
const ScheduleModel = require('../models/Schedule');
const sendResponse = require('../utils/response');

const createSchedule = async (req, res) => {

    try {
        const scheduleData = req.body

        if (!scheduleData || typeof scheduleData !== 'object' || Object.keys(scheduleData).length === 0) {
            return sendResponse(res, 400, false, "Dados inválidos ou vazios")
        }

        const scheduleMap = new Map(Object.entries(scheduleData))
        const schedule = await scheduleService.create({ schedule: scheduleMap });

        return sendResponse(res, 201, true, "Escala criada com sucesso", schedule)

    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao criar escala", null, error.message)
    }

}

const findByID = async (req, res) => {

    try {
        const {id} = req.params

    const schedules = await scheduleService.findById(id);

    if (!schedules || schedules.length === 0) {
        return sendResponse(res, 404, false, "Nenhuma escala encontrada")
    }

    return sendResponse(res, 200, true, "Escala encontrada", schedules)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao busca escala", null, error.message)
    }
    
}

const findAll = async (req, res) => {

    try {
        const schedule = await scheduleService.findAll()

    if(!schedule || schedule.length === 0){
        return sendResponse(res, 404, false, "Nenhuma escala encontrada")
    }

    return sendResponse(res, 200, true, "Escala encontrada", schedule)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno no servidor - findAll", null, error.message)
    }
    
}

const updateSchedule = async (req, res) => {
    try {
        const { date, id } = req.body;

        // Busca apenas o documento alvo
        const scheduleDoc = await ScheduleModel.findOne();

        if (!scheduleDoc) {
            return sendResponse(res, 404, false, "Nenhuma escala encontrada")
        }

        
        const scheduleForDate = scheduleDoc.schedule.get(date) || [];

        let newScheduleForDate;
        if (scheduleForDate.includes(id)) {
            
            newScheduleForDate = scheduleForDate.filter(u => u !== id);
        } else {
            newScheduleForDate = [...scheduleForDate, id];
        }

        const updated = await ScheduleModel.findOneAndUpdate(
            { _id: scheduleDoc._id },
            { $set: { [`schedule.${date}`]: newScheduleForDate } },
            { new: true } 
        );

        return sendResponse(res, 200, true, "Escala atualizada com sucesso", updated)

    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao atualizar escala", null, error.message)
    }
};


const findByDate = async (req, res) => {
    const {date} = req.params; 

    try {
        const schedule = await scheduleService.findByDate(date);

        if (!schedule) {
            return sendResponse(res, 404, false, "Nenhuma escala encontrada para essa data.")
        }

        return sendResponse(res, 200, true, "Escala encontrada", schedule)
    
    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao buscar escala na data informada", date, error.message)
    }
};

// Comentado por causa da migração para Vercel Serverless

// const deleteSchedule = async (req, res) => {
//     const schedule = await scheduleService.deleteAll()

//     res.send("Escala deletada com sucesso")
// }


module.exports = {
    createSchedule,
    findByID,
    findAll,
    updateSchedule,
    findByDate,
}