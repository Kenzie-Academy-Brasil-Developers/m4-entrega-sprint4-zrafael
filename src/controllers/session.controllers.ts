import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import createSessionService from '../services/createSession.service'

const createSessionController = async(req: Request, res: Response) => {

    const sessionData: IUserLogin = req.body
    const [status,data] = await createSessionService(sessionData)
    return res.status(status).json(data)

}

export { createSessionController }