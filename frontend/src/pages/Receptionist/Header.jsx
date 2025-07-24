import React from 'react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="navbar navbar-light bg-white border-bottom px-4">
      <button className="btn d-lg-none me-2" onClick={toggleSidebar}>
        <i className="bi bi-list" />
      </button>
      <form className="d-none d-md-flex flex-grow-1 mx-3">
        <input type="search" className="form-control" placeholder="Search..." />
      </form>
      <div className="d-flex align-items-center">
        <button className="btn btn-link position-relative me-3">
          <i className="bi bi-bell" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
        </button>
        <div className="d-flex align-items-center">
          <img
            src="https://placehold.co/40x40/E2E8F0/4A5568?text=JD"
            className="rounded-circle me-2"
            alt="Receptionist"
            width={40} height={40}
          />
          <div>
            <div className="fw-semibold">Jessica Day</div>
            <small className="text-muted">Receptionist</small>
          </div>
        </div>
      </div>
    </header>
  );
}
