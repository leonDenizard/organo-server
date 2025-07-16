const Position = require('../models/Position')

const create = (body) => Position.create(body)

const findAllSuper = () => Position.find()

const findById = (id) => {
    return Position.findById(id)
}

const findByName = (name) =>{
    return Position.findOne({name})
}

const deleteAll = () => Position.deleteMany()

const deleteById = (id) => {
    return Position.findByIdAndDelete(id)
} 


module.exports = {
    create,
    findAllSuper,
    findById,
    findByName,
    deleteAll,
    deleteById
}