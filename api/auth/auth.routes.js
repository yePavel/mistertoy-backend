import express from 'express'
import { login, logout, signup } from './auth.controller.js'
import { log } from '../../middlewares/logger.middleware.js'

export const authRoutes = express.Router()

authRoutes.post('/login', log, login)
authRoutes.post('/signup', signup)
authRoutes.post('/logout', logout)