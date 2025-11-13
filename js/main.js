const jobs = [
  {
    title: "UX Designer",
    company: "Rakamin",
    location: "Jakarta Selatan",
    salary: "Rp7.000.000 - Rp15.000.000",
    type: "Full-Time",
    description: [
      "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.",
      "Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.",
      "Integrate front-end components with APIs and backend services.",
      "Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.",
      "Write clean, reusable, and maintainable code following best practices and coding standards.",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Rakamin",
    location: "Jakarta Selatan",
    salary: "Rp10.000.000 - Rp20.000.000",
    type: "Full-Time",
    description: [
      "Build and maintain scalable, reusable front-end components.",
      "Collaborate with designers and backend engineers for seamless UI/UX.",
      "Write clean and efficient code following best practices.",
      "Optimize web applications for maximum speed and performance.",
      "Participate in Agile processes, sprint planning, and retrospectives.",
    ],
  },
];

function showDetails(index) {
  const job = jobs[index];
  document
    .querySelectorAll(".job-card")
    .forEach((card) => card.classList.remove("active"));
  document.querySelectorAll(".job-card")[index].classList.add("active");
  const detailContainer = document.getElementById("job-details");
  detailContainer.classList.remove("empty");
  detailContainer.innerHTML = `
    <div class="job-details-card">
      <div class="details-header">
        <div class="details-left">
          <img src="img/img5.jpg" alt="Rakamin Logo" class="details-logo" />
          <div class="details-text">
            <span class="status">${job.type}</span>
            <h2>${job.title}</h2>
            <p class="company-name">${job.company}</p>
          </div>
        </div>
        <button class="apply-btn" data-title="${job.title}" data-company="${
    job.company
  }">Apply</button>
      </div>
      <hr class="divider" />
      <div class="description-section">
        <ul>${job.description.map((d) => `<li>${d}</li>`).join("")}</ul>
      </div>
    </div>
  `;
  feather.replace();
  const applyBtn = detailContainer.querySelector(".apply-btn");
  applyBtn.addEventListener("click", () => {
    localStorage.setItem("jobTitle", job.title);
    localStorage.setItem("companyName", job.company);
    window.location.href = "applyform.html";
  });
}

const jobList = document.querySelector(".job-list");
jobList.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".job-card");
  if (!clickedCard) {
    document
      .querySelectorAll(".job-card")
      .forEach((card) => card.classList.remove("active"));
    const detailContainer = document.getElementById("job-details");
    detailContainer.innerHTML = "";
    detailContainer.classList.add("empty");
  }
});
