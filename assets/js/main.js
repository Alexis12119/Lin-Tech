/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye)

  iconEye.addEventListener('click', () => {
    // Change password to text
    if (input.type === 'password') {
      // Switch to text
      input.type = 'text'

      // Icon change
      iconEye.classList.add('ri-eye-line')
      iconEye.classList.remove('ri-eye-off-line')
    } else {
      // Change to password
      input.type = 'password'

      // Icon change
      iconEye.classList.remove('ri-eye-line')
      iconEye.classList.add('ri-eye-off-line')
    }
  })
}

showHiddenPass('login-pass', 'login-eye')

const handleFormSubmit = (event) => {
  event.preventDefault()

  const emailInput = document.getElementById('login-email')
  const passwordInput = document.getElementById('login-pass')
  const email = emailInput.value
  const password = passwordInput.value

  emailInput.reportValidity();

  if (email && password) {
    const validData = JSON.parse(localStorage.getItem('valid')) || {}

    let found = false

    for (const user in validData) {
      const value = validData[user]
      if (email === user && password === value.password) {
        found = true
        break
      }
    }

    if (found) {
      // Save the input values to localStorage
      localStorage.setItem('loginEmail', email)
      localStorage.setItem('loginPassword', password)

      window.location.href = 'home.html'
    } else {
      const errorMessage = document.getElementById('error-message')
      errorMessage.textContent = 'Incorrect email or password'
    }
  }
}

window.addEventListener('load', function () {
  var loginForm = document.querySelector('.login__form')

  // Check if the form is submitted
  if (loginForm) {
    // Save the initial email input value
    var emailInput = loginForm.querySelector('input[type="email"]')
    var initialEmailValue = localStorage.getItem('email')

    // Set the email input value from storage
    if (initialEmailValue) {
      emailInput.value = initialEmailValue
    }

    // Save the email input value to storage when it changes
    emailInput.addEventListener('input', function () {
      localStorage.setItem('email', emailInput.value)
    })

    // Clear the email input from storage when the form is submitted
    loginForm.addEventListener('submit', function () {
      localStorage.removeItem('email')
    })

    // Listen for the popstate event
    window.addEventListener('popstate', function () {
      // Clear the form fields if the user navigated back to the login page
      if (window.location.href.endsWith('index.html')) {
        emailInput.value = initialEmailValue
        loginForm.reset()
      }
    })
  }
})
