import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
const userInfo = {};

const fillContactFormFields = () => {
  try {
    const userInfoFormLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (userInfoFormLS === null) {
      return;
    }

    for (const prop in userInfoFormLS) {
      contactFormEl.elements[prop].value = userInfoFormLS[prop];
    }
  } catch (err) {
    console.log(err);
  }
};

fillContactFormFields();

const onContactFormFieldInput = event => {
  const email = contactFormEl.elements.email.value;
  const message = contactFormEl.elements.message.value;
  const userInfo = {
    email,
    message,
  };

  if (email === '' || message === '') {
    return alert('Заповніть усі поля');
  }

  localStorage.setItem('feedback-form-state', JSON.stringify(userInfo));
};

const onContactFormFieldSubmit = event => {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

  contactFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

contactFormEl.addEventListener('input', throttle(onContactFormFieldInput, 500));
contactFormEl.addEventListener('submit', onContactFormFieldSubmit);
