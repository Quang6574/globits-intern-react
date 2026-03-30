import { NavLink } from 'react-router-dom'

export default function Sidenav({ show }) {

    return <nav className={show ? 'sidenav active' : 'sidenav'}>
        <ul>
            <li>
                <NavLink to="/" className="site-title">Home</NavLink>
            </li>
            <li>
                <NavLink to="/country">Country</NavLink>
            </li>
            <li>
                <NavLink to="/company">Company</NavLink>
            </li>
            <li>
                <NavLink to="/department">Department</NavLink>
            </li>
            <li>
                <NavLink to="/project">Project</NavLink>
            </li>
        </ul>

    </nav>
}