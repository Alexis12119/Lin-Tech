const handleFormSubmit = (event) => {
  event.preventDefault()

  const emailInput = document.getElementById('email')
  const email = emailInput.value

  if (email) {
    const validData = JSON.parse(localStorage.getItem('valid')) || {}

    if (email in validData) {
      // Save the input email to localStorage
      localStorage.setItem('resetEmail', email)

      // Redirect to the reset password page
      window.location.href = 'reset-password.html'
    } else {
      const errorMessage = document.getElementById('error-message')
      errorMessage.textContent = 'Email not found'
      errorMessage.style.display = 'block' // Show the error message
    }
  }
}

// Add event listener to the form submit button
const submitButton = document.querySelector('.forgot-password__button')
submitButton.addEventListener('click', handleFormSubmit)
