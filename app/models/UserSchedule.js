import Moralis from 'moralis'

export async function requestBooking({meetingTime, duration, status, reqUser, acptUser, name, email, notes}) {
  const UserSchedule = Moralis.Object.extend('UserSchedule')
  const userSchedule = new UserSchedule()
  status = status || 'PENDING'
  duration = duration || 30

  userSchedule.set('meetingTime', new Date(meetingTime)) // moralis handles JS Date objects as "Date" type in the DB
  userSchedule.set('duration', duration)
  userSchedule.set('status', status)
  userSchedule.set('name', name)
  userSchedule.set('email', email)
  userSchedule.set('notes', notes)
  userSchedule.set('requestingUser', reqUser) // the user requesting the booking
  userSchedule.set('acceptingUser', acptUser) // the user accepting the booking

  await userSchedule.save()
}

export default requestBooking;