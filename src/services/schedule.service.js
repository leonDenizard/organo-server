const Schedule = require('../models/Schedule')

const create = (body) => Schedule.create(body)

const findById = async (uid) => {
    const schedules = await Schedule.find({})

    const filterSchedules = schedules.filter(schedule => {
        for (const [date, uids] of schedule.schedule) {
            if (uids.includes(uid)) {
                return true
            }
        }
        return false
    })
    return filterSchedules
}

const findAll = () => Schedule.find()


const findByDate = async (date) => {
    try {
        const result = await Schedule.findOne(); // Obtém o documento da coleção

        if (!result) {
            console.log("Nenhuma escala encontrada no banco de dados.");
            return null;
        }

        console.log("🔍 Documento encontrado:", result); // Depuração

        if (result.schedule instanceof Map && result.schedule.has(date)) {
            console.log("✅ Escala encontrada para a data:", date, result.schedule.get(date));
            return { [date]: result.schedule.get(date) };
        } else {
            console.log("❌ Data não encontrada no schedule:", date);
        }

        return null;
    } catch (error) {
        console.error("Erro ao buscar escala por data:", error);
        return null;
    }
};



const update = async (date, updatedSchedule) => {
    try {
        const result = await Schedule.findOneAndUpdate(
            { [`schedule.${date}`]: { $exists: true } },
            { $set: { [`schedule.${date}`]: updatedSchedule } },
            { new: true, upsert: true }
        );
        return result;
    } catch (error) {
        console.error("Erro ao atualizar escala:", error);
        throw error;
    }
};



module.exports = {
    create,
    findById,
    findAll,
    update,
    findByDate
}