exports.handlenoteIdParam = (req , res ,next ,id) => {
    req.noteid = id
    next();
}