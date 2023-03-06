const bcrypt = require('bcryptjs')
const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const sendEmail = require('../helpers/send-email')
const crypto = require('crypto')

module.exports = {
    forgotSecret,
    forgotSecretCoachee,
    resetSecret,
    resetSecretCoachee,
};

async function forgotSecret(email , origin) {
    const user = await User.findOne(email);

    // always return ok response to prevent email enumeration
    if (!user) return;

    if (user) {
        // create reset token that expires after 24 hours
        user.resetSecretToken = {
            token: randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await user.save();
        // send email
        await sendSecretResetEmail(user, origin);

    }
}

async function forgotSecretCoachee(email , origin) {
    const coachee = await Coachee.findOne(email);

    // always return ok response to prevent email enumeration
    if (!coachee) return;

    if (coachee) {
        // create reset token that expires after 24 hours
        user.resetSecretToken = {
            token: randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await coachee.save();
        // send email
        await sendSecretResetEmailCoachee(coachee, origin);

    }
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function resetSecretCoachee({ token, secret }) {
    const coachee = await Coachee.findOne({
        'resetSecretToken.token': token,
        'resetSecretToken.expires': { $gt: Date.now() }
    });
    //const coachee = await Coachee.findOne({'resetSecretToken.token': token});

    if (!coachee) throw 'Invalid token';

    if (coachee) {
        // update password and remove reset token
        coachee.secret = hash(secret)
        coachee.resetSecretDate = Date.now();
        coachee.resetSecretToken = undefined;

        await coachee.save();
    }
}

async function resetSecret({ token, secret }) {
    const user = await User.findOne({
        'resetSecretToken.token': token,
        'resetSecretToken.expires': { $gt: Date.now() }
    });

    if (!user) throw 'Invalid token';

    if (user) {
        // update password and remove reset token
        user.secret = hash(secret)
        user.resetSecretDate = Date.now();
        user.resetSecretToken = undefined;

         await user.save();
    }
}

function hash(secret) {
    return bcrypt.hashSync(secret, 10);
}

async function sendSecretResetEmail(user, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-secret/${user.resetSecretToken.token}`;
        message = `<p>Please click the below link to reset your secret, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your secret with the <code>/reset-secret</code> api route:</p>
                   <p><code>${user.resetSecretToken.token}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Reset Secret',
        html: `<h4>Reset Secret Email</h4>
               ${message}`
    });
}

async function sendSecretResetEmailCoachee(coachee, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-secret-coachee/${coachee.resetSecretToken.token}`;
        message = `<p>Please click the below link to reset your secret, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your secret with the <code>/reset-secret</code> api route:</p>
                   <p><code>${coachee.resetSecretToken.token}</code></p>`;
    }

    await sendEmail({
        to: coachee.email,
        subject: 'Reset Secret',
        html: `<h4>Reset Secret Email</h4>
               ${message}`
    });
}
