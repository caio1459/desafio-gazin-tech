import React, { ReactNode } from "react";
import { Header } from "../Header";
import { NavItems } from "../NavItems";

interface IDashboardProps {
  children: ReactNode;
}

export const Dashboard: React.FC<IDashboardProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <NavItems linkTo={"/"} title={"Dashboard"}>
                  <i className="bi bi-columns-gap"></i>
                </NavItems>
                <NavItems linkTo={"/desenvolvedores"} title={"Desenvolvedores"}>
                  <i className="bi bi-code-slash"></i>
                </NavItems>
                <NavItems linkTo={"/niveis"} title={"Niveis"}>
                  <i className="bi bi-reception-4"></i>
                </NavItems>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
