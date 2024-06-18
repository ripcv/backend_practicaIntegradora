import passport from "passport";
import local from 'passport-local'
import userService from '../dao/models/users.model.js'
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2'


const LocalStrategy = local.Strategy

const initializePassport = () => {


    //estrategias
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let user = await userService.findOne({ email: username })
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userService.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id)
        done(null, user)
    })


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        // Se hardcodea el login del administrador
        if(username === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            const user = {
                _id : '6656305eafb60bd4bb71123b',
                email : username,
                first_name : "Admin",
                role : 'admin',
                password : password
            }
            console.log(user)
            return done(null, user)
        }
        try {
            const user = await userService.findOne({ email: username })
            if (!user) {
                console.log("El usuario no existe")
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    //Login con GitHub
    passport.use('github', new GitHubStrategy({
        clientID: "Iv23li7UO2LzL0SUOjNQ",
        clientSecret: "290a4142c5d69d32abe52a0fd95433da99bfdb31",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile._json)
            let user = await userService.findOne({ githubId: profile._json.id })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    age: 35,
                    email: profile._json.email,
                    githubId: profile._json.id
                }
                let result = await userService.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))


}


export default initializePassport