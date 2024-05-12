const express = require('express');
const { db } = require('../utils/db');
const { unHashPassword } = require('../utils/password');

class AuthController {

    login = async (req, res) => {
        const username = req.body.username
        const pw = req.body.password

        const user = await db.user.findFirst({
            where: { username: username }
        })

        if (!user) {
            return res.render('login', { error: 'User not found' })
        }

        const checkPw = await unHashPassword(pw, user.password)
        console.log(checkPw)
        if (!checkPw) {
            return res.render('login', { error: 'Username and Password is correct' })
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                token: "thistoken"
            }
        })

        req.session.message = "Successfully logged in"

        return res.redirect('/admin')
    }
}

module.exports = { AuthController };