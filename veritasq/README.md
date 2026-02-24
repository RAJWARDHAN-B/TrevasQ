# VeritasQ | Secure Data Protection Platform

VeritasQ is a security-first data management platform designed to provide military-grade encryption and trust-building UI/UX.

## 🚀 Built With
- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Vanilla CSS + Tailwind CSS (configured for modern @theme)
- **Typography**: Crimson Pro (Headings) & Inter (UI)
- **Icons**: Lucide-inspired SVG components

## 🛠️ Features
- **Modern Landing Page**: High-trust messaging with a floating glassmorphism navbar.
- **Secure Login + MFA**: Multi-step verification process with automated input sanitization.
- **Security Dashboard**: 
  - Real-time Security status indicator.
  - Secure File List with status tracking.
  - Security Audit Log table.
- **Secure File Upload**:
  - Drag-and-drop interface.
  - Simulated local AES-256 encryption.
  - Progress-driven feedback.
- **RBAC**: UI-level Role Based Access Control integration.

## ⚙️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Implementation Details
- **Input Sanitization**: Located in `lib/security.ts`, handles XSS and script injection prevention.
- **Secure Token Handling**: Uses `sessionStorage` for token persistence to ensure session-only lifetime.
- **Mock Secure API**: Demonstrates token-based authentication headers and secure data fetching.
- **Client-Side Encryption Logic**: Located in `app/dashboard/upload/page.tsx`, simulates the local encryption step before data ingestion.

## 📄 Documentation
See [DESIGN_NOTE.md](./DESIGN_NOTE.md) for a detailed explanation of the security-first design philosophy.
