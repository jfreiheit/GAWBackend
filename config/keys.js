module.exports = {
    mongoURI: 'mongodb+srv://dbadmin:zKRrUUpVGsZMAedy@bemdb.anunz.mongodb.net/bemdb?retryWrites=true&w=majority',
    jwt: 'dev-jwt',
    emailFrom: "noreply@gaw.de",
    smtpOptions: {
        host: "mail.htw-berlin.de",
        port: 465,
        auth: {
            user: "filfabsi",
            pass: "P2-af-btk"
        }
    }
}

//Port freigeben --> 27017, dann mongoURI: mongodb://gaw.f4.htw-berlin.de:27017
