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

const getByUser = async (userId) => {
  const docs = await GlobalSchedule.find({ "shifts.userId": userId })
    .populate("shifts.userId")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean();

  return docs.map(doc => ({
    ...doc,
    shifts: doc.shifts.filter(s => String(s.userId._id) === String(userId))
  }));
};

// const getByUser = async (userId) => {
//   return GlobalSchedule.aggregate([
//     { $match: { "shifts.userId": new mongoose.Types.ObjectId(userId) } },
//     {
//       $project: {
//         date: 1,
//         dayOfWeek: 1,
//         shifts: {
//           $filter: {
//             input: "$shifts",
//             as: "shift",
//             cond: { $eq: ["$$shift.userId", new mongoose.Types.ObjectId(userId)] }
//           }
//         }
//       }
//     }
//   ])
// }

const getByDate = (date) => {
  return GlobalSchedule.find({ date })
    .populate("shifts.userId")
    .populate("shifts.status")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean()
}

const updateStatus = (userId, date, statusId) => {
  return GlobalSchedule.findOneAndUpdate({
    date: date,
    "shifts.userId": userId
  },{
    $set: {"shifts.$.status": statusId}
  }, 
  {new: true})
    .populate("shifts.userId", "name")
    .populate("shifts.status", "name code")

}


module.exports = {
  create,
  findByDate,
  getAll,
  getByUser,
  getByDate,
  updateStatus
}