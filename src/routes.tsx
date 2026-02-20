import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AdminLayout } from "./layout/AdminLayout";
import { ChargesPage } from "./pages/ChargesPage";
import { RefundsPage } from "./pages/RefundsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { PartnersPage } from "./pages/PartnersPage";
import { PartnerCreatePage } from "./pages/PartnerCreatePage";
import { PartnerDetailPage } from "./pages/PartnerDetailPage";
import { MerchantsPage } from "./pages/MerchantsPage";
import { MerchantDetailPage } from "./pages/MerchantDetailPage";
import { UsersPage } from "./pages/UsersPage";
import { UserDetailPage } from "./pages/UserDetailPage";
import { MerchantListPage } from "./pages/MerchantListPage";
import { MerchantAccountPage } from "./pages/MerchantAccountPage";
import { TagHierarchyPage } from "./pages/TagHierarchyPage";
import {
  mockPartners,
  mockMerchants,
  mockUsers,
  mockUserDetails,
} from "./data";

// --- Route Wrappers ---

function PartnerDetailRoute() {
  const { partnerName } = useParams<{ partnerName: string }>();
  const navigate = useNavigate();
  const partner = mockPartners.find(
    (p: { name: string }) => p.name === decodeURIComponent(partnerName || ""),
  );
  if (!partner) return <Navigate to="/partners" replace />;
  return (
    <PartnerDetailPage partner={partner} onBack={() => navigate("/partners")} />
  );
}

function MerchantDetailRoute() {
  const { merchantName } = useParams<{ merchantName: string }>();
  const navigate = useNavigate();
  const merchant = mockMerchants.find(
    (m) => m.name === decodeURIComponent(merchantName || ""),
  );
  if (!merchant) return <Navigate to="/merchants" replace />;
  return (
    <MerchantDetailPage
      merchant={merchant}
      onBack={() => navigate("/merchants")}
    />
  );
}

function UserDetailRoute() {
  const { userEmail } = useParams<{ userEmail: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(userEmail || "");
  const user = mockUsers.find((u) => u.email === email);
  if (!user) return <Navigate to="/accounts" replace />;
  return <UserDetailPage user={user} onBack={() => navigate("/accounts")} />;
}

function MerchantListRoute() {
  const { userEmail } = useParams<{ userEmail: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(userEmail || "");
  const detail = mockUserDetails[email];
  if (!detail) return <Navigate to="/accounts" replace />;
  return (
    <MerchantListPage
      userEmail={email}
      teams={detail.teams}
      onBack={() => navigate("/accounts/" + encodeURIComponent(email))}
    />
  );
}

function MerchantAccountRoute() {
  const { userEmail, merchantName } = useParams<{
    userEmail: string;
    merchantName: string;
  }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(userEmail || "");
  const name = decodeURIComponent(merchantName || "");
  return (
    <MerchantAccountPage
      merchantName={name}
      userEmail={email}
      onBack={() =>
        navigate("/accounts/" + encodeURIComponent(email) + "/merchants")
      }
    />
  );
}

function TagHierarchyRoute() {
  const { userEmail } = useParams<{ userEmail: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(userEmail || "");
  return (
    <TagHierarchyPage
      userEmail={email}
      onBack={() =>
        navigate("/accounts/" + encodeURIComponent(email) + "/merchants")
      }
      onMerchantLookup={(tagName) =>
        navigate(
          "/accounts/" +
            encodeURIComponent(email) +
            "/merchants?tag=" +
            encodeURIComponent(tagName),
        )
      }
    />
  );
}

// --- Main App ---
export default function OmiseAdminDashboard() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/charges" replace />} />
        <Route path="/charges" element={<ChargesPage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route
          path="/chargeback"
          element={<PlaceholderPage title="Chargeback" />}
        />
        <Route path="/deposit" element={<PlaceholderPage title="Deposit" />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/partners/new" element={<PartnerCreatePage />} />
        <Route path="/partners/:partnerName" element={<PartnerDetailRoute />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route
          path="/merchants/:merchantName"
          element={<MerchantDetailRoute />}
        />
        <Route path="/accounts" element={<UsersPage />} />
        <Route path="/accounts/:userEmail" element={<UserDetailRoute />} />
        <Route
          path="/accounts/:userEmail/merchants"
          element={<MerchantListRoute />}
        />
        <Route
          path="/accounts/:userEmail/merchants/:merchantName"
          element={<MerchantAccountRoute />}
        />
        <Route
          path="/accounts/:userEmail/tag-hierarchy"
          element={<TagHierarchyRoute />}
        />
        <Route path="/audits" element={<PlaceholderPage title="Audits" />} />
        <Route path="*" element={<Navigate to="/charges" replace />} />
      </Route>
    </Routes>
  );
}
