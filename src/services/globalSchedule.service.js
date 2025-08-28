const { default: mongoose } = require('mongoose')
const GlobalSchedule = require('../models/GlobalSchedule')

const create = (body) => GlobalSchedule.create(body)

const findByDate = (date) => {
  if (Array.isArray(date)) {
    return GlobalSchedule.find({ date: { $in: date } })
  }
  return GlobalSchedule.findOne({ date: date })
}

const getAll = () => {
  return GlobalSchedule.find()
}

// const getByUser = (userId) => {
//   return GlobalSchedule.find({"shifts.userId": userId})
//     .populate("shifts.userId")
//     .populate("shifts.status")
//     .populate("shifts.time")
// }

const getByUser = async (userId) => {
  return GlobalSchedule.aggregate([
    { $match: { "shifts.userId": new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        date: 1,
        dayOfWeek: 1,
        shifts: {
          $filter: {
            input: "$shifts",
            as: "shift",
            cond: { $eq: ["$$shift.userId", new mongoose.Types.ObjectId(userId)] }
          }
        }
      }
    }
  ])
}


module.exports = {
  create,
  findByDate,
  getAll,
  getByUser
}