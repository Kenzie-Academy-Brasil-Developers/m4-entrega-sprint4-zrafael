import { Router } from 'express'
import { createUserController, deleteUserController, listUsersController, updateUserController } from '../controllers/users.controllers'
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdmMiddleware from '../middlewares/ensureIsAdmin.middleware'
import { userSerializer, userUpdateSerializer } from '../serializers/user.serializers'

const userRoutes = Router()

userRoutes.post('', ensureDataIsValidMiddleware(userSerializer), createUserController)
userRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware,listUsersController)
userRoutes.patch('/:id',ensureAuthMiddleware,ensureDataIsValidMiddleware(userUpdateSerializer), updateUserController)
userRoutes.delete("/:id",ensureAuthMiddleware,ensureIsAdmMiddleware,deleteUserController)

export default userRoutes