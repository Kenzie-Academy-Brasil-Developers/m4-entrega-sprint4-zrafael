import { IUserRequest } from '../interfaces/users'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { userWithoutPasswordSerializer } from '../serializers/user.serializers'

const createUserService = async(userData: IUserRequest): Promise<[number,{}]> => {
    
    const userRepository = AppDataSource.getRepository(User)

    const userAlreadyExists = await userRepository.findOneBy({email:userData.email})


    if(userAlreadyExists){
        return [400,{message:"user already exists"}]
    }


    const createdUser = userRepository.create(userData)
    await userRepository.save(createdUser)

    const userWithoutPassord = await userWithoutPasswordSerializer.validate(createdUser, {
        stripUnknown: true
    })

    return [201,userWithoutPassord]
}

export default createUserService