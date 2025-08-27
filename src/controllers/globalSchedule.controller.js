const GlobalScheduleService = require("../services/globalSchedule.service")
const sendResponse = require("../utils/response")

const create = async (req, res) => {
  try {
    let schedules = req.body;

    // Se o body for objeto único, transforma em array
    if (!Array.isArray(schedules)) {
      schedules = [schedules];
    }

    // Validações (como já fizemos antes)
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

module.exports = { create }
