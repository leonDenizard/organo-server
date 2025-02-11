const Schedule = require('../models/Schedule')

const create = (body) => Schedule.create(body)

const findById = async (uid) => {
    const schedules = await Schedule.find({})

    const filterSchedules = schedules.filter(schedule => {
        for (const [date, uids] of schedule.schedule){
            if (uids.includes(uid)) {
                return true
            }
        }
        return false
    })
    return filterSchedules
}

const findAll = () => Schedule.find()


module.exports = {
    create,
    findById,
    findAll
}