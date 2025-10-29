const { default: mongoose } = require('mongoose')
const statusService = require('../services/status.service')
const sendResponse = require("../utils/response")

const create = async (req, res) => {
    const data = req.body


    try {
        if (!data) {
            sendResponse(res, 400, false, "Nenhum dado enviado")
        }


        await statusService.create(data)

        sendResponse(res, 201, true, "Status criado com sucesso", data)
    } catch (error) {
        sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)

    }
}

const findAll = async (req, res) => {

    try {
        const data = await statusService.findAll()

        if (!data || data.length === 0) {
            return sendResponse(res, 200, true, "Nenhum status encontrado", [])
        }

        return sendResponse(res, 200, true, "Status encontrados", data)
    } catch (error) {
        sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
    }

}

const findById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, false, "ID inválido")
        }

        const status = await statusService.findById(id)

        if (!status) {
            return sendResponse(res, 404, false, "ID não encontrado no banco")
        }

        return sendResponse(res, 200, true, "ID encontrado", status)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno no servidor", error.message)
    }
}

const findByName = async (req, res) => {

    try {
        const { name } = req.params

        const status = await statusService(name)

        if (!status) {
            sendResponse(res, 404, false, "Status não encontrado")
        }

        return sendResponse(res, 200, true, "Status encontrado", status)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message)
    }

}

const deleteById = async (req, res) => {

    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 400, false, "ID inválido")
        }

        const status = await statusService.deleteById(id)

        
        if (!status) {
            return sendResponse(res, 400, false, "Status não encontrado")
        }

        return sendResponse(res, 201, true, "Status deletado")
    } catch (error) {
        return sendResponse(res, 500, false, "Status deletado", null, error.message)
    }
}

const deleteAll = async (req, res) => {

    try {
    
        const status = await statusService.deleteAll()

        if(!status || status.length === 0 ){
            return sendResponse(res, 404, false, "Nenhum status encontrado")
        }

        return sendResponse(res, 200, true, "Status deletados", status)
    } catch (error) {
        return sendResponse(res, 500, true, "Status deletado", null, error.message)
    }
}

module.exports = {
    create,
    findAll,
    findById,
    findByName,
    deleteById,
    deleteAll
}