const passport = require('passport')
const authenticateUser = require('./passport-config')
const getUserByEmail = require('./passport-config')

test('authenticates',()=>{
    const email = 'p@p'
    const id = 0
    expect(authenticateUser(passport,email,id)).not.toBeDefined()
    expect(getUserByEmail(passport,email,id)).not.toBeDefined()
})