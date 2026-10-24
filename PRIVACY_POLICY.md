# Privacy Policy for DevFill — Smart Dummy Form Filler

**Last Updated:** October 24, 2026

DevFill ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains our practices regarding user data.

---

### 1. No Data Collection or Transmission
DevFill is an **offline-first, client-side developer utility**. 
- We do **NOT** collect, store, transmit, or share any personal information.
- We do **NOT** track your browsing history, keystrokes, form submissions, or website interactions.
- We do **NOT** send any telemetry, analytics, or network requests to external servers.

---

### 2. Permissions Justification & Usage
The extension requests only minimal permissions required to function as an automated developer testing tool:

- **`scripting` & `activeTab`:** Used exclusively to inspect form input fields (e.g., text, email, select) and inject synthetic test data into the current active tab when explicitly triggered by the user (via popup button, keyboard shortcut `Alt+Shift+F`, or context menu). No data is extracted or transmitted from the page.
- **`storage`:** Used solely to store your local preferences (such as preferred locale and test password settings) on your device using Chrome's local/sync storage.
- **`contextMenus`:** Used to provide quick right-click actions (e.g., "Fill with Test Email", "Fill Entire Form") directly on editable fields.

---

### 3. Remote Code Compliance
DevFill does **NOT** use or execute any remote code, external scripts, `eval()`, or CDN-hosted assets. All faker generators, datasets, and scripts are 100% packaged locally within the extension bundle.

---

### 4. Third-Party Sharing
Because we do not collect any data, no user data is ever sold, leased, or shared with third parties, advertisers, or data brokers.

---

### 5. Contact & Open Source
DevFill is open source and licensed under the MIT License. If you have any questions or feedback regarding this policy, please open an issue on our GitHub repository:
- **Repository:** [https://github.com/sajusun/Auto-Filler---Developer-Tools](https://github.com/sajusun/Auto-Filler---Developer-Tools)
- **Developer:** Sakhawat Hossain
