export const RH_MEMBERSHIP_SIGNUP_LOCATION_ID = 'picktopia-richmond-hill';

export const RH_MEMBERSHIP_DEPOSITS = {
  'Full Access': '158.19',
  'Core Access': '112.99',
  'General Access': '50.00'
};

export const RH_MEMBERSHIP_PAYMENT = {
  clubName: 'Picktopia Pickleball Club',
  etransferEmail: 'rh@rallypicktopia.com',
  contactEmail: 'info@rallypicktopia.com',
  contactPhone: '6474789866',
  noteInstruction: 'Put your name and email in the e-transfer note.',
  securityInstruction: 'Auto-deposit is enabled. No security question or password is required.',
  depositWarning: 'Your membership spot is not secured until deposit is received. This membership is a 12-month commitment.'
};

export const getMembershipDeposit = (membershipTitle) => {
  return RH_MEMBERSHIP_DEPOSITS[membershipTitle] || '';
};
