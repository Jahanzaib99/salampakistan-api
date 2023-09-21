'use strict';

module.exports = {
  saveSuccess: 'User has been saved.',
  notFound: 'Invalid User ID.',
  typeInvalid: 'Invalid user type.',
  notAllowed: 'You are not allowed to save/get details of this user.',
  delete: 'user has been deleted',
  profilePicture: {
    notFound: 'User profile picture not found',
    successRemove: 'User profile picture remove successfully',
    success: 'User profile picture added successfully'

  },
  signup: {
    success: 'User has been created.',
    exists: 'This email address already exists.',
    update: 'User has been updated.'
  },
  signin: {
    success: 'User sign-in successfully.',
    notFound: 'This email address is not registered.',
    wrongPassword: 'Password didn\'t match.',
    noSocialEmail: 'Not enough permissions to retrieve email address from Facebook or Google.'
  },
  resetPassword: {
    codeExpiredOrInvalid: 'Invalid/expired code. Please request another code.',
    success: 'Password has been changed successfully'
  },
  logout: {
    success: 'User logout successfully.',
    notFound: 'Token not found.'
  },
  university: {
    alreadyVerified: 'User already has a verified university e-mail.',
    alreadyExist: 'This e-mail address is already verified by other user.',
    verificationSent: 'Verification has been sent to university email.',
    verifySuccess: 'University e-mail has been verified.'
  },
  verify: {
    requestVerification: 'Verification code has been delivered',
    verifySuccess: 'Mobile number has been verified',
    invalidCode: 'This verification code is invalid or expired'
  },
  wishList: {
    notAllowed: 'Wish list is only for Customer',
    success: 'Wish List Successfuly added',
    fail: 'Unable to save wish list',
    delete: 'Wish list has been deleted'
  },
  plan: {
    notAllowed: 'This feature is only for Customer',
    success: 'Successfully added to plan',
    fail: 'Unsuccessful in adding to plan',
    delete: 'Removed from plan',
    notFound: 'Plan not found'
  },
  instructor: {
    notAllowed: 'Allowed for admin and instuctor only',
    success: 'Detail has been added to the instructor profile'
  },
  report: 'You will shortly receive users report on',
  status: {
    success: 'status updated successfully',
    fail: 'Unsuccessful in updating status'
  }
};
