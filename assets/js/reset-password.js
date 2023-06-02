// // Retrieve input value from local storage
// const newPasswordInput = document.getElementById('new-password')
// const storedValue = localStorage.getItem('newPassword')
// newPasswordInput.value = storedValue || ''

// // Save input value to local storage on change
// newPasswordInput.addEventListener('input', (event) => {
//   const value = event.target.value
//   localStorage.setItem('newPassword', value)
// })

const handleFormSubmit = (event) => {
  event.preventDefault()

  const newPasswordInput = document.getElementById('new-password')
  const newPassword = newPasswordInput.value

  // Check if input fields are empty
  if (newPassword == '') {
    const errorMessage = document.getElementById('error-message')
    errorMessage.textContent = 'Please, Enter your new Password';
    errorMessage.style.display = 'block' // Show the error message
    return;
  }

  const validData = JSON.parse(localStorage.getItem('valid')) || {}

  // Get the previous password for the logged in user
  const resetEmail = localStorage.getItem('resetEmail')
  const previousPassword = validData[resetEmail].password

  if (newPassword === previousPassword) {
    errorMessage.textContent = "It's your previous password"
    openModal()
    newPasswordInput.focus()
    // Show error message if the new password is the same as the previous password
    return
  }

  // Update the password for the logged in user
  validData[resetEmail] = {
    name: validData[resetEmail].name, // Retain existing name
    password: newPassword,
  }
  localStorage.setItem('valid', JSON.stringify(validData))

  // Show success message or redirect to login page
  alert('Password reset successful! Please login with your new password.')
  window.location.href = 'index.html'
}

// Add event listener to the form submit button
const submitButton = document.querySelector('.forgot-password__button')
submitButton.addEventListener('click', handleFormSubmit)

const errorMessage = document.getElementById('error-message')

function openModal() {
  const modal = document.getElementById('error-modal')
  modal.style.display = 'block'
}
