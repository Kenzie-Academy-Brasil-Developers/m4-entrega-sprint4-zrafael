import { Request, Response, NextFunction } from 'express'


const ensureIsAdmMiddleware =async(req: Request, res: Response, next: NextFunction)=>{
    if(!req.user.isAdm){
        return res.status(403).json({message:"you not have authorization"})
    }

        return next()
}

export default ensureIsAdmMiddleware