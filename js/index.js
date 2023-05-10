// Add to Cart Button Click Event
const addToCartBtns = document.querySelectorAll(".product button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

// Close Modal Button Click Event
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  loginForm.reset();
});

// Login Form Submit Event
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Check if email and password are valid
  if (email.trim() !== "" && password.trim() !== "") {
    // Send email and password to server-side script
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Show success message and close modal
        alert(
          "Login successful! Product added to cart. More information will be sent to your email."
        );
        modal.style.display = "none";
        loginForm.reset();
      }
    };
    xhttp.open("POST", "/save", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ email, password }));
  } else {
    // Show error message
    alert("Please enter a valid email and password.");
  }
});
