# Security Architecture
## EcoSphere Carbon Footprint Tracker

---

## 1. Threat Model & Mitigations

| Threat Vector | Mitigation Strategy |
| :--- | :--- |
| **Cross-Site Scripting (XSS)** | UI rendering uses `textContent` to prevent execution of malicious scripts injected via chat input or calculations. |
| **Path Traversal / Injection** | Numeric fields are parsed strictly using `parseFloat()` and `parseInt()`, ensuring string values cannot execute shell code or read local system directories. |
| **State Corruption** | All states parsed from `localStorage` are enclosed in robust `try-catch` blocks to prevent JSON payload corruption from crashing the site startup. |
| **Data Privacy Violations** | No Personally Identifiable Information (PII) is tracked. User state caches (points, footprint total) are kept strictly client-side. |
| **API Failure / Outage** | The frontend uses local fallback processing algorithms to gracefully degrade if the remote Gemini API endpoint becomes unreachable. |

---

## 2. Input Validation (Defense in Depth)

### Client Input Parsing
* Calculator numbers are constrained using HTML `min="0"` or `min="1"` boundary limits.
* All form submits are validated dynamically at runtime. For example:
```javascript
const inputs = {
  transport_km_car_petrol: parseFloat(document.getElementById('input-car-petrol').value) || 0,
  household_size: parseInt(document.getElementById('input-household-size').value) || 1
};
```
This forces malformed values to default safely to stable baseline values (`0` or `1`).

---

## 3. Recommended Production Security Headers

When hosting this platform on production web servers, the following HTTP headers are recommended to enforce strict browser security sandbox constraints:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://lh3.googleusercontent.com;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```
