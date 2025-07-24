import React from 'react';

export default function Sidebar({ activeView, setActiveView, }) {
  return (
    <aside className={`bg-dark text-white vh-100 d-none d-lg-block`} style={{ width: 250 }}>
    <div className="text-center py-4 border-bottom border-secondary">
        <i className="bi bi-barbell" style={{ fontSize: 32, color: '#f8f9fa' }} /> 
        <h2 className="h5 fw-bold mb-0" style={{ color: '#f8f9fa' }}>GymMate</h2>
      </div>
     
      <nav className="list-group list-group-flush pt-3">
        {[
          { title: 'Dashboard', icon: 'bi-speedometer2' },
          { title: 'Members', icon: 'bi-people' },
          { title: 'Trainers', icon: 'bi-person-badge' },
        ].map((item) => {
          const isActive = activeView === item.title;
          return (
            <button
              key={item.title}
              className={`list-group-item list-group-item-action bg-dark border-0 text-start`}
              onClick={() => setActiveView(item.title)}
              style={{
                color: isActive ? '#0d6efd' : '#f8f9fa',              // active = Bootstrap primary blue, else light grey
                backgroundColor: isActive ? '#212529' : 'transparent',  // darker bg on active
                fontWeight: isActive ? '600' : '400',
              }}
            >
              <i
                className={`bi ${item.icon} me-2`}
                style={{ color: isActive ? '#0d6efd' : '#f8f9fa', fontSize: '1.2rem' }}
              />
              {item.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
