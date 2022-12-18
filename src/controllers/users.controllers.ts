import { Request, Response } from 'express'
import { IUser, IUserRequest } from '../interfaces/users'
import createUserService from '../services/createUser.service'
import deleteUserService from '../services/deleteUser.service'
import listUsersService from '../services/listUsers.service'
import updateUserService from '../services/updateUser.service'

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const [status,data] = await createUserService(userData)
    return res.status(status).json(data)
}

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService()
    return res.json(users)
}

const updateUserController = async (req: Request, res: Response) => {
    const userData: IUser = req.body
    const userId = req.params.id
    const userPrivilege = req.user
    const [status, data] = await updateUserService(userData, userId,userPrivilege)
    return res.status(status).json(data)
}

const deleteUserController = async (req:Request, res:Response) =>{
    const userId = req.params.id
    const [status,data] = await deleteUserService(userId)
    return res.status(status).json(data)
}

export { createUserController, listUsersController, updateUserController,deleteUserController }