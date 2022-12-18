import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { usersWithoutPasswordSerializer } from '../serializers/user.serializers'

const listUsersService = async (): Promise<{}> => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find({})

    const usersWithoutPassword = await usersWithoutPasswordSerializer.validate(users,{ stripUnknown: true})

    return usersWithoutPassword
}  

export default listUsersService