import mongoose from 'mongoose'
import app from './app'

async function server() {
  try {
    await mongoose.connect('mongodb+srv://mosiurislamwebdesign:ySwl9GuFWsYJJWaX@assignment-3.vq490.mongodb.net/assignment-3?retryWrites=true&w=majority&appName=assignment-3')

    app.listen(3000, () => {
      console.log(`boitoi Server is running on port ${3000} - Alhamdulillah`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
