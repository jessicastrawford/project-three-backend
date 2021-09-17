import Club from '../models/clubs.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

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
      .populate('addedBy')
      .populate('pubs.addedBy')
      .populate('likedBy')
      .populate('pubs.likedBy')

    if (!clubToFind) throw new NotFound()
    return res.status(200).json(clubToFind)
  } catch (err) {
    next(err)
  }
}

async function clubCreate(req, res, next) {
  const { currentUser } = req
  try {
    const createdClub = await Club.create({ ...req.body, addedBy: currentUser })
    return res.status(201).json(createdClub)
  } catch (err) {
    next(err)
  }
}

async function clubDelete(req, res, next) {
  const { clubId } = req.params
  const { currentUser } = req
  try {
    const clubToDelete = await Club.findById(clubId)
    if (!currentUser.isAdmin) {
      throw new Unauthorized()
    }
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
  const { currentUser } = req
  try {
    const clubToUpdate = await Club.findByIdAndUpdate(clubId)
    if (!currentUser.isAdmin) {
      throw new Unauthorized()
    }
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

async function toggleClubLike(req, res, next) {
  const { clubId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const clubToLike = await Club.findById(clubId).populate('likedBy')

    if (!clubToLike) throw new NotFound()

    if (clubToLike.likedBy.find(user => currentUserId.equals(user._id))) {
      clubToLike.likedBy.remove(currentUser)
    } else {
      clubToLike.likedBy.push(currentUser)
    }
    await clubToLike.save()
    res.status(202).json(clubToLike)
  } catch (err) {
    next(err)
  }
}

async function pubCreate(req, res, next) {
  const { clubId } = req.params
  const { currentUser } = req
  console.log(clubId)
  try {
    console.log(clubId)
    const club = await Club.findById(clubId)
    if (!club) throw new NotFound()
    const createdPub = club.pubs.create({ ...req.body, addedBy: currentUser })
    console.log(club)
    club.pubs.push(createdPub)
    await club.save()
    return res.status(201).json(club)
  } catch (err) {
    next(err)
  }
}

async function pubIndex(req, res, next) {
  const pubs = []
  try {
    const clubs = await Club.find()
    clubs.map(club => {
      pubs.push(club.pubs)
    })
    return res.status(200).json(pubs)
  } catch (err) {
    next(err)
  }
}

async function pubShow(req, res, next) {
  const { clubId, pubId } = req.params
  try {
    const club = await Club.findById(clubId)
      .populate('addedBy')
    if (!club) throw new NotFound()
    const pubToFind = await club.pubs.id(pubId)
    if (!pubToFind) throw new NotFound()
    return res.status(200).json(pubToFind)
  } catch (err) {
    next(err)
  }
}

async function pubDelete(req, res, next) {
  const { clubId, pubId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const club = await Club.findById(clubId)
    if (!club) throw new NotFound()
    const pubToDelete = club.pubs.id(pubId)
    if (!pubToDelete) throw new NotFound()
    if (!pubToDelete.addedBy.equals(currentUserId) && !currentUser.isAdmin) {
      throw new Unauthorized()
    }
    await pubToDelete.remove()
    await club.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function togglePubLike(req, res, next) {
  const { clubId, pubId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const club = await Club.findById(clubId).populate('pubs.likedBy')
    if (!club) throw new NotFound()

    const pubToLike = await club.pubs.id(pubId)
    if (!pubToLike) throw new NotFound()

    if (pubToLike.likedBy.find(user => currentUserId.equals(user._id))) {
      pubToLike.likedBy.remove(currentUser)
    } else {
      pubToLike.likedBy.push(currentUser)
    }
    await club.save()
    res.status(202).json(pubToLike)
  } catch (err) {
    next(err)
  }
}

async function commentCreate(req, res, next) {
  const { clubId, pubId } = req.params
  const { currentUser } = req
  try {
    const club = await Club.findById(clubId)
    if (!club) throw new NotFound()
    const pub = await club.pubs.id(pubId)
    if (!pub) throw new NotFound()
    pub.comments.push({ ...req.body, addedBy: currentUser })
    await club.save()
    return res.status(201).json(club)
  } catch (err) {
    next(err)
  }
}

async function commentShow(req, res, next) {
  const { clubId, pubId } = req.params
  try {
    const club = await Club.findById(clubId)
      .populate('addedBy')
    if (!club) throw new NotFound()
    const pub = await club.pubs.id(pubId)
    if (!pub) throw new NotFound()
    return res.status(200).json(pub.comments)
  } catch (err) {
    next(err)
  }
}

async function commentDelete(req, res, next) {
  const { clubId, pubId, commentId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const club = await Club.findById(clubId)
    if (!club) throw new NotFound()
    const pub = club.pubs.id(pubId)
    if (!pub) throw new NotFound()
    const commentToDelete = pub.comments.id(commentId)
    if (!commentToDelete.addedBy.equals(currentUserId) && !currentUser.isAdmin) {
      throw new Unauthorized()
    }
    await commentToDelete.remove()
    await club.save()
    return res.sendStatus(204)
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
  likeClub: toggleClubLike,
  pubCreate: pubCreate,
  pubIndex: pubIndex,
  pubShow: pubShow,
  pubDelete: pubDelete,
  likePub: togglePubLike,
  commentCreate: commentCreate,
  commentDelete: commentDelete,
  commentShow: commentShow,
}