const positionService = require('../services/position.service')

const create = async (req, res) => {

    try {

        const { name } = req.body
        const position = await positionService.findByName(name)

        if (position) {
            return res.status(400).json({ message: "Cargo já criado" })
        }

        await positionService.create(req.body)
        

        res.status(201).send({
            message: "Position criado",
            super: name
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor", error })
    }

}

const findAll = async (req, res) => {

    const AllPosition = await positionService.findAllPosition()

    if (!AllPosition) {
        return res.status(404).json({ message: "Nenhum super cadastrado" });
    }

    res.status(200).json({AllPosition})

}

const findById = async (req, res) => {

    const id = req.params.id
    const position = await positionService.findById(id)

    

    if(!position){
        return res.status(404).json({message: "Cargo não encontrado"})
    }

    res.status(200).json({message: "Cargo encontrado", position})
    
}

const deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        const position = await positionService.deleteById(id)

        if (!position) {
            return res.status(404).json({ message: "Cargo não encontrado" });
        }

        res.status(200).json({
            message: "Cargo deletado com sucesso",
            position
        });
    } catch (error) {
        console.error("Erro ao deletar cargo:", error);
        res.status(500).json({ message: "Erro interno ao deletar supervisor" });
    }
};

const deleteAll = async (req, res) => {

    try {
        
        await positionService.deleteAll()

        res.status(200).json({message: "Cargo deletados"})
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