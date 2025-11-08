document.addEventListener("DOMContentLoaded", () => {
  const statusText = document.getElementById("status-text");
  setTimeout(() => {
    statusText.textContent = "🟢 Server Online | 34 Players Active";
  }, 1500);

  // --- APPLY FORM ---
  const applyForm = document.getElementById("apply-form");
  const formStatus = document.getElementById("form-status");

  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "Submitting...";
    const ign = document.getElementById("ign").value;
    const discord = document.getElementById("discord").value;
    const reason = document.getElementById("reason").value;

    const data = {
      data: [{ ign, discord, reason, type: "application" }]
    };

    const res = await fetch("https://sheetdb.io/api/v1/shj47rm9k724o", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      formStatus.textContent = "✅ Application submitted!";
      applyForm.reset();
    } else {
      formStatus.textContent = "❌ Error submitting form.";
    }
  });

  // --- AUTH FORM (Login/Register) ---
  const authForm = document.getElementById("auth-form");
  const authStatus = document.getElementById("auth-status");

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    authStatus.textContent = "Processing...";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mode = document.getElementById("mode").value;

    if (mode === "register") {
      const data = { data: [{ email, password, type: "user" }] };
      const res = await fetch("https://sheetdb.io/api/v1/YOUR_SHEETDB_API", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        authStatus.textContent = "✅ Registered successfully!";
        authForm.reset();
      } else {
        authStatus.textContent = "❌ Registration failed.";
      }
    } else {
      // Login: Check if email exists in SheetDB
      const res = await fetch(
        `https://sheetdb.io/api/v1/YOUR_SHEETDB_API/search?email=${email}`
      );
      const users = await res.json();

      if (users.length && users[0].password === password) {
        authStatus.textContent = "✅ Logged in successfully!";
      } else {
        authStatus.textContent = "❌ Invalid credentials.";
      }
    }
  });
});
