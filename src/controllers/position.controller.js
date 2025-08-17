const positionService = require('../services/position.service')
const sendResponse = require('../utils/response')

const create = async (req, res) => {

    try {

        const { name } = req.body
        if (!name) {
            return sendResponse(res, 400, false, "O campo 'name' é obrigatório.")
        }
        const position = await positionService.findByName(name)

        if (position) {
            return sendResponse(res, 409, false, "Cargo já existe")
        }

        const newPosition = await positionService.create(req.body)


        return sendResponse(res, 201, true, "Cargo criado com sucesso", newPosition)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
    }

}

const findAll = async (req, res) => {

    try {
        const AllPosition = await positionService.findAllPosition()

        if (!AllPosition || AllPosition.lenght === 0) {
            return sendResponse(res, 404, false, "Nenhum cargo cadastrado")
        }

        return sendResponse(res, 200, true, "Lista de cargos encontradas", AllPosition)
    } catch (error) {

        return sendResponse(res, 500, false, "Erro ao buscar cargos", null, error.message)
    }

}

const findById = async (req, res) => {

    try {
        const {id} = req.params

    if(!id){
        return sendResponse(res, 400, false, "Cargo não encontrada")
    }

    const position = await positionService.findById(id)

    if (!position) {
        return sendResponse(res, 404, false, "Cargo não encontrado")
    }

    return sendResponse(res, 200, true, "Cargo encontrado", position)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao buscar cargo", null, error.message)
    }
    
}

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, "O parâmetro 'id' é obrigatório.");
    }

    const deleted = await positionService.deleteById(id);

    if (!deleted) {
      return sendResponse(res, 404, false, "Cargo não encontrado.");
    }

    return sendResponse(res, 200, true, "Cargo deletado com sucesso.", deleted);
  } catch (error) {
    console.error("Erro ao deletar cargo:", error);
    return sendResponse(res, 500, false, "Erro interno no servidor.", null, error.message);
  }
};

const deleteAll = async (req, res) => {
  try {
    await positionService.deleteAll();
    return sendResponse(res, 200, true, "Todos os cargos foram deletados.");
  } catch (error) {
    return sendResponse(res, 500, false, "Erro ao deletar cargos.", null, error.message);
  }
};
module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    deleteAll
}