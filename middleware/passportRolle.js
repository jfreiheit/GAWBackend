const jwt = require("jsonwebtoken");
const {secret} = require("../config/keys");
const {roles} = require("./user.AC");

module.exports.grantAccess = function(action, resource) {              //prüfe, ob Aktion der Rolle Zugriff erlaubt oder nicht
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);   //Permission=Zugriffserlaubnis, resource = Collection, resource=welche Aktion soll ausgeführt werden
            if (!permission.granted) {
                return res.status(401).json({message: "Sie haben keine Zugriffsrechte"});
            }
            next()
        } catch (e) {
            console.log(e)
        }
    }
}

/*
module.exports = function(role) {
    return function (req, res, next){
        if(req.method === "OPTION"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: 'Benutzer ist nicht authentifiziert'})
            }
            const {role: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if(role.includes('admin')){
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message: 'Sie haben kein Zugriff'})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Benutzer ist nicht authentifiziert'})
        }
    }
}
*/
