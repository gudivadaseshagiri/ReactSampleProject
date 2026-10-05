import { useState } from 'react'
import { createAccount } from './services/accountService'
import './App.css'

function App() {
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleCreateAccount(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setMessage('Your passwords do not match. Please try again.')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      await createAccount({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      })
      setMessage('Your account was created successfully.')
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Account creation failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function switchPage(createAccountPage) {
    setShowCreateAccount(createAccountPage)
    setMessage('')
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label={showCreateAccount ? 'Create account' : 'Login'}>
        <div className="brand-panel">
          <div className="brand-badge">Luma</div>
          <h1>{showCreateAccount ? 'Your next chapter starts here.' : 'Welcome back.'}</h1>
          <p>
            {showCreateAccount
              ? 'Create an account to bring your projects, team, and ideas together in one place.'
              : 'Sign in to manage your projects, collaborate with your team, and stay on top of every update.'}
          </p>
          <ul className="feature-list">
            <li>Get started in minutes</li>
            <li>Keep your team in sync</li>
            <li>Make room for great work</li>
          </ul>
        </div>

        <div className="form-panel">
          <div className="login-header">
            <span className="eyebrow">{showCreateAccount ? 'Get started for free' : 'Account login'}</span>
            <h2>{showCreateAccount ? 'Create your account' : 'Sign in'}</h2>
          </div>

          <form className="login-form" onSubmit={showCreateAccount ? handleCreateAccount : (event) => {
            event.preventDefault()
            setMessage('Login is not connected to a server yet.')
          }}>
            {showCreateAccount && (
              <label className="field">
                <span>Full name</span>
                <input type="text" name="name" placeholder="Alex Morgan" autoComplete="name" required />
              </label>
            )}

            <label className="field">
              <span>Email address</span>
              <input type="email" name="email" placeholder="name@example.com" autoComplete="email" required />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder={showCreateAccount ? 'At least 8 characters' : 'Enter your password'}
                autoComplete={showCreateAccount ? 'new-password' : 'current-password'}
                minLength={showCreateAccount ? 8 : undefined}
                required
              />
            </label>

            {showCreateAccount ? (
              <label className="field">
                <span>Confirm password</span>
                <input type="password" name="confirmPassword" placeholder="Enter your password again" autoComplete="new-password" minLength="8" required />
              </label>
            ) : (
              <div className="row">
                <span />
                <a href="#" className="link" onClick={(event) => event.preventDefault()}>Forgot password?</a>
              </div>
            )}

            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : showCreateAccount ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p className="signup-text" aria-live="polite">
            {message || (
              showCreateAccount
                ? <>Already have an account? <button type="button" className="link text-button" onClick={() => switchPage(false)}>Sign in</button></>
                : <>Don&apos;t have an account? <button type="button" className="link text-button" onClick={() => switchPage(true)}>Create account</button></>
            )}
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
