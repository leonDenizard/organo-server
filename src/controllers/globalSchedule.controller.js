const mongoose = require("mongoose");
const globalScheduleService = require("../services/globalSchedule.service")
const sendResponse = require("../utils/response")

const create = async (req, res) => {
  try {
    let schedules = req.body;

    // Se o body for objeto único, transforma em array
    if (!Array.isArray(schedules)) {
      schedules = [schedules];
    }

    //convertendo as ref para object_id
    function toObjectId(id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
      } else {
        throw new Error(`ID inválido: ${id}`);
      }
    }

    schedules = schedules.map(schedule => {
      schedule.shifts = schedule.shifts.map(shift => ({
        ...shift,
        userId: toObjectId(shift.userId),
        status: toObjectId(shift.status),
        time: toObjectId(shift.time)
      }));
      return schedule;
    });

    console.log(schedules)
    const dates = schedules.map(s => s.date)

    const existing = await globalScheduleService.findByDate(dates)

    if (existing && existing.length > 0) {
      const existingDates = existing.map(e => e.date);
      return sendResponse(res, 400, false, "Datas já existem", existingDates);
    }

    // for (const schedule of schedules) {
    //   console.log(schedule.date)

    //   const exists = await globalScheduleService.findByDate(schedule.date)
    //   if (exists) {
    //     return sendResponse(res, 200, false, "Data já existe na escala", schedule.date);
    //   }
    // }


    for (const schedule of schedules) {

      if (!schedule.date) {
        return sendResponse(res, 400, false, "Cada escala precisa ter 'date'");
      }
      if (!schedule.shifts || !Array.isArray(schedule.shifts)) {
        return sendResponse(res, 400, false, "Cada escala precisa ter shifts");
      }
    }

    // Cria todas de uma vez
    const newSchedules = await globalScheduleService.create(schedules);

    return sendResponse(res, 201, true, "Escalas criadas com sucesso", newSchedules);

  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao criar escalas", null, error.message);
  }
}

const getAll = async (req, res) => {

  try {
    const data = await globalScheduleService.getAll()

    if (data.length === 0) {
      return sendResponse(res, 400, false, "Nenhuma escala encontrada")
    }

    sendResponse(res, 200, true, "Escala", data)

  } catch (error) {
    return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }

}

// Buscando a escala de um usuário

const getByUser = async (req, res) => {

  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "ID inválido")
    }

    console.log(id)
    const getUser = await globalScheduleService.getByUser(id)
    console.log(getUser)

    if (!getUser) {
      return sendResponse(res, 404, false, "usuário não encontrado")
    }

    return sendResponse(res, 200, true, "usuário encontrado", getUser)
  } catch (error) {
    return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
}

module.exports = { create, getAll, getByUser }
