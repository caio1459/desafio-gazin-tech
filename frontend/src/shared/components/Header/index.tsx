import { Link } from "react-router-dom"
import image from '/images/logo.png'

export const Header = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap">
      <div className="container-fluid d-flex align-items-center">
        <Link to={'/'} className="d-flex align-items-center px-3 navbar-brand text-light fs-4">
          <img
            src={image}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          DevTech
        </Link>
      </div>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="w-100"></div>
    </header>
  )
}
