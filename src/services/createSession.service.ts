import { IUserLogin } from '../interfaces/users'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import 'dotenv/config'

const createSessionService = async ( { email, password }: IUserLogin ): Promise<[number,string|{}]> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email: email
    })
    
    if(!user){
        return [403,{message:"User or password invalid"}]
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        return [403,{message:"User or password invalid"}]
    }

    const token = jwt.sign(
        {
            isAdm: user.isAdm
        },
        process.env.SECRET_KEY,
        {
            subject: String(user.id), 
            expiresIn: '24h'
        }
    )

    return [200,{token}]

}

export default createSessionService