const supervisorService = require('../services/supervisor.service')

const create = async (req, res) => {

    try {

        const { name } = req.body
        const supervisor = await supervisorService.findByName(name)

        if (supervisor) {
            return res.status(400).json({ message: "Supervisor já criado" })
        }

        await supervisorService.create(req.body)
        console.log(req.body)

        res.status(201).send({
            message: "Super criado",
            super: name
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor", error })
    }

}

const findAll = async (req, res) => {

    const AllSupervisors = await supervisorService.findAllSuper()

    if (!AllSupervisors) {
        return res.status(404).json({ message: "Nenhum super cadastrado" });
    }

    res.status(200).send(AllSupervisors)

}

const findById = async (req, res) => {

    const id = req.params.id
    const supervisor = await supervisorService.findById(id)

    console.log(supervisor)

    if(!supervisor){
        return res.status(404).json({message: "Supervisor não encontrado"})
    }

    res.status(200).json({message: "Super encontrado", supervisor})
    
}

const deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        const supervisor = await supervisorService.deleteById(id); // ✅ agora sim

        if (!supervisor) {
            return res.status(404).json({ message: "Super não encontrado" });
        }

        res.status(200).json({
            message: "Super deletado com sucesso",
            supervisor
        });
    } catch (error) {
        console.error("Erro ao deletar supervisor:", error);
        res.status(500).json({ message: "Erro interno ao deletar supervisor" });
    }
};

const deleteAll = async (req, res) => {

    try {
        
        await supervisorService.deleteAll()

        res.status(200).json({message: "Supervisores deletados"})
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