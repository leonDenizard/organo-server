const mongoose = require("mongoose");
const globalScheduleService = require("../services/globalSchedule.service")
const sendResponse = require("../utils/response")

const create = async (req, res) => {
  try {
    let schedules = Array.isArray(req.body) ? req.body : [req.body];

    const toObjectId = (id) =>
      mongoose.Types.ObjectId.isValid(id)
        ? new mongoose.Types.ObjectId(id)
        : (() => {
            throw new Error(`ID inválido: ${id}`);
          })();

    for (const schedule of schedules) {
      const existing = await globalScheduleService.findByDate(schedule.date);

      if (!existing) {
        // se o dia não existe, cria novo
        schedule.shifts = schedule.shifts.map((shift) => ({
          ...shift,
          userId: toObjectId(shift.userId),
          status: toObjectId(shift.status),
          time: toObjectId(shift.time),
        }));
        await globalScheduleService.create(schedule);
      } else {
        // se já existe, faz merge
        const mergedShifts = [...existing.shifts];

        for (const newShift of schedule.shifts) {
          const idx = existing.shifts.findIndex(
            (s) => s.userId.toString() === newShift.userId
          );

          if (idx === -1) {
            // novo user — adiciona
            mergedShifts.push({
              ...newShift,
              userId: toObjectId(newShift.userId),
              status: toObjectId(newShift.status),
              time: toObjectId(newShift.time),
            });
          } else {
            // user existente — atualiza
            mergedShifts[idx].status = toObjectId(newShift.status);
            mergedShifts[idx].time = toObjectId(newShift.time);
          }
        }

        await globalScheduleService.updateByDate(schedule.date, {
          shifts: mergedShifts,
        });
      }
    }

    return sendResponse(res, 201, true, "Escalas mescladas/criadas com sucesso");
  } catch (error) {
    console.error("Erro ao criar/mesclar escala:", error);
    return sendResponse(res, 500, false, "Erro ao criar/mesclar escala", null, error.message);
  }
};


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


    const getUser = await globalScheduleService.getByUser(id)


    if (!getUser) {
      return sendResponse(res, 404, false, "usuário não encontrado")
    }

    return sendResponse(res, 200, true, "usuário encontrado", getUser)
  } catch (error) {
    return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
}

const getByDate = async (req, res) => {

  try {
    const { date } = req.params

    const data = await globalScheduleService.getByDate(date)
    sendResponse(res, 200, true, `Escala para o dia ${date}`, data)
  } catch (error) {
    sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
}

const updateShift = async (req, res) => {

  try {
    const { shiftId } = req.params
    const { statusId, timeId } = req.body

    const update = await globalScheduleService.updateShift(shiftId, statusId, timeId)

    if (!update) {
      return sendResponse(res, 404, false, "Nenhum usuário encontrado", { shiftId })
    }

    sendResponse(res, 200, true, `Resultado`, update)
  } catch (error) {
    sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
}

const deleteSchedule = async (req, res) => {
  try {

    const deletedSchedule = await globalScheduleService.deleteSchedule()

    if (!deletedSchedule) {
      return sendResponse(res, 400, false, "Não foi possível deletar escala")
    }

    sendResponse(res, 200, true, "Escala excluida com sucesso", deleteSchedule)
  } catch (error) {
    sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
  }
}

const updateShiftBulk = async (req, res) => {

  
  try {
    const { shiftId, statusId, timeId } = req.body;

    if (!shiftId || shiftId.length === 0) {
      return sendResponse(res, 400, false, "Nenhum shiftId válido foi enviado");
    }
    

    const result = await globalScheduleService.updateShiftBulk({ shiftId, statusId, timeId })
   
    //shiftid ["68e6fba4a5d732da89ee3ea0", "68e6fba4a5d732da89ee3ea1", "68e6fba4a5d732da89ee3ea2"]
    //statusId 68af8d8ab8fed86bded55a85 working
    //timeId 68ad18559e7a371dd002d165 10-19

    return sendResponse(res, 200, true, "Atualizações concluídas", result);

  } catch (error) {
    sendResponse(res, 500, false, "Erro interno no servidor", null, error.message);
  }
}

const deleteScheduleByID = async (req, res) => {
  try {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "ID inválido")
    }

    const result = await globalScheduleService.deleteScheduleByID(id)

    return sendResponse(res, 200, true, "Usuário deletado com sucesso", result);
  } catch (error) {
    sendResponse(res, 500, false, "Erro interno no servidor", null, error.message);
  }
}

module.exports = { 
  create, 
  getAll, 
  getByUser, 
  getByDate, 
  updateShift, 
  deleteSchedule, 
  updateShiftBulk,
  deleteScheduleByID 
}
