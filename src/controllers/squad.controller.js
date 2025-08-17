const squadService = require('../services/squad.service')
const sendResponse = require('../utils/response')

const create = async (req, res) => {

    try {

        const { name, description } = req.body

        if (!name) {
            return sendResponse(res, 400, false, "O name do Squad é obrigatório")
        }

        const squadExists = await squadService.findByName(name)

        if (squadExists) {
            return sendResponse(res, 409, false, "Squad já criado")
        }

        const squadCreated = await squadService.create(req.body)

        return sendResponse(res, 201, true, "Squad criado com sucesso", squadCreated)

    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao criar squad", null, error.message)
    }

}

const findAll = async (req, res) => {

    try {
        const allSquad = await squadService.findAllSquad()

        if (!allSquad) {
            return sendResponse(res, 404, false, "Nenhum squad encontrado")
        }

        return sendResponse(res, 200, true, "Squads encontrados", allSquad)
    } catch (error) {
        return sendResponse(res, 500, DisposableStack, "Erro ao buscar squads", null, error.message)
    }

}

const findById = async (req, res) => {

    try {
        const { id } = req.params
        const squad = await squadService.findById(id)

        if (!squad) {
            return sendResponse(res, 404, false, "Squad não encontrado")
        }

        return sendResponse(res, 200, true, "Squad encontrado", squad)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro ao buscar squad", null, error.message)
    }
}

const deleteById = async (req, res) => {
    const {id} = req.params;

    try {
        const squad = await squadService.deleteById(id);

        if (!squad) {
            return sendResponse(res, 404, false, "Squad não encontrado")
        }

        return sendResponse(res, 200, true, "Squad deletado com sucesso", squad)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno ao deletar Squad", null, error.message)
    }
};

const deleteAll = async (req, res) => {

    try {

        const squad = await squadService.deleteAll()

         if (!squad) {
            return sendResponse(res, 404, false, "Nenhum Squad encontrado")
        }

        return sendResponse(res, 200, true, "Squads deletados com sucesso", squad)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno ao deletar Squads", null, error.message)
    }
}
module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    deleteAll
}