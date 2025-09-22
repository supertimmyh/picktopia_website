export const FORMSPREE_IDS = {
  intro: 'mrbyzklv',
  groupBooking: 'xdkwnzwo',
  partnership: 'mldprnpj',
  getNotified: 'myzngjnw',
  newsletter: 'xblzryzb'
};

export const getFormspreeUrl = (formType) => {
  const formId = FORMSPREE_IDS[formType];
  if (!formId) {
    console.warn(`Formspree ID not found for form type: ${formType}`);
    return '';
  }
  return `https://formspree.io/f/${formId}`;
};

export const getFormspreeAjaxUrl = (formType) => {
  const formId = FORMSPREE_IDS[formType];
  if (!formId) {
    console.warn(`Formspree ID not found for form type: ${formType}`);
    return '';
  }
  return `https://formspree.io/f/${formId}`;
};