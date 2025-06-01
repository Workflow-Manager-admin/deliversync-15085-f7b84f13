import React, { useState } from 'react';
import './App.css';

// Color theme
const COLORS = {
  primary: '#1976D2',
  secondary: '#FFFFFF',
  accent: '#FFC107',
  text: '#222D33',
  textSecondary: '#555',
  background: '#F8FAFE',
};

// Icons (simple SVG for demo purposes)
const navIcons = {
  Orders: (
    <svg width="24" height="24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke={COLORS.primary} strokeWidth="2" /><rect x="7" y="9" width="10" height="2" rx="1" fill={COLORS.primary} /></svg>
  ),
  Map: (
    <svg width="24" height="24" fill="none"><path d="M8 16l-6 2V6l6-2m0 12v-12m0 12l8 2m-8-14l8 2m0 0v12m0-12l6-2v12l-6 2" stroke={COLORS.primary} strokeWidth="2" /></svg>
  ),
  Earnings: (
    <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="9" stroke={COLORS.primary} strokeWidth="2" /><path d="M8 12h8" stroke={COLORS.primary} strokeWidth="2" /><path d="M12 8v8" stroke={COLORS.primary} strokeWidth="2" /></svg>
  ),
  Support: (
    <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="9" stroke={COLORS.primary} strokeWidth="2" /><path d="M15 15l-2-2h-1a3 3 0 1 1 2.83-4" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" /></svg>
  ),
};

// Dummy delivery data
const DELIVERIES = [
  {
    id: 'ORD-1234',
    status: 'On The Way',
    address: '3456 Market Ave, Springfield',
    time: '11:30 AM',
  },
  {
    id: 'ORD-1235',
    status: 'Upcoming',
    address: '8723 Elm St, Springfield',
    time: '12:00 PM',
  },
];

// --- Components ---

// PUBLIC_INTERFACE
function HomeDeliveriesScreen() {
  return (
    <div style={{
      padding: '16px', paddingTop: '24px', background: COLORS.background,
      minHeight: 'calc(100vh - 112px)',
    }}>
      <div style={{
        fontSize: '1.2rem',
        color: COLORS.text,
        fontWeight: 600,
        marginBottom: 10,
      }}>
        Today’s Deliveries
      </div>
      {DELIVERIES.map(d => (
        <div
          key={d.id}
          style={{
            background: COLORS.secondary,
            borderRadius: 10,
            boxShadow: '0 1px 6px 0 rgba(50,60,90, 0.08)',
            marginBottom: 16,
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ fontWeight: 600, color: COLORS.primary }}>
            {d.status}: <span style={{ color: COLORS.text }}>{d.address}</span>
          </div>
          <div style={{ color: COLORS.textSecondary, fontSize: '0.97rem' }}>
            ETA: {d.time} &nbsp;&middot;&nbsp; Order #{d.id}
          </div>
          <div>
            <button style={{
              background: COLORS.primary,
              color: COLORS.secondary,
              border: 'none',
              borderRadius: 4,
              padding: '8px 16px',
              marginTop: 8,
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
            }}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function BottomNavigation({ value, setValue }) {
  const tabs = [
    { label: 'Orders', icon: navIcons.Orders },
    { label: 'Map', icon: navIcons.Map },
    { label: 'Earnings', icon: navIcons.Earnings },
    { label: 'Support', icon: navIcons.Support },
  ];

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed', left: 0, bottom: 0, width: '100%', background: COLORS.secondary,
      boxShadow: '0 -1px 5px 0 rgba(50,60,90,0.04)', display: 'flex', zIndex: 99,
      borderTop: `1px solid #eaeaea`, height: 60, justifyContent: 'space-around',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.label}
          style={{
            flex: 1,
            padding: 0,
            border: 'none',
            background: 'none',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: value === tab.label ? COLORS.primary : COLORS.textSecondary,
            fontWeight: value === tab.label ? 700 : 500,
            fontSize: '0.91rem',
            cursor: 'pointer',
          }}
          aria-label={tab.label}
          onClick={() => setValue(tab.label)}
        >
          <span>{tab.icon}</span>
          <span style={{ marginTop: 2 }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

// PUBLIC_INTERFACE
function FloatingActionButton({ onClick, ariaLabel }) {
  return (
    <button
      aria-label={ariaLabel || "Update Status"}
      style={{
        position: 'fixed',
        bottom: 80,
        right: 28,
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: COLORS.accent,
        color: COLORS.primary,
        boxShadow: '0 4px 16px 0 rgba(50,60,90, 0.13)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        fontSize: 36,
        cursor: 'pointer',
        fontWeight: 700,
        transition: 'background 0.2s',
        zIndex: 101,
      }}
      onClick={onClick}
    >
      <span style={{
        fontWeight: 900,
        fontSize: 32,
        color: COLORS.primary,
        lineHeight: '1em',
        marginBottom: 2,
      }}>+</span>
    </button>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  const [tab, setTab] = useState('Orders');

  // Simple placeholder screens for other tabs
  const renderContent = () => {
    switch (tab) {
      case 'Orders':
        return <HomeDeliveriesScreen />;
      case 'Map':
        return (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 'calc(100vh - 112px)', color: COLORS.primary,
            fontWeight: 600, fontSize: '1.2rem', background: COLORS.background,
          }}>
            Map & Route Optimization (Coming Soon)
          </div>
        );
      case 'Earnings':
        return (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 'calc(100vh - 112px)', color: COLORS.primary,
            fontWeight: 600, fontSize: '1.2rem', background: COLORS.background,
          }}>
            Earnings Dashboard (Coming Soon)
          </div>
        );
      case 'Support':
        return (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 'calc(100vh - 112px)', color: COLORS.primary,
            fontWeight: 600, fontSize: '1.2rem', background: COLORS.background,
          }}>
            In-app Chat / Support (Coming Soon)
          </div>
        );
      default:
        return null;
    }
  };

  // Demo of floating action button action
  const handleFabClick = () => {
    // Placeholder: in real app, would open status update dialog/modal
    window.alert('Quick Status Update: This will allow the user to update order status.');
  };

  return (
    <div className="app" style={{
      minHeight: '100vh', background: COLORS.background, display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        height: 52, background: COLORS.primary, color: COLORS.secondary, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 20px',
        position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 100,
        boxShadow: '0 2px 6px 0 rgba(25,118,210,0.10)',
      }}>
        <div style={{
          fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px',
          display: 'flex', alignItems: 'center'
        }}>
          <span style={{
            width: 26, height: 26, background: COLORS.accent, color: COLORS.primary,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', fontWeight: 800, fontSize: 18, marginRight: 10
          }}>
            D
          </span>
          DeliverSync
        </div>
        <div>
          <span style={{ fontSize: 16, fontWeight: 400 }}>For Partners</span>
        </div>
      </header>

      {/* Main content */}
      <main style={{ paddingTop: 60, paddingBottom: 70, flex: 1 }}>
        {renderContent()}
      </main>

      {/* Floating Action Button */}
      {tab === 'Orders' && (
        <FloatingActionButton onClick={handleFabClick} ariaLabel="Quick Status Update" />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation value={tab} setValue={setTab} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return <MainContainer />;
}

export default App;
