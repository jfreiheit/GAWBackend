const bcrypt = require('bcryptjs')
const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const sendEmail = require('../helpers/send-email')
const crypto = require('crypto')

module.exports = {
    forgotPassword,
    forgotPasswordCoachee,
    resetPassword,
    resetPasswordCoachee
};

async function forgotPassword(email , origin) {
    const user = await User.findOne(email);
    //const coachee = await Coachee.findOne(email);

    // always return ok response to prevent email enumeration
    if (!user) return;

    if (user) {
        // create reset token that expires after 24 hours
        user.resetPasswordToken = {
            token: randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await user.save();
        // send email
        await sendPasswordResetEmail(user, origin);

    }
}

async function forgotPasswordCoachee(email , origin) {
    const coachee = await Coachee.findOne(email);
    //const coachee = await Coachee.findOne(email);

    // always return ok response to prevent email enumeration
    if (!coachee) return;

    if (coachee) {
        // create reset token that expires after 24 hours
        coachee.resetPasswordToken = {
            token: randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await coachee.save();
        // send email
        await sendPasswordResetEmailCoachee(coachee, origin);

    }
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function resetPassword({ token, password }) {
    const user = await User.findOne({
        'resetPasswordToken.token': token,
        'resetPasswordToken.expires': { $gt: Date.now() }
    });

    if (!user) throw 'Invalid token';

    if (user) {
        // update password and remove reset token
        user.password = hash(password)
        user.resetPasswordDate = Date.now();
        user.resetPasswordToken = undefined;

        await user.save();
    }
}

async function resetPasswordCoachee({ token, password }) {
    const coachee = await Coachee.findOne({
        'resetPasswordToken.token': token,
        'resetPasswordToken.expires': { $gt: Date.now() }
    });

    if (!coachee) throw 'Invalid token';

    if (coachee) {
        // update password and remove reset token
        coachee.password = hash(password)
        coachee.resetPasswordDate = Date.now();
        coachee.resetPasswordToken = undefined;

        await coachee.save();
    }
}

function hash(secret) {
    return bcrypt.hashSync(secret, 10);
}

async function sendPasswordResetEmail(user, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-password/${user.resetPasswordToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/reset-password</code> api route:</p>
                   <p><code>${user.resetPasswordToken.token}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}

async function sendPasswordResetEmailCoachee(coachee, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-password-coachee/${coachee.resetPasswordToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/reset-password</code> api route:</p>
                   <p><code>${coachee.resetPasswordToken.token}</code></p>`;
    }

    await sendEmail({
        to: coachee.email,
        subject: 'Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}
