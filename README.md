# Omise Admin Dashboard (Mock)

A frontend mock of the Omise internal admin dashboard, built with React + TypeScript + Vite and React Router. All data is local mock data — no backend required.

## Stack

- **React 19** + **TypeScript**
- **Vite** for dev server and build
- **React Router v6** for client-side routing
- **pnpm** as package manager

## Getting Started

```bash
pnpm install
pnpm dev       # start dev server
pnpm build     # production build
```

---

## UI Layout

The app uses a persistent shell layout (`AdminLayout`) with:

- **Top bar** — OMISE logo, admin charge search input, Exports link, current admin email
- **Sidebar** — grouped navigation links with active-state highlighting, divided into three sections:
  - `TRANSACTIONS` — Charges, Refunds, Chargeback, Deposit
  - `PEOPLE` — Partners, Merchants, Accounts
  - `TECHNICALS` — Audits
- **Main content area** — renders the active page via React Router `<Outlet>`

---

## Pages & Features

### Charges `/charges`

- Table of charge records with ID, authorized/captured amounts, merchant, status, and date
- Status icon per charge (succeeded, failed, pending, etc.)
- Search/filter bar with status filter pills (All, Succeeded, Failed, Pending, Reversed)
- Click a row to open a **charge detail side panel** with full charge info, merchant badge, and timeline

### Refunds `/refunds`

- Table of refund records with amount, charge reference, merchant, status, and date
- Status icon per refund
- Search input and status filter

### Partners `/partners`

- List of partners with status badge, email, and created date
- **New Partner** button navigates to `/partners/new` (URL updates correctly)
- Click a partner row to navigate to `/partners/:partnerName`

### Partner Create `/partners/new`

- Form to create a new partner (name, email, status)
- On submit, adds the partner to the shared in-memory store and redirects back to `/partners`

### Partner Detail `/partners/:partnerName`

- Tabbed detail view: **Live Account** and **Test Account** tabs
- Shows statement name, sub-merchant, master merchant team name, email, locked status, fraud detectors, MM threshold, suspended transfers

### Merchants `/merchants`

- Searchable table of merchants with name, tag, status badge
- Click a row to navigate to `/merchants/:merchantName`

### Merchant Detail `/merchants/:merchantName`

- Tabbed sidebar layout with account info sections
- Live/test account tabs showing statement name, sub-merchant details, locked status

### Accounts `/accounts`

- Searchable list of user accounts (MM-badge users)
- Click a row to navigate to `/accounts/:userEmail`

### Account Detail `/accounts/:userEmail`

- Shows user email, live badge, MM badge
- **Teams table** — lists all team memberships with active status, team name (clickable → merchant account), badge, tag, email, date
- **Merchant button** (if merchant) → navigates to `/accounts/:userEmail/merchants`
- Lock status, member support PIN, PIN display with Edit button
- Login history (browser, sign-in time, IP)
- Reset Export panel (pending/limit flags + reset button)

### Merchant List `/accounts/:userEmail/merchants`

- Lists all merchant teams for the account (excludes MM entries)
- Inline **merchant ID editing** — click the `#` button to edit in place, save/cancel
- Filter by tag name via URL query param `?tag=...`
- **Tag management** button → navigates to `/accounts/:userEmail/tag-hierarchy`
- Click Edit → navigates to `/accounts/:userEmail/merchants/:merchantName`

### Merchant Account `/accounts/:userEmail/merchants/:merchantName`

- Shows merchant ID (read-only)
- **Merchant Tag** panel — renders the full tag ancestry path from root to the merchant's direct tag, with tree icons and a "Direct" badge on the leaf
- **Profile Setup** table — lists all profile setups with status badge, profile ID, product name, created date
- Click a profile row → opens **Profile Detail** (inline sub-navigation, no URL change)
- **New Profile Setup** link → opens **Profile Creation** (inline sub-navigation)

### Profile Creation (sub-view of Merchant Account)

- Form fields: Profile ID, Profile Key, Product Name
- On create, appends a new profile to the in-page list

### Profile Detail (sub-view of Merchant Account)

- Editable fields: Profile ID, Profile Key, Product Name
- Status badge (ACTIVE / DEACTIVATED)
- **Action** dropdown: Activate / Deactivate (toggles status immediately)
- Update and Delete buttons

### Tag Hierarchy `/accounts/:userEmail/tag-hierarchy`

- Full interactive tag tree rendered recursively
- **Hover actions** on any node:
  - **Edit Tag** — inline input to change `id — label` in one field; splits on `—` or `-`
  - **Move** — opens a modal to select a new parent (excludes the moving node and its descendants)
  - **Merchant Lookup** — navigates to the merchant list filtered by that tag
- **Create Tag** button — modal to enter `id - label` and pick a parent branch
- **Search** input filters the tree in real time (matches on ID or label, preserves hierarchy)

### Chargeback, Deposit, Audits

- Placeholder pages showing "under development" state

---

## Project Structure

```
src/
  types.ts                      # TypeScript interfaces for all data models
  data.ts                       # All mock data + tag tree utility functions
  routes.tsx                    # Route wrappers + full <Routes> tree
  omise-admin-dashboard.tsx     # Entry re-export (1 line)
  layout/
    AdminLayout.tsx             # Sidebar + topbar shell with <Outlet>
  components/
    StatusIcon.tsx              # StatusIcon and MerchantBadge shared components
    ChargeDetail.tsx            # Charge detail side panel component
  pages/
    ChargesPage.tsx
    RefundsPage.tsx
    PartnersPage.tsx
    PartnerCreatePage.tsx
    PartnerDetailPage.tsx
    MerchantsPage.tsx
    MerchantDetailPage.tsx
    UsersPage.tsx
    UserDetailPage.tsx
    MerchantListPage.tsx
    MerchantAccountPage.tsx
    ProfileCreationPage.tsx
    ProfileDetailPage.tsx
    TagHierarchyPage.tsx
    PlaceholderPage.tsx
```
