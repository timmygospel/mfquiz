import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./header";

const DashboardLayout = () => {
  return (
    <div className="grid-container">

      {/* <aside className="sidenav">
        <h2 class="logo">QUIZE</h2>
        <ul className="sidenav__list">
          <li className="sidenav__list-item">
            <Link to="quizcreator" className="nav-item">
              Create Quiz
            </Link>
          </li>

          <li className="sidenav__list-item">
            <Link to="user" className="nav-item">
              Existing Quizes
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="questions" className="nav-item">
              Question Manager
            </Link>
          </li>
          <li className="sidenav__list-item">
            <Link to="categories" className="nav-item">
              Category Manager
            </Link>
          </li>
        </ul>
      </aside> */}


<aside class="rounded-sidenav">
  
  <div class="sidenav__logo">
    <div class="logo-circle">Q</div>
    <h2 class="logo-text">QUIZE</h2>
  </div>


  <ul class="sidenav__list">
    <li class="sidenav__list-item">
      <a href="quizcreator" class="nav-item">
        <i class="fas fa-pen nav-icon"></i>
        
      </a>
    </li>
    <li class="sidenav__list-item">
      <a href="user" class="nav-item">
        <i class="fas fa-folder-open nav-icon"></i>
        
      </a>
    </li>
    <li class="sidenav__list-item">
      <a href="questions" class="nav-item">
        <i class="fas fa-list-ul nav-icon"></i>
        
      </a>
    </li>
    <li class="sidenav__list-item">
      <a href="categories" class="nav-item">
        <i class="fas fa-tags nav-icon"></i>
        
      </a>
    </li>
  </ul>


</aside>


      <main className="main">
        <div className="content-container">
          <Outlet />
        </div>

        <div className="main-cards"></div>
      </main>
      <footer className="footer">
        <div className="footer__copyright">&copy; 2025 </div>
        <div className="footer__signature">Powered by heycheeky Ltd</div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
