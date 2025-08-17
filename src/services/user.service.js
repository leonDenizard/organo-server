const { default: mongoose } = require('mongoose');
const User = require('../models/User')


const create = (body) => User.create(body)

const findAll = () => User.find()

const findById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await User.findById(id);
};

const deleteAll = () => User.deleteMany()

const findByIDAndUpdate = (id, update) => {
    
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findOneAndUpdate({ _id: id }, update, { new: true })
}

const deleteById = (id) => {
    return User.findOneAndDelete({_id: id})
}
module.exports = {
    create,
    findAll,
    findById,
    deleteAll,
    findByIDAndUpdate,
    deleteById
}