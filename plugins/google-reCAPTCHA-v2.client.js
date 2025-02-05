export default defineNuxtPlugin((nuxtApp) => {
  const siteKey = '6Ley2sQqAAAAAKDirDAigGIAW-eV8x4nZGyqDNN_' // Replace with your site key

  // Function to dynamically load the reCAPTCHA script
  function loadRecaptchaScript() {
    return new Promise((resolve, reject) => {
      // Check if the script is already present
      if (document.getElementById('recaptcha-script')) {
        return resolve(window.grecaptcha) // reCAPTCHA is already loaded
      }

      // Create the script tag for reCAPTCHA
      const script = document.createElement('script')
      script.id = 'recaptcha-script'
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit' // Explicit rendering
      script.async = true
      script.defer = true

      script.onload = () => {
        if (window.grecaptcha) {
          resolve(window.grecaptcha) // Resolve the promise with grecaptcha when loaded
        } else {
          reject(new Error('reCAPTCHA failed to load.'))
        }
      }

      script.onerror = () => reject(new Error('Failed to load reCAPTCHA script.'))

      document.head.appendChild(script) // Add the script to the document
    })
  }

  // Initialize the reCAPTCHA
  loadRecaptchaScript()
    .then((grecaptcha) => {
      console.log('reCAPTCHA script loaded.')

      // Provide a function to use reCAPTCHA
      nuxtApp.provide('recaptcha', {
        render: (elementId, callback) => {
          grecaptcha.ready(() => {
            grecaptcha.render(elementId, {
              sitekey: siteKey,
              callback,
            })
          })
        },
        execute: (action, callback) => {
          grecaptcha.ready(() => {
            grecaptcha.execute(siteKey, { action }).then((token) => {
              callback(token)
            })
          })
        },
      })
    })
    .catch((error) => {
      console.error('Error loading reCAPTCHA:', error)
    })
})