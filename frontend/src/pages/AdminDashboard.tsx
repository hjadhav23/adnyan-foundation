import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../api'

type Row = Record<string, string | number | null>
interface FieldDef { key: string; label: string; type?: 'text' | 'textarea' | 'number' }

const CONTENT: Record<string, { label: string; fields: FieldDef[] }> = {
  announcements: { label: 'Announcements', fields: [{ key: 'title', label: 'Title', type: 'textarea' }, { key: 'link', label: 'Link (e.g. /profile or https://...)' }, { key: 'sort_order', label: 'Order', type: 'number' }] },
  stories: { label: 'Stories of Change', fields: [{ key: 'title', label: 'Heading' }, { key: 'subtitle', label: 'Sub-heading', type: 'textarea' }, { key: 'image', label: 'Image URL (e.g. /images/x.jpg)' }, { key: 'link', label: 'Link' }, { key: 'sort_order', label: 'Order', type: 'number' }] },
  calls: { label: 'Calls', fields: [{ key: 'kicker', label: 'Small heading' }, { key: 'title', label: 'Title', type: 'textarea' }, { key: 'link', label: 'Link' }, { key: 'sort_order', label: 'Order', type: 'number' }] },
  team: { label: 'Team', fields: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'bio', label: 'Short bio', type: 'textarea' }, { key: 'photo', label: 'Photo URL (optional)' }, { key: 'sort_order', label: 'Order', type: 'number' }] },
  stats: { label: 'Impact Numbers', fields: [{ key: 'label', label: 'Label' }, { key: 'value', label: 'Number', type: 'number' }, { key: 'sort_order', label: 'Order', type: 'number' }] },
}
const SUBS: Record<string, string> = { contact: 'Contact messages', join: 'Join requests', newsletter: 'Newsletter subscribers' }

function Submissions({ type }: { type: string }) {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState('')
  const load = useCallback(() => api<Row[]>(`/admin/submissions/${type}`).then(setRows).catch((e: Error) => setError(e.message)), [type])
  useEffect(() => { load() }, [load])
  const remove = async (id: number) => { if (confirm('Delete this entry?')) { await api(`/admin/submissions/${type}/${id}`, { method: 'DELETE' }); load() } }
  if (error) return <p className="form-note err">{error}</p>
  if (!rows) return <p>Loading...</p>
  if (!rows.length) return <p>Nothing here yet.</p>
  return (
    <div className="admin-list">
      {rows.map((r) => (
        <article key={String(r.id)} className="panel">
          <dl>
            {Object.entries(r).filter(([k]) => k !== 'id').map(([k, v]) => (
              <div key={k}><dt>{k.replace('_', ' ')}</dt><dd>{k === 'created_at' ? new Date(String(v)).toLocaleString() : String(v ?? '')}</dd></div>
            ))}
          </dl>
          <button type="button" className="btn btn-small" onClick={() => remove(Number(r.id))}>Delete</button>
        </article>
      ))}
    </div>
  )
}

function Manager({ kind }: { kind: string }) {
  const cfg = CONTENT[kind]
  const [rows, setRows] = useState<Row[] | null>(null)
  const [editing, setEditing] = useState<Row | null>(null)
  const [error, setError] = useState('')
  const load = useCallback(() => api<Row[]>(`/admin/content/${kind}`).then(setRows).catch((e: Error) => setError(e.message)), [kind])
  useEffect(() => { load() }, [load])

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(e.currentTarget))
    try {
      if (editing?.id) await api(`/admin/content/${kind}/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) })
      else await api(`/admin/content/${kind}`, { method: 'POST', body: JSON.stringify(body) })
      setEditing(null); setError(''); load()
    } catch (err) { setError(err instanceof Error ? err.message : 'Save failed') }
  }
  const remove = async (id: number) => { if (confirm('Delete this item?')) { await api(`/admin/content/${kind}/${id}`, { method: 'DELETE' }); load() } }

  return (
    <div>
      {error && <p className="form-note err">{error}</p>}
      {editing ? (
        <form className="form panel" onSubmit={save} key={String(editing.id ?? 'new')}>
          <h3>{editing.id ? 'Edit' : 'Add'} item</h3>
          {cfg.fields.map((f) => (
            <label key={f.key}>{f.label}
              {f.type === 'textarea'
                ? <textarea name={f.key} rows={3} defaultValue={String(editing[f.key] ?? '')} />
                : <input name={f.key} type={f.type === 'number' ? 'number' : 'text'} defaultValue={String(editing[f.key] ?? (f.type === 'number' ? 0 : ''))} />}
            </label>
          ))}
          <div className="row-actions"><button className="btn btn-primary">Save</button><button type="button" className="btn btn-small" onClick={() => setEditing(null)}>Cancel</button></div>
        </form>
      ) : (
        <>
          <button type="button" className="btn btn-primary" onClick={() => setEditing({})}>Add new</button>
          <div className="admin-list">
            {(rows ?? []).map((r) => (
              <article key={String(r.id)} className="panel row">
                <div><strong>{String(r.title ?? r.name ?? r.label ?? r.kicker)}</strong>{r.subtitle || r.role || r.value ? <p>{String(r.subtitle ?? r.role ?? r.value)}</p> : null}</div>
                <div className="row-actions"><button type="button" className="btn btn-small" onClick={() => setEditing(r)}>Edit</button><button type="button" className="btn btn-small" onClick={() => remove(Number(r.id))}>Delete</button></div>
              </article>
            ))}
            {rows && !rows.length && <p>No items yet.</p>}
          </div>
        </>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('contact')
  if (!getToken()) return <Navigate to="/admin/login" replace />
  const logout = () => { setToken(null); navigate('/admin/login') }
  const tabs = [...Object.entries(SUBS), ...Object.entries(CONTENT).map(([k, v]) => [k, v.label])]
  return (
    <div className="admin">
      <header className="admin-head">
        <h1>Adnyan Admin</h1>
        <div><Link to="/">View site</Link><button type="button" className="btn btn-small" onClick={logout}>Log out</button></div>
      </header>
      <nav className="admin-tabs" aria-label="Sections">
        {tabs.map(([k, label]) => <button key={k} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}
      </nav>
      <section className="admin-main">
        {SUBS[tab] ? <Submissions key={tab} type={tab} /> : <Manager key={tab} kind={tab} />}
      </section>
    </div>
  )
}
