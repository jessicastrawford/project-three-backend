import Club from '../models/clubs.js'
import { NotFound } from '../lib/errors.js'

async function clubIndex(_req, res, next) {
  try {
    const clubs = await Club.find()
    return res.status(200).json(clubs)
  } catch (err) {
    next(err)
  }
}

async function clubShow(req, res, next) {
  const { clubId } = req.params
  try {
    const clubToFind = await Club.findById(clubId)

    if (!clubToFind) throw new NotFound()
    return res.status(200).json(clubToFind)
  } catch (err) {
    next(err)
  }
}

async function clubCreate(req, res, next) {
  try {
    const createdClub = await Club.create(req.body)
    return res.status(201).json(createdClub)
  } catch (err) {
    next(err)
  }
}

async function clubDelete(req, res, next) {
  const { clubId } = req.params
  try {
    const clubToDelete = await Club.findById(clubId)
    if (!clubToDelete) {
      throw new NotFound()
    }
    await clubToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function clubUpdate(req, res, next) {
  const { clubId } = req.params
  try {
    const clubToUpdate = await Club.findByIdAndUpdate(clubId)
    if (!clubToUpdate) {
      throw new NotFound()
    }
    Object.assign(clubToUpdate, req.body)
    await clubToUpdate.save()
    return res.status(202).json(clubToUpdate)
  } catch (err) {
    next(err)
  }
}


export default {
  index: clubIndex,
  create: clubCreate,
  show: clubShow,
  delete: clubDelete,
  update: clubUpdate,
}