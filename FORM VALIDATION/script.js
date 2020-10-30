//Variables
const form = document.querySelector('#form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email  = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConf = document.querySelector('#password-conf');

// getInputType function
const getInputType = (input) => {
  const inputId = input.id;
  if(inputId === 'first-name' || inputId === 'last-name') {
    const inputIdRet = inputId.replace('-',' ');
    return inputIdRet.replace(inputIdRet.charAt(0), inputIdRet.charAt(0).toUpperCase());
  }else if(inputId === 'password-conf' ) {
    return 'Password confirmation';
  }else {
    return inputId.replace(inputId.charAt(0), inputId.charAt(0).toUpperCase());
  }
}

//Dislay Error, red ouline
const displayErr = (input,message) => {
  const formItem = input.parentElement;
  formItem.className = 'form-item error';
  const small = formItem.querySelector('small');
  small.textContent = message;
}

// Dislay Success, green outline
const displaySucc = (input) => {
  const formItem = input.parentElement;
  formItem.className = 'form-item success';
}

// Validate email
const validateMail = (input) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(regEx.test(input.value.trim())) {
    displaySucc(input);
  } else {
    displayErr(input, 'Email is not valid');
  }
}

// Checking required fields
const reqCheck = (IptArray) => {
  let isRequired = false;
  IptArray.forEach((input)=> {
    if(input.value.trim() === '') {
      displayErr(input, `${getInputType(input)} is required`);
      isRequired = true;
    } else {
      displaySucc(input);
    }
  });

  return isRequired;
}

// Checking required length
const reqLength = (input, min, max) => {
  if(input.value.length < min) {
    displayErr(input, `${getInputType(input)} must be at least ${min} characters`)
  } else if(input.value.length > max) {
    displayErr(input, `${getInputType(input)} must be less than ${max} characters`)
  } else {
    displaySucc(input)
  }
}

//Matching password 
const mactchPass = (input0, input1) => {
  if(input0.value !== input1.value) {
    displayErr(input1, 'Passwords do not match')
  } else {
    displaySucc();
  }
}

// Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if(!reqCheck([firstName, lastName, password, passwordConf, email])) {
  reqLength(firstName, 3, 12)
  reqLength(lastName, 3, 12)
  reqLength(password, 6, 12)
  validateMail(email);
  mactchPass(password, passwordConf)
  }
})






















