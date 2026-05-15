import { AuthError, ForbiddenError} from "../../errors/autorization/authErrors.js";

export const requireRole = (role) => { 
  return (req,res, next) =>{
    if(!req.user){
      throw new AuthError("Authentication required");
    };

    if(req.user.role !== role){ 
      throw new ForbiddenError("Access denied")
   };
    next()
  };
};