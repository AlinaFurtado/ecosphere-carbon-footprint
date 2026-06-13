# Security Policy
## EcoSphere Carbon Footprint Tracker

---

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please follow the guidelines below to report it. We take security seriously and investigate all reports promptly.

### Disclosure Process
* **Contact**: Please do not open public issues for security vulnerabilities. Instead, email reports to `security@ecosphere-carbon.org` (simulated).
* **Details**: Include a detailed description of the vulnerability, steps to reproduce, and potential impact.
* **Resolution**: We will acknowledge receipt of your report within 48 hours and coordinate a fix immediately.

---

## Default Safeguards

The EcoSphere application implements several client-side security measures by default:
1. **XSS Prevention**: User chat logs and inputs are sanitized.
2. **Local Isolation**: Sensitive data is never requested or saved.
3. **Graceful Fallbacks**: Offline fallback engines handle processing if external APIs degrade.
