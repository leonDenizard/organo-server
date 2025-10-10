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
    .populate("shifts.userId", "name photoUrl surname squad manager")
    .populate("shifts.status")
    .populate("shifts.time")
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

const updateShift = async (shiftId, statusId, timeId) => {
  const updateFields = {};
  if (statusId) updateFields["shifts.$.status"] = statusId;
  if (timeId) updateFields["shifts.$.time"] = timeId;

  const doc = await GlobalSchedule.findOneAndUpdate(
    { "shifts._id": new mongoose.Types.ObjectId(shiftId) },
    { $set: updateFields },
    { new: true }
  )
    .populate("shifts.userId", "name")
    .populate("shifts.status", "name code")
    .populate("shifts.time", "startTime endTime");

  if (!doc) return null;

  return {
    ...doc.toObject(),
    shifts: doc.shifts.filter(s => String(s._id) === String(shiftId))
  };
};

const deleteSchedule = async () => GlobalSchedule.deleteMany()

const updateShiftBulk = async ({ shiftId, statusId, timeId }) => {
  const bulkOps = shiftId.map((id) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { statusId, timeId } }
    }
  }));

  if (bulkOps.length === 0) {
    throw new Error("Nenhum shiftId fornecido para atualização");
  }

  const result = await GlobalSchedule.bulkWrite(bulkOps);
  return result
};

module.exports = {
  create,
  findByDate,
  getAll,
  getByUser,
  getByDate,
  updateShift,
  deleteSchedule,
  updateShiftBulk
}