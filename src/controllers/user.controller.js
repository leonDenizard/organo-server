const userService = require('../services/user.service');
const sendResponse = require('../utils/response');

const createUser = async (req, res) => {
    try {
        const {
            _id, uid, name, whatsapp, slack, email, time, role,
            squad, manager, photoUrl, surname, birthday,
            child, admin, interval
        } = req.body;



        if (name?.trim() || email?.trim()) {
            const existsUser = await userService.findByNameOrEmail(name, email)

            if (existsUser) {
                return sendResponse(
                    res, 
                    409, 
                    false, 
                    existsUser.name === name ? "Já existe um usuário com este nome" : "Já existe um usuário com esse e-mail")
            }
        }

        const user = await userService.create(req.body);
        console.log(user)

        if (!user) {
            return sendResponse(res, 400, false, "Erro ao criar usuário");
        }

        return sendResponse(res, 201, true, "Usuário cadastrado com sucesso", {
            id: user._id,
            uid,
            name,
            whatsapp,
            slack,
            email,
            time,
            role,
            squad,
            manager,
            photoUrl,
            surname,
            birthday,
            child,
            admin,
            interval
        });

    } catch (error) {
        console.error(`Erro ao criar usuário: ${error}`);
        return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message);
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await userService.findAll();

        if (!users || users.length === 0) {
            return sendResponse(res, 404, false, "Nenhum usuário encontrado");
        }

        return sendResponse(res, 200, true, "Usuários encontrados", users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return sendResponse(res, 500, false, "Erro interno no servidor", null, error.message);
    }
};

const findById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userService.findById(id);

        if (!user) {
            return sendResponse(res, 404, false, "Usuário não encontrado");
        }

        return sendResponse(res, 200, true, "Usuário encontrado", user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return sendResponse(res, 500, false, "Erro ao buscar usuário", null, error.message);
    }
};

const deleteById = async (req, res) => {

    try {
        const { id } = req.params
        const user = await userService.deleteById(id)

        if (!user) {
            return sendResponse(res, 404, false, "Usuário não encontrado")
        }
        return sendResponse(res, 200, true, "Usuário deletado", user)
    } catch (error) {
        return sendResponse(res, 500, false, "Erro interno ao deletar usuário", null, error.message)
    }

}

const deleteAll = async (req, res) => {
    try {
        await userService.deleteAll();
        return sendResponse(res, 200, true, "Todos os usuários foram deletados");
    } catch (error) {
        console.error("Erro ao deletar usuários:", error);
        return sendResponse(res, 500, false, "Erro interno ao deletar usuários", null, error.message);
    }
};

const findByIDAndUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const updatedUser = await userService.findByIDAndUpdate(id, update);

        if (!updatedUser) {
            return sendResponse(res, 404, false, "Usuário não encontrado");
        }

        return sendResponse(res, 200, true, "Usuário atualizado com sucesso", updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return sendResponse(res, 500, false, "Erro ao tentar atualizar usuário", null, error.message);
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findById,
    deleteAll,
    findByIDAndUpdate,
    deleteById
};
