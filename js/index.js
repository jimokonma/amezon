const addToCartBtns = document.querySelectorAll(".product button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const spinnerContainer = document.querySelector(".spinner-container");
const loginBtn = document.querySelector(".login-btn");

const handleAddToCartClick = () => {
  modal.style.display = "block";
};

const handleCloseModalClick = () => {
  modal.style.display = "none";
  loginForm.reset();
};

const handleLoginFormSubmit = async (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Show spinner
  spinnerContainer.style.display = "block";
  loginBtn.disabled = true;

  try {
    const response = await fetch(
      "https://cadet-rivo.onrender.com/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert(
        "Your product will be sent to you soon. Check your email for more details."
      );
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    alert("Something went wrong.");
  } finally {
    // Hide spinner
    spinnerContainer.style.display = "none";
    loginBtn.disabled = false;
  }
};

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", handleAddToCartClick);
});

closeBtn.addEventListener("click", handleCloseModalClick);

loginForm.addEventListener("submit", handleLoginFormSubmit);
