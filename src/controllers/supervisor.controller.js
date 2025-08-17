const supervisorService = require('../services/supervisor.service');
const sendResponse = require('../utils/response');

const create = async (req, res) => {
  try {
    const { name } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return sendResponse(res, 400, false, "O campo 'name' é obrigatório.");
    }

    const exists = await supervisorService.findByName(name.trim());
    if (exists) {
      return sendResponse(res, 409, false, "Supervisor já existe.");
    }

    const created = await supervisorService.create({ ...req.body, name: name.trim() });
    return sendResponse(res, 201, true, "Supervisor criado com sucesso.", created);
  } catch (error) {
    return sendResponse(res, 500, false, "Erro interno ao criar supervisor.", null, error.message);
  }
};


const findAll = async (req, res) => {
  try {
    const supervisors = await supervisorService.findAllSuper();

    if (!supervisors || supervisors.length === 0) {
      return sendResponse(res, 404, false, "Nenhum supervisor cadastrado.");
    }

    return sendResponse(res, 200, true, "Supervisores encontrados.", supervisors);
  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao buscar supervisores.", null, error.message);
  }
};


const findById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, false, "O parâmetro 'id' é obrigatório.");
    }

    const supervisor = await supervisorService.findById(id);
    if (!supervisor) {
      return sendResponse(res, 404, false, "Supervisor não encontrado.");
    }

    return sendResponse(res, 200, true, "Supervisor encontrado.", supervisor);
  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao buscar supervisor.", null, error.message);
  }
};


const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, false, "O parâmetro 'id' é obrigatório.");
    }

    const deleted = await supervisorService.deleteById(id);
    if (!deleted) {
      return sendResponse(res, 404, false, "Supervisor não encontrado.");
    }

    return sendResponse(res, 200, true, "Supervisor deletado com sucesso.", deleted);
  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao deletar supervisor.", null, error.message);
  }
};


const deleteAll = async (req, res) => {
  try {
    await supervisorService.deleteAll();
    return sendResponse(res, 200, true, "Supervisores deletados.");
  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao deletar supervisores.", null, error.message);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  deleteById,
  deleteAll,
};
