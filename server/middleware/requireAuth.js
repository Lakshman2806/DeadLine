const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const requireAuth = async (req, res, next) => {
    
    // verify authentication
    const {authorization} =req.headers;


    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({_id}).select("_id")
        
        next();
    }
    catch(err){
        console.log(err)
        // localStorage.removeItem("user");
        return res.status(401).send({ error: "Request not authorized" });
    }
}

module.exports = requireAuth;



