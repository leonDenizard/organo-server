const Squad = require('../models/Squad')

const create = (body) => Squad.create(body)

const findAllSquad = () => Squad.find()

const findById = (id) => {
    return Squad.findById(id)
}

const findByName = (name) =>{
    return Squad.findOne({name})
}

const deleteAll = () => Squad.deleteMany()

const deleteById = (id) => {
    return Squad.findByIdAndDelete(id)
} 


module.exports = {
    create,
    findAllSquad,
    findById,
    findByName,
    deleteAll,
    deleteById
}