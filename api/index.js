const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')

const app = express()
const port = 5000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')

mongoose
  .connect('mongodb+srv://ivanlozic995:ivanloz@cluster0.ixynzsw.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('Error:', err)
  })

app.listen(port, () => {
  console.log('Server is running')
})

const User = require('./models/user')
const Order = require('./models/order')

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('Email already registered:', email)
      return res.status(400).json({ message: 'Email already registered' })
    }

    const newUser = new User({ name, email, password })

    newUser.verificationToken = crypto.randomBytes(20).toString('hex')

    await newUser.save()

    console.log('New User Registered:', newUser)

    res.status(201).json({
      message:
        'Registration successful. Please check your email for verification.'
    })
  } catch (error) {
    console.log('Error during registration:', error)
    res.status(500).json({ message: 'Registration failed' })
  }
})

app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token

    const user = await User.findOne({ verificationToken: token })
    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token' })
    }

    user.verified = true
    user.verificationToken = undefined

    await user.save()

    res.status(200).json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Email Verificatioion Failed' })
  }
})

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex')

  return secretKey
}

const secretKey = generateSecretKey()

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ userId: user._id }, secretKey)

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' })
  }
})
