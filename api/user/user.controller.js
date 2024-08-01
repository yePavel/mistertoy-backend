
import { loggerService } from "../../services/logger.service.js";
import { userService } from "./user.service.js";


export async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        loggerService.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

export async function updateUser(req, res) {
    try {
        const user = await userService.update(req.body)
        res.send(user)
    } catch (err) {
        loggerService.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

