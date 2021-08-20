import Clubs from '../models/clubs.js'
import { NotFound } from '../lib/errors.js'

async function clubIndex(_req, res, next) {
  try {
    const clubs = await Clubs.find()
    return res.status(200).json(clubs)
  } catch (err) {
    next(err)
  }
}

async function clubCreate(req, res, next) {
  try {
    const createdClub = await Clubs.create(req.body)
    return res.status(201).json(createdClub)
  } catch (err) {
    next(err)
  }
}

async function clubShow(req, res, next) {
  const { clubId } = req.params
  try {
    const foundClub = await Clubs.findById(clubId)
    if (!foundClub) {
      throw new NotFound()
    }
    return res.status(200).json(foundClub)
  } catch (err) {
    next(err)
  }
}

async function clubUpdate(req, res, next) {
  const { clubId } = req.params
  try {
    const clubToUpdate = await Clubs.findById(clubId)
    if (!clubToUpdate) {
      throw new NotFound()
    }
    await clubToUpdate.save()
    Object.assign(clubToUpdate, req.body)
    await clubToUpdate.save()
    return res.status(202).json(clubToUpdate)
  } catch (err) {
    next(err)
  }
}

async function clubDelete(req, res, next) {
  const { clubId } = req.params
  try {
    const clubToDelete = await Clubs.findById(clubId)
    if (!clubToDelete) {
      throw new NotFound()
    }
    await clubToDelete.remove() 
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


export default {
  index: clubIndex,
  create: clubCreate,
  show: clubShow,
  update: clubUpdate,
  delete: clubDelete,
}