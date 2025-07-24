
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import MemberCheckin from './MemberCheckin';
import ClassSchedule from './ClassSchedule';
import MembershipAlerts from './MembershipAlerts';
import QuickActions from './QuickActions';
import NewMemberModal from './NewMemberModal';
import EditMemberModal from './EditMemberModal';
import MembersPage from './MembersPage';
import TrainersPage from './TrainersPage';

import {
  initialCheckedInMembers,
  initialAllMembers,
} from './mockData'; 

export default function ReceptionistDashboard() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [allMembers, setAllMembers] = useState(initialAllMembers);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleEditClick = (member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = (updatedMember) => {
    setAllMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member)),
    );
  };

  const renderView = () => {
    switch (activeView) {
      case 'Members':
        return (
          <MembersPage
            onNewMemberClick={() => setIsNewMemberModalOpen(true)}
            members={allMembers}
            onEditClick={handleEditClick}
          />
        );
      case 'Trainers':
        return <TrainersPage />;
      case 'Dashboard':
      default:
        return (
          <>
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-3">
                <StatCard title="Today's Check-ins" value="128" icon="bi-box-arrow-in-right" color="primary" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard title="Memberships Expiring" value="12" icon="bi-exclamation-triangle" color="warning" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard title="Upcoming Classes" value="8" icon="bi-calendar-check" color="success" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard title="Today's Sales" value="$1,250" icon="bi-currency-dollar" color="info" />
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-8">
                <MemberCheckin
                  members={initialCheckedInMembers}
                  onNewMemberClick={() => setIsNewMemberModalOpen(true)}
                />
                <ClassSchedule />
              </div>
              <div className="col-lg-4">
                <MembershipAlerts />
                <QuickActions />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-grow-1 d-flex flex-column">
        <Header toggleSidebar={() => setIsSidebarOpen((open) => !open)} />
        <main className="flex-grow-1 p-4 overflow-auto">{renderView()}</main>
      </div>
      <NewMemberModal isOpen={isNewMemberModalOpen} onClose={() => setIsNewMemberModalOpen(false)} />
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={editingMember}
        onUpdate={handleUpdateMember}
      />
    </div>
  );
}
