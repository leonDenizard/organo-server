const Status = require("../models/Status");

const create = (body) => Status.create(body)
const findAll = () => Status.find()
const findById = (id) => Status.findById(id)
const findByName = (name) => Status.findOne({name})
const deleteAll = () => Status.deleteMany()
const deleteById = (id) => Status.findByIdAndDelete(id)


module.exports = {create, findAll, findById, findByName, deleteAll, deleteById}