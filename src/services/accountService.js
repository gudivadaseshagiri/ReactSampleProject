const registrationUrl = '/API/LoginDetails'

export async function createAccount({ name, email, password }) {
  const response = await fetch(registrationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    let errorMessage = responseText

    try {
      const errorBody = JSON.parse(responseText)
      errorMessage = errorBody.message || errorBody.title || responseText
    } catch {
      // The server may return a plain-text error response.
    }

    throw new Error(errorMessage || `Account creation failed (${response.status}).`)
  }
}
