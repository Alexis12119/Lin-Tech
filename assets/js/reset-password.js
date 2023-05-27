const handleFormSubmit = (event) => {
  event.preventDefault()

  const newPasswordInput = document.getElementById('new-password')
  const newPassword = newPasswordInput.value

  if (newPassword) {
    const validData = JSON.parse(localStorage.getItem('valid')) || {}

    // Update the password for the logged in user
    const resetEmail = localStorage.getItem('resetEmail')
    if (resetEmail && resetEmail in validData) {
      validData[resetEmail] = {
        name: validData[resetEmail].name, // Retain existing name
        password: newPassword,
      }
      localStorage.setItem('valid', JSON.stringify(validData))

      // Show success message or redirect to login page
      alert('Password reset successful! Please login with your new password.')
      window.location.href = 'index.html'
    } else {
      const errorMessage = document.getElementById('error-message')
      errorMessage.textContent = 'An error occurred. Please try again.'
      errorMessage.style.display = 'block'
    }
  }
}

// Add event listener to the form submit button
const submitButton = document.querySelector('.forgot-password__button')
submitButton.addEventListener('click', handleFormSubmit)
