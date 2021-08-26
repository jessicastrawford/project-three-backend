import Club from '../models/clubs.js'
import User from '../models/user.js'
import clubData from './data/clubs.js'
import faker from 'faker'
import { connectToDb, disconnectDb, flushDb } from './helpers.js'

async function seed() {
  try {
    await connectToDb()
    console.log('🤖 Database Connected')

    await flushDb()
    console.log('🤖 Database Dropped')

    const admin = await User.create({
      username: 'admin',
      email: 'admin@awaydays.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
    })

    console.log('🤖 Admin Created')

    const users = []

    for (let i = 0; i < 100; i++) {
      const username = faker.internet.userName()
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const email = `${firstName}.${lastName}@awaydays.com`
      const avatar = faker.image.avatar()
      users.push({
        username,
        email,
        avatar,
        password: 'pass',
        passwordConfirmation: 'pass',
        isAdmin: false,
      })
    }

    const createdUsers = await User.create(users)

    console.log(`🤖 Created ${createdUsers.length} Users`)

    clubData.forEach(club => {
      club.addedBy = admin
      const commentText = faker.lorem.sentence()
      const commentRating = Math.ceil(Math.random() * 5)
      club.pubs.map(pub => {
        pub.comments.push({
          text: commentText,
          rating: commentRating,
          addedBy: createdUsers[Math.ceil(Math.random() * 99)],
        })
      })
    })

    const club = await Club.create(clubData)
    
    console.log(`🤖 ${club.length} football clubs added to the database`)
  } catch (err) {
    console.log('🤖 Something went wrong...')
    console.log(err)
  }
  disconnectDb()
}

seed()