const passport = require('passport')
const initializePassport = require('./passport-config')

test('intializer',()=>{
    const email = 'p@p'
    const id = 0
    expect(initializePassport(passport,email,id)).not.toBeDefined()
})