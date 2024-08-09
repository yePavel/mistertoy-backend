import { authService } from "../api/auth/auth.service.js"
import { asyncLocalStorage } from "../services/als.service.js"
import { loggerService } from "../services/logger.service.js"


export async function requireAuth(req, res, next) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    if (!loggedinUser) return res.status(401).send('Not Authenticated')

    req.loggedinUser = loggedinUser
    next()
}

export async function requireAdmin(req, res, next) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    if (!loggedinUser) return res.status(401).send('Not Authenticated')

    if (!loggedinUser.isAdmin) {
        loggerService.warn(loggedinUser.fullname + 'attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}