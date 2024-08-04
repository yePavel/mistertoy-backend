
import express from 'express'
import { addUser, getUser, updateUser } from './user.controller.js'

export const userRoutes = express.Router()

userRoutes.get('/:id', getUser)
userRoutes.put('/:id', updateUser)

// userRoutes.delete('/:id/', requireAuth, requireAdmin, deleteUser)