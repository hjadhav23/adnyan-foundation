import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function NotFound() {
  return (
    <PageShell title="Page not found" lead="The page you are looking for does not exist.">
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </PageShell>
  )
}
