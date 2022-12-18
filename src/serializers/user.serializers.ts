import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserRequest, IUserResponse, IUserUpdate } from '../interfaces/users'

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required(),
    
})

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    id: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
    isActive:yup.boolean().notRequired(),
    isAdm: yup.boolean().notRequired()
})

const userWithoutPasswordSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive:yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
})

const usersWithoutPasswordSerializer = yup.array(userWithoutPasswordSerializer)

export { userSerializer, userWithoutPasswordSerializer, userUpdateSerializer,usersWithoutPasswordSerializer }