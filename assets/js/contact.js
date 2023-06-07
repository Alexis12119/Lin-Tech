const handleFormSubmit = (event) => {
  event.preventDefault()

  const messageInput = document.getElementById('message')
  const message = messageInput.value
  if (message != '') {
    alert('Message sent successfully!!!')
    // Reset input fields
    messageInput.value = ''
  } else {
     const errorMessage = document.getElementById('error-message')
    errorMessage.textContent = 'Please, Enter your message'
    errorMessage.style.display = 'block' // Show the error message

  }
}
