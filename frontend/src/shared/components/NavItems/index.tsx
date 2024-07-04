import React from "react"
import { Link } from "react-router-dom"

interface INavItemsProps {
  linkTo: string
  title: string
  children: React.ReactNode
}

export const NavItems: React.FC<INavItemsProps> = ({ linkTo, title, children }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={linkTo}>
        {children}
        <span className='ms-2'>{title}</span>
      </Link>
    </li>
  )
}