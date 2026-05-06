import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RechargePage from './pages/RechargePage';
import PaymentProfilePage from './pages/PaymentProfilePage';
import ResendReceiptPage from './pages/ResendReceiptPage';
import AssistantPage from './pages/AssistantPage';
import DeveloperPage from './pages/DeveloperPage';
import LoginPage from './pages/LoginPage';
import GetStartedPage from './pages/GetStartedPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import StatusPage from './pages/StatusPage';
import LegalPage from './pages/LegalPage';
import SalaryPaymentPage from './pages/SalaryPaymentPage';
import PensionSchedulePage from './pages/PensionSchedulePage';
import GenericContentPage from './pages/GenericContentPage';
import BusinessPage from './pages/BusinessPage';
import MerchantDashboard from './pages/MerchantDashboard';
import Footer from './sections/Footer';
import RiversPayAssistantButton from './components/RiversPayAssistantButton';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/payment-profile" element={<PaymentProfilePage />} />
        <Route path="/resend-receipt" element={<ResendReceiptPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/developers" element={<DeveloperPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/salary-payment" element={<SalaryPaymentPage />} />
        <Route path="/pension-schedule" element={<PensionSchedulePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/press" element={<GenericContentPage title="Press & Media" subtitle="Latest news and press kits from RiversPay." />} />
        <Route path="/partners" element={<GenericContentPage title="Partners Program" subtitle="Join our ecosystem of integrated payment partners." />} />
        <Route path="/dashboard" element={<MerchantDashboard />} />
      </Routes>
      <Footer />
      <RiversPayAssistantButton />
    </BrowserRouter>
  );
}

export default App;
