const squadService = require('../services/squad.service')

const create = async (req, res) => {

    try {

        const { name, description } = req.body
        console.log(req.body)
        const squad = await squadService.findByName(name)
        console.log(squad)
        if (squad) {
            return res.status(400).json({ message: "Squad já criado" })
        }

            await squadService.create(req.body)
        

        res.status(201).send({
            message: "Squad criado",
            squad: name,
            description: description
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor", error: error.message })
    }

}

const findAll = async (req, res) => {

    const allSquad = await squadService.findAllSquad()

    if (!allSquad) {
        return res.status(404).json({ message: "Nenhum squad cadastrado" });
    }

    res.status(200).json({message: allSquad})

}

const findById = async (req, res) => {

    const id = req.params.id
    const squad = await squadService.findById(id)

    

    if(!squad){
        return res.status(404).json({message: "Squad não encontrado"})
    }

    res.status(200).json({message: "Squad encontrado", squad})
    
}

const deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        const squad = await squadService.deleteById(id);

        if (!squad) {
            return res.status(404).json({ message: "Squad não encontrado" });
        }

        res.status(200).json({
            message: "Squad deletado com sucesso",
            squad
        });
    } catch (error) {
        console.error("Erro ao deletar Squad:", error);
        res.status(500).json({ message: "Erro interno ao deletar Squad" });
    }
};

const deleteAll = async (req, res) => {

    try {
        
        await squadService.deleteAll()

        res.status(200).json({message: "Squads deletados"})
    } catch (error) {
        res.status(500).json({message: "Erro interno no servidor"})
    }
}
module.exports = {
    create,
    findAll,
    findById,
    deleteById,
    deleteAll
}