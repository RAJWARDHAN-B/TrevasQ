# VeritasQ - Design & Security Rationale

## 1. How design communicates trust
Trust in a security product is communicated through a combination of visual stability, professionalism, and transparency:
- **Serif Typography**: The use of **Crimson Pro** for headings provides a sense of established authority and "high-fidelity" seriousness, reminiscent of legal or financial institutions.
- **Color Palette**: A clean, white-space heavy design with **Emerald Green** (#059669) accents. Green is psychologically associated with "success," "safe," and "correct," reinforcing that the system is functioning properly.
- **Glassmorphism**: The floating blurred navbar and surface effects suggest modern, cutting-edge technology while maintaining clarity.
- **Trust Elements**: The landing page prominently features icons for Encryption, Zero-Knowledge, and Real-time monitoring, using familiar symbols (locks, shields, alerts) to bridge the conceptual gap for users.

## 2. How security warnings / alerts are shown
- **Contextual Badges**: Status indicators like "Scanning" or "Secure" are placed immediately next to data items (files) to provide real-time reassurance.
- **High-Contrast Banners**: Important security reminders (like the URL verification tip) use high-contrast backgrounds (dark emerald or amber) to stand out from the soft UI without being alarming.
- **State-Based Alerts**: During file uploads, the UI changes from a neutral drop-zone to a dynamic progress bar that explicitly labels the "Encryption" phase, making the "invisible" security work visible to the user.

## 3. How UX reduces user security mistakes
- **Multi-Step MFA**: By separating the login into 1) Password and 2) MFA, we prevent user cognitive overload and ensure that the second factor is not an afterthought.
- **Implicit Sanitization**: All inputs are sanitized before being processed by the mock backend, protecting the system even if the user attempts to enter malicious scripts.
- **Clear Policy Reminders**: The upload page includes a "Security Policy Reminder" banner in a distinct amber color, serving as a friction point that reminds users to check for PII before uploading.
- **Role-Based Visibility**: Users only see what they are authorized to see (e.g., Admin badges only appear if the role is confirmed), reducing the surface area for user-driven data leaks.
