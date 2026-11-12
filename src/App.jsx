import React, { useEffect } from 'react';
import { useAuth, AuthProvider, API_BASE_URL } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MobileLayout } from './components/layout/MobileLayout';
import { LoginScreen } from './components/auth/LoginScreen';
import { AdminPanel } from './components/admin/AdminPanel';
import { StudentPanel } from './components/student/StudentPanel';
import { NapiWidget } from './components/napi/NapiWidget';
import { NapiChatModal } from './components/napi/NapiChatModal';
import { AccessibilityModal } from './components/common/AccessibilityModal';

const MainContent = () => {
  const { activeView } = useAuth();

  return (
    <MobileLayout>
      {activeView === 'landing' && <LoginScreen />}
      {activeView === 'admin'   && <AdminPanel />}
      {activeView === 'student' && <StudentPanel />}
      {activeView !== 'landing' && (
        <>
          <NapiWidget />
          <NapiChatModal />
        </>
      )}
      <AccessibilityModal />
    </MobileLayout>
  );
};

export default function App() {
  useEffect(() => {
    // Despertar instancia Free de Render en segundo plano al montar la app
    fetch(`${API_BASE_URL}/api/health`).catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
