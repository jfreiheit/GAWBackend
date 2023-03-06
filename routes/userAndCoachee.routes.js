const express = require('express')
const router = express.Router()
const passport = require('passport')
const userAndCoacheeController = require('../controllers/userAndCoachee.controller');
const twoFAController = require('../controllers/2fa.controller');

router.post('/login', userAndCoacheeController.login)
router.post('/login-coachee', userAndCoacheeController.loginCoachee)

//hier kann vorerst 2fa aufgerufen werden mit einem erstellten Secret - Übergangslösung!
router.post('/login/verify',twoFAController.verify );
router.post('/login-coachee/verify',twoFAController.verifyCoachee );

router.post('/forgot-secret', twoFAController.forgotSecret);
router.post('/forgot-secret-coachee', twoFAController.forgotSecretCoachee);
router.post('/reset-secret', twoFAController.resetSecret);
router.post('/reset-secret-coachee', twoFAController.resetSecretCoachee);

router.post('/forgot-password', userAndCoacheeController.forgotPassword);
router.post('/forgot-password-coachee', userAndCoacheeController.forgotPasswordCoachee);
router.post('/reset-password', userAndCoacheeController.resetPassword);
router.post('/reset-password-coachee', userAndCoacheeController.resetPasswordCoachee);

module.exports = router
