const localStrategy = require('passport-local').Strategy

function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser = (email ,password ,done)=>{
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false ,{message: "User dose not exists"})
        }
        try{
            if(password == user.password){
                return done(null ,user)
            }
            else{
                return done(null ,false,{message: "Password incorrect"})
            }
        }
        catch(e){
            return done(e)
        }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user,done)=>{ done(null ,user.id)})
    passport.deserializeUser((id,done)=>{done(null ,getUserById(id))})
}

module.exports = initialize