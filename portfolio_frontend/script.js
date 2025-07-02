const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  sunIcon.classList.toggle('active', !isDark);
  moonIcon.classList.toggle('active', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ✅ Set theme from saved preference (or default to light)
const savedTheme = localStorage.getItem('theme');
setMode(savedTheme === 'dark');

// ✅ Toggle on click
themeToggle.addEventListener('click', () => {
  const isCurrentlyDark = document.body.classList.contains('dark-mode');
  setMode(!isCurrentlyDark);
});


/* contact*/
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    });

document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill out all fields before submitting.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert("✅ Thank you for reaching out! I’ll get back to you soon.");
      this.reset(); // Clear the form
      document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => input.classList.remove('filled'));
    } else {
      const errorData = await response.json();
      alert("❌ Error: " + errorData.error);
    }
  } catch (error) {
    alert("❌ Failed to send. Please try again later.");
    console.error('Error:', error);
  }
});
