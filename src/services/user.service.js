const User = require('../models/User')


const create = (body) => User.create(body)

const findAll = () => User.find()

const findById = async (uid) => {
    return await User.findOne({uid: String(uid)});
};

const deleteAll = () => User.deleteMany()

const findByUidAndUpdate = (uid, update) => {
   return User.findOneAndUpdate({uid: uid}, update, {new: true})
}
module.exports = {
    create,
    findAll,
    findById,
    deleteAll,
    findByUidAndUpdate
}