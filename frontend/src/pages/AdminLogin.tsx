import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, setToken } from '../api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await api<{ token: string }>('/admin/login', { method: 'POST', body: JSON.stringify(data) })
      setToken(res.token)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }
  return (
    <div className="admin-login">
      <form className="form panel" onSubmit={onSubmit}>
        <img src="/logo.jpg" alt="Adnyan" width={72} />
        <h1>Admin Login</h1>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="btn btn-primary">Sign in</button>
        {error && <p className="form-note err" role="alert">{error}</p>}
        <Link to="/">Back to website</Link>
      </form>
    </div>
  )
}
