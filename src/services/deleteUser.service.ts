import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"

const deleteUserService = async (userId: string): Promise<[number,{}]> => {

    const userRepository = AppDataSource.getRepository(User)

    if(userId.length !== 36){
        return [404,{message:"user not exist"}]
    }

    const findUser = await userRepository.findOneBy({
        id: userId
    })

    if(!findUser){
        return [404,{message:"user not exist"}]
    }

    if(!findUser.isActive){
        return [400,{message:"user already deleted"}]
    }
    
    const updatedUser = userRepository.create({
        ...findUser,
        isActive: false
    })

    await userRepository.save(updatedUser)

    return [204,{message:"user Deleted"}]

}

export default deleteUserService