import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./header";

const DashboardLayout = () => {
  return (
    <div className="grid-container">
      <header class="header">
        <div className="header__search">Search...</div>
        <div className="header__avatar">Your face</div>
      </header>
      <aside className="sidenav">
       
        <ul className="sidenav__list">
          <li className="sidenav__list-item">
            <Link to="question" className="nav-item">
              Quiz's
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="quiz" className="nav-item">
              Question's dddd
            </Link>
          </li>

          <li className="sidenav__list-item">
            <Link to="user" className="nav-item">
              User
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="questions" className="nav-item">
            Questions Manager
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="categories" className="nav-item">
            Category Manager
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="questionlist" className="nav-item">
           List of Questions
            </Link>
          </li>
        </ul>
      </aside>
      <main className="main">
        <Outlet />

        <div className="main-cards"></div>
      </main>
      <footer className="footer">
        <div className="footer__copyright">&copy; 2024 </div>
        <div className="footer__signature">Powered by heycheeky Ltd</div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
