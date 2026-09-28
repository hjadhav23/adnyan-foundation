import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props { to: string; className?: string; children: ReactNode; onClick?: () => void }

/** Internal paths use the router; http(s) links open in a new tab. */
export default function SmartLink({ to, className, children, onClick }: Props) {
  if (/^https?:\/\//.test(to)) {
    return <a href={to} className={className} target="_blank" rel="noreferrer" onClick={onClick}>{children}</a>
  }
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>
}
