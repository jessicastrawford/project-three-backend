import Club from '../models/clubs.js'
import User from '../models/user.js'
import clubData from './data/clubs.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const user = await User.create({
      username: 'admin',
      email: 'admin@awaydays.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
    })

    console.log('🤖 Admin Created')

    clubData.forEach(club => {
      club.addedBy = user
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