//kontrolliert, ob eine Rolle von einem User Zugriff auf eine Route hat und was er damit anstellen darf
const AccessControl = require('accesscontrol') 
const User = require('../models/user.models')
const ac = new AccessControl()

//Jede Rolle kann auf eine bestimmte Collection zugreifen, hier wird festgelegt welche Zugriffe in der Collection erlaubt sind
//Der Server greift mithilfe einer Route auf den Inhalt einer Datenbank zu
module.exports.roles = (function () {

    //Rollen haben Zugriff auf eine Ressource (eine Collection), aber nicht auf alle Attribute (Spalten einer Collection).
   ac.grant("coach")
       .deleteOwn(['coachees', 'formulare'])
       .readOwn(['coachees', 'formulare'])
       .createAny(['coachees', 'formulare'])
       .updateOwn(['coachees', 'users', 'formulare'])
    
   ac.grant("admin")
       .extend("coach")
       .createAny(['coachees', 'users', 'formulare'])
       .updateAny(['coachees', 'users', 'formulare'])
       .deleteAny(["coachees", 'users', 'formulare'])
       .readAny(['users', 'coachees', 'formulare'])


return ac
})()
