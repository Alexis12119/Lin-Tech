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
  const rememberMeCheckbox = document.querySelector('.login__check-input')

  const email = emailInput.value
  const password = passwordInput.value

  emailInput.reportValidity()

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
      if (rememberMeCheckbox.checked) {
        // Save the input values to localStorage
        localStorage.setItem('loginEmail', email)
        localStorage.setItem('loginPassword', password)
      }

      window.location.href = 'home.html'
    } else {
      const errorMessage = document.getElementById('error-message')
      errorMessage.textContent = 'Incorrect email or password'
    }
  }
}

window.addEventListener('load', function () {
  var loginForm = document.querySelector('.login__form')

  if (loginForm) {
    var emailInput = loginForm.querySelector('input[type="email"]')
    var passwordInput = loginForm.querySelector('input[type="password"]')
    var rememberMeCheckbox = loginForm.querySelector('.login__check-input')

    // Set the email input value from storage if "Remember me" is checked
    const rememberMe = localStorage.getItem('rememberMe')
    if (rememberMe === 'true') {
      const savedEmail = localStorage.getItem('loginEmail')
      if (savedEmail) {
        emailInput.value = savedEmail
        rememberMeCheckbox.checked = true
      }

      const savedPassword = localStorage.getItem('loginPassword')
      if (savedPassword) {
        passwordInput.value = savedPassword
      }
    }

    // Save the email input value to storage when it changes
    emailInput.addEventListener('input', function () {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem('loginEmail', emailInput.value)
      }
    })

    // Save the password input value to storage when it changes
    passwordInput.addEventListener('input', function () {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem('loginPassword', passwordInput.value)
      }
    })

    // Save the remember me state to storage when the checkbox is clicked
    rememberMeCheckbox.addEventListener('click', function () {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('loginEmail', emailInput.value)
        localStorage.setItem('loginPassword', passwordInput.value)
      } else {
        localStorage.removeItem('rememberMe')
      }
    })

    // Clear the saved values from storage when the form is submitted
    loginForm.addEventListener('submit', function () {
      localStorage.removeItem('loginEmail')
      localStorage.removeItem('loginPassword')
    })

    // Listen for the popstate event
    window.addEventListener('popstate', function () {
      if (window.location.href.endsWith('index.html')) {
        emailInput.value = ''
        passwordInput.value = ''
        rememberMeCheckbox.checked = false
        loginForm.reset()
      }
    })
  }
})
