import Link from 'next/link'


function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
            <Link className="ms-auto" href="/research">Research</Link>
        </div>
    </nav>
  )
}

export default NavBar;