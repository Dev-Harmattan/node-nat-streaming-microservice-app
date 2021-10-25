import Link from 'next/link';

export const Header = ({currentUser}) => {

  const links = [
    !currentUser && {label: 'Sign in', href: "/auth/signin"},
    !currentUser && {label: 'Sign up', href: "/auth/signup"},
    currentUser && {label: 'Sign out', href: "/auth/signout"}
  ]
  .filter(linkConfig => linkConfig)
  .map(linkConfig => (
    <li className="nav-item">
      <Link href={linkConfig.href}>
        <a className="nav-link">{linkConfig.label}</a>
      </Link>
    </li>
  ));
  
  return <nav className="navbar navbar-light bg-light">
    <Link href="/">
      <a className="nav-brand">MANGOS</a>
    </Link>

    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {links}
      </ul>
    </div>
  </nav>
}