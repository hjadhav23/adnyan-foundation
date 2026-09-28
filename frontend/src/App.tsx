import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Governance from './pages/Governance'
import Team from './pages/Team'
import Awards from './pages/Awards'
import { Ongoing, Previous } from './pages/Projects'
import Resources from './pages/Resources'
import { Contact, GetInvolved, Participate, StayInformed, WorkWithUs } from './pages/Involved'
import Donate from './pages/Donate'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="governance" element={<Governance />} />
        <Route path="our-team" element={<Team />} />
        <Route path="awards" element={<Awards />} />
        <Route path="current-projects" element={<Ongoing />} />
        <Route path="previous-projects" element={<Previous />} />
        <Route path="resources/:slug" element={<Resources />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="participate" element={<Participate />} />
        <Route path="stay-informed" element={<StayInformed />} />
        <Route path="work-with-us" element={<WorkWithUs />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="donate" element={<Donate />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
