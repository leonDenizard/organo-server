const workShiftService = require('../services/workShift.service');
const sendResponse = require('../utils/response');


const createWorkShift = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      return sendResponse(res, 400, false, "startTime e endTime são obrigatórios.");
    }

    const existingShift = await workShiftService.findByStartAndEndTime(startTime, endTime);
    if (existingShift) {
      return sendResponse(res, 409, false, "Já existe esse horário cadastrado.");
    }

    const workShift = await workShiftService.create(req.body);
    if (!workShift) {
      return sendResponse(res, 400, false, "Erro ao criar turno.");
    }

    return sendResponse(res, 201, true, "Horário de turno criado com sucesso.", workShift);
  } catch (error) {
    console.error("Erro ao criar turno:", error);
    return sendResponse(res, 500, false, "Erro interno ao criar turno.", null, error.message);
  }
};


const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const workShift = await workShiftService.findById(id);

    if (!workShift) {
      return sendResponse(res, 404, false, `Turno com ID ${id} não encontrado.`);
    }

    return sendResponse(res, 200, true, "Turno encontrado.", workShift);
  } catch (error) {
    console.error("Erro ao buscar turno:", error);
    return sendResponse(res, 500, false, "Erro interno ao buscar turno.", null, error.message);
  }
};


const findAllWorkShift = async (req, res) => {
  try {
    const shifts = await workShiftService.findAllWorkShift();

    if (!shifts || shifts.length === 0) {
      return sendResponse(res, 404, false, "Nenhum turno encontrado.");
    }

    return sendResponse(res, 200, true, "Turnos encontrados.", shifts);
  } catch (error) {
    console.error("Erro ao buscar turnos:", error);
    return sendResponse(res, 500, false, "Erro interno ao buscar turnos.", null, error.message);
  }
};


const deleteAll = async (req, res) => {
  try {
    const shifts = await workShiftService.findAllWorkShift();
    if (!shifts || shifts.length === 0) {
      return sendResponse(res, 404, false, "Não existem turnos cadastrados.");
    }

    await workShiftService.deleteAll();
    return sendResponse(res, 200, true, "Todos os turnos foram deletados.");
  } catch (error) {
    console.error("Erro ao deletar turnos:", error);
    return sendResponse(res, 500, false, "Erro interno ao deletar turnos.", null, error.message);
  }
};


const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await workShiftService.deleteById(id);

    if (!deleted) {
      return sendResponse(res, 404, false, `Turno com ID ${id} não encontrado.`);
    }

    return sendResponse(res, 200, true, `Turno deletado com sucesso.`, deleted);
  } catch (error) {
    console.error("Erro ao deletar turno:", error);
    return sendResponse(res, 500, false, "Erro interno ao deletar turno.", null, error.message);
  }
};

module.exports = {
  createWorkShift,
  findById,
  findAllWorkShift,
  deleteAll,
  deleteById,
};
