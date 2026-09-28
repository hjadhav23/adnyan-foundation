import { useState, type FormEvent, type ReactNode } from 'react'
import { api } from '../api'

type Status = 'idle' | 'sending' | 'ok' | 'error'

function useSubmit(path: string, extra: Record<string, string> = {}) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = { ...Object.fromEntries(new FormData(form)), ...extra }
    setStatus('sending')
    try {
      await api(path, { method: 'POST', body: JSON.stringify(data) })
      setStatus('ok')
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send. Please try again.')
      setStatus('error')
    }
  }
  return { status, error, submit }
}

function Feedback({ status, error, ok }: { status: Status; error: string; ok: string }) {
  if (status === 'ok') return <p className="form-note ok" role="status">{ok}</p>
  if (status === 'error') return <p className="form-note err" role="alert">{error}</p>
  return null
}

const Honeypot = () => <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

export function ContactForm() {
  const { status, error, submit } = useSubmit('/contact')
  return (
    <form className="form" onSubmit={submit}>
      <Honeypot />
      <label>Name<input name="name" required maxLength={120} /></label>
      <label>Email<input name="email" type="email" required maxLength={200} /></label>
      <label>Subject<input name="subject" maxLength={200} /></label>
      <label>Message<textarea name="message" rows={5} required maxLength={4000} /></label>
      <button className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Message'}</button>
      <Feedback status={status} error={error} ok="Thank you. We have received your message and will reply soon." />
    </form>
  )
}

export function JoinForm({ kind, cta, children }: { kind: 'network' | 'participate' | 'work'; cta: string; children?: ReactNode }) {
  const { status, error, submit } = useSubmit('/join', { kind })
  return (
    <form className="form" onSubmit={submit}>
      <Honeypot />
      <label>Full name<input name="name" required maxLength={120} /></label>
      <div className="form-row">
        <label>Email<input name="email" type="email" required maxLength={200} /></label>
        <label>Phone<input name="phone" type="tel" maxLength={40} /></label>
      </div>
      <label>City<input name="city" maxLength={120} /></label>
      <label>How would you like to help?<textarea name="message" rows={4} maxLength={4000} /></label>
      {children}
      <button className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : cta}</button>
      <Feedback status={status} error={error} ok="Thank you. Our team will get in touch with you shortly." />
    </form>
  )
}

export function NewsletterForm() {
  const { status, error, submit } = useSubmit('/newsletter')
  return (
    <form className="form form-inline" onSubmit={submit}>
      <Honeypot />
      <label className="grow">Email address<input name="email" type="email" required maxLength={200} placeholder="you@example.com" /></label>
      <button className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Subscribing...' : 'Subscribe'}</button>
      <Feedback status={status} error={error} ok="You are subscribed. Thank you for staying with us." />
    </form>
  )
}
