import { ForbiddenError } from "../../errors/autorization/authErrors";

export const requireRole = (role) => { 
  return (req,res, next) =>{

    if(req.user.role !== role){ throw new ForbiddenError("Access denied")
   };
    next()
  };
};