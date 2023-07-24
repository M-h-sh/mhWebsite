function toggleDarkMode() {
      const body = document.body;
      body.classList.toggle("dark-mode");
    }

    // Check if the user has dark mode preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply dark mode preference if detected
    if (prefersDarkMode) {
      toggleDarkMode();
    }

    // Dark mode switch event listener
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    darkModeSwitch.addEventListener("change", () => {
      toggleDarkMode();
    });
 





