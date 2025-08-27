const GlobalScheduleService = require("../services/globalSchedule.service")
const sendResponse = require("../utils/response")

const create = async (req, res) => {
  try {
    let schedules = req.body;

    // Se o body for objeto único, transforma em array
    if (!Array.isArray(schedules)) {
      schedules = [schedules];
    }

    console.log(schedules)
    const dates = schedules.map(s => s.date)

    const existing = await GlobalScheduleService.findByDate(dates)

    if (existing && existing.length > 0) {
      const existingDates = existing.map(e => e.date);
      return sendResponse(res, 400, false, "Datas já existem", existingDates);
    }

    // for (const schedule of schedules) {
    //   console.log(schedule.date)

    //   const exists = await GlobalScheduleService.findByDate(schedule.date)
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
    const newSchedules = await GlobalScheduleService.create(schedules);

    return sendResponse(res, 201, true, "Escalas criadas com sucesso", newSchedules);

  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao criar escalas", null, error.message);
  }
}

const getAll = async (req, res) => {

  try {
    const data = await GlobalScheduleService.getAll()

    if(data.length === 0){
      return sendResponse(res, 400, false, "Nenhuma escala encontrada")
    }

    sendResponse(res, 200, true, "Escala", data)

  } catch (error) {
    return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
  
}

module.exports = { create, getAll }
