const { default: mongoose } = require('mongoose')
const GlobalSchedule = require('../models/GlobalSchedule')

const create = async (body) => await GlobalSchedule.create(body)

const findByDate = async (date) => {
  if (Array.isArray(date)) {
    return await GlobalSchedule.find({ date: { $in: date } })
  }
  return await GlobalSchedule.findOne({ date: date })
}

const getAll = async () => {
  return await GlobalSchedule.find()
    .populate("shifts.userId", "name photoUrl surname squad manager")
    .populate("shifts.status")
    .populate("shifts.time")
}

const getByUser = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const docs = await GlobalSchedule.find({ "shifts.userId": userObjectId })
    .sort({ date: 1 }) // 🔹 garante ordem cronológica
    .populate("shifts.userId", "name photoUrl surname squad manager")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean();

  // 🔹 Filtra apenas os shifts do usuário e remove duplicatas
  const result = docs
    .map((doc) => ({
      ...doc,
      shifts: doc.shifts.filter(
        (s) => String(s.userId?._id) === String(userId)
      ),
    }))
    .filter((d) => d.shifts.length > 0); // ignora dias sem turnos do usuário

  return result;
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

const getByDate = async (date) => {
  return await GlobalSchedule.find({ date })
    .populate("shifts.userId")
    .populate("shifts.status")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean()
}

const updateByDate = async (date, data) => {
  return await GlobalSchedule.findOneAndUpdate(
    { date },
    { $set: data },
    { new: true }
  )
    .populate("shifts.userId", "name photoUrl surname squad manager")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean();
};

const updateShift = async (shiftId, statusId, timeId) => {
  const updateFields = {}
  if (statusId) updateFields["shifts.$.status"] = statusId
  if (timeId) updateFields["shifts.$.time"] = timeId

  const doc = await GlobalSchedule.findOneAndUpdate(
    { "shifts._id": new mongoose.Types.ObjectId(shiftId) },
    { $set: updateFields },
    { new: true }
  )
    .populate("shifts.userId", "name")
    .populate("shifts.status", "name code")
    .populate("shifts.time", "startTime endTime")

  if (!doc) return null

  return {
    ...doc.toObject(),
    shifts: doc.shifts.filter(s => String(s._id) === String(shiftId))
  }
}

const deleteSchedule = async () => await GlobalSchedule.deleteMany()

const updateShiftBulk = async ({ shiftId, statusId, timeId }) => {
  // depuraando:
  //console.log("Atualizando shifts:", shiftId)

  //garantido que o shiftId seja um array

  const shiftIds = Array.isArray(shiftId) ? shiftId : [shiftId]

  const result = await GlobalSchedule.updateMany(
    { "shifts._id": { $in: shiftIds } },
    {
      $set: {
        "shifts.$[elem].status": statusId,
        "shifts.$[elem].time": timeId,
      },
    },
    {
      arrayFilters: [{ "elem._id": { $in: shiftIds.map(id => new mongoose.Types.ObjectId(id)) } }],
      multi: true,
    }
  )

  // Busca novamente os registros atualizados e popula status + time
  const updatedSchedules = await GlobalSchedule.find({ "shifts._id": { $in: shiftId } })
    .populate("shifts.userId")
    .populate("shifts.status")
    .populate("shifts.time")
    .lean()

  return {
    result,
    updatedSchedules,
  }
}

const deleteScheduleByID = async (ids) => {


  const scheduleDeleted = await GlobalSchedule.aggregate([
    { $match: { "shifts.userId": { $in: ids.map(id => new mongoose.Types.ObjectId(id)) } } },
    {
      $project: {
        date: 1,
        shifts: {
          $filter: {
            input: "$shifts",
            as: "shift",
            cond: { $in: ["$$shift.userId", ids.map(id => new mongoose.Types.ObjectId(id))] }
          }
        }
      }
    }
  ]);

  const result = await GlobalSchedule.updateMany(
    { "shifts.userId": { $in: ids } },
    { $pull: { shifts: { userId: { $in: ids } } } })

  return {
    deletedUsers: scheduleDeleted,
    result,
  }

}

module.exports = {
  create,
  findByDate,
  getAll,
  getByUser,
  getByDate,
  updateShift,
  deleteSchedule,
  updateShiftBulk,
  updateByDate,
  deleteScheduleByID
}