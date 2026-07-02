const container = document.getElementById('container');

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

const mobileSignUpButton = document.getElementById('mobileSignUp');
const mobileSignInButton = document.getElementById('mobileSignIn');

function showSignUp() {
  container.classList.add('right-panel-active');

  mobileSignUpButton?.classList.add('active');
  mobileSignInButton?.classList.remove('active');
}

function showSignIn() {
  container.classList.remove('right-panel-active');

  mobileSignInButton?.classList.add('active');
  mobileSignUpButton?.classList.remove('active');
}

signUpButton?.addEventListener('click', showSignUp);
signInButton?.addEventListener('click', showSignIn);

mobileSignUpButton?.addEventListener('click', showSignUp);
mobileSignInButton?.addEventListener('click', showSignIn);

// Keep correct mobile tab state if screen size changes after switching forms
window.addEventListener('resize', () => {
  if (container.classList.contains('right-panel-active')) {
    mobileSignUpButton?.classList.add('active');
    mobileSignInButton?.classList.remove('active');
  } else {
    mobileSignInButton?.classList.add('active');
    mobileSignUpButton?.classList.remove('active');
  }
});

// Prevent actual form submission for this demo/front-end only build
document.getElementById('signUpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Sign up submitted! (Hook this up to your backend.)');
});

document.getElementById('signInForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Sign in submitted! (Hook this up to your backend.)');
});
