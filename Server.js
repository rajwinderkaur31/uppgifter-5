import express, { request, response } from 'express'
import  morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const { PORT } = process.env

const application = express()
application.use(express. json())
application.use(morgan('common'))
application.use(helmet())

const isOrderPaidFor = (request, response, next) => {
    console.log('PAYMENT VERIFIED');
    next()
}
application.get('/order', isOrderPaidFor,(request, response) => {
    response.send('ORDER ACCEPTED:' +Math.random().toString())
})
const notFound = (request, response, next) => {
    const error = new Error('Not Found: ${request.originalUrl}')
    response.status(404)
    next(error)
}
application .use(notFound)

application.listen(PORT, () => {
    console.log('   SERVER IS RUNNING ON PORT: ${PORT}')
})
mongoose.connect('mongodb://localhost/ehandelsbutikbackend', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('successfully connected to the database'))
.catch((error) => {
    console.log('ERROR WHILE TRYING TO CONNECT TO THE DATABASE: ' + error)
    process.exit()
})

