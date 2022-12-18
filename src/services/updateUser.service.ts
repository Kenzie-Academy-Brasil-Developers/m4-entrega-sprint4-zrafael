import { IUser} from '../interfaces/users'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { userWithoutPasswordSerializer } from '../serializers/user.serializers'

const updateUserService = async (userData: IUser, userId: string,userLogged:any): Promise<[number,{}]> => {

    
    if(userId.length!==36){
        return [404,{message:"user not found"}]
    }

    if(userId !== userLogged.id && !userLogged.isAdm){
    return [401,{message:"You dont have admin privileges"}]
    }

    if(userData.isAdm !== undefined||userData.isActive!== undefined||userData.id!== undefined ){
        return [401,{message:"not possible alter this propriety"}]
    }

    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({
        id: userId
    })


    if(!findUser){
        return [404,{message:"user not found"}]
    }


    const updatedUser = userRepository.create({
        ...findUser,
        ...userData
    })
    await userRepository.save(updatedUser)

    const updatedUserWithoutPassword = await userWithoutPasswordSerializer.validate(updatedUser, {
        strict:true
    })

    return [200,updatedUserWithoutPassword]

}

export default updateUserService