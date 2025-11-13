feather.replace();

flatpickr("#dobInput", {
  dateFormat: "d/m/Y",
  altInput: true,
  altFormat: "j F Y",
  maxDate: "today",
  allowInput: false,
  disableMobile: true,
});

document.addEventListener("DOMContentLoaded", function () {
  const domicileSelect = new TomSelect("#domicile", {
    create: false,
    searchField: ["text"],
    placeholder: "Choose your domicile",
    sortField: { field: "text", direction: "asc" },
    dropdownParent: "body",
    maxOptions: 1000,
    render: {
      option: function (data, escape) {
        return `<div class="option-item">${escape(data.text)}</div>`;
      },
      item: function (data, escape) {
        return `<div class="selected-item">${escape(data.text)}</div>`;
      },
    },
    onItemAdd: function () {
      // Nonaktifkan input search setelah user memilih
      this.control_input.disabled = true;
      this.blur(); // Tutup dropdown
    },
    onClear: function () {
      // Jika user menghapus pilihan, aktifkan kembali input search
      this.control_input.disabled = false;
    },
  });
});

const jobTitle = localStorage.getItem("jobTitle");
const companyName = localStorage.getItem("companyName");
if (jobTitle && companyName) {
  document.querySelector(
    ".form-header h1"
  ).textContent = `Apply ${jobTitle} at ${companyName}`;
}

const profilePic = document.getElementById("profilePic");
const takePhotoBtn = document.getElementById("takePhoto");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const closeCamera = document.getElementById("closeCamera");
let stream;

takePhotoBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    cameraModal.classList.remove("hidden");
  } catch {
    alert("Camera access denied or unavailable.");
  }
});

captureBtn.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  profilePic.src = canvas.toDataURL("image/png");
  stopCamera();
  cameraModal.classList.add("hidden");
});

closeCamera.addEventListener("click", () => {
  stopCamera();
  cameraModal.classList.add("hidden");
});

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

const countrySelect = document.getElementById("countrySelect");
const countries = [
  { name: "Indonesia", code: "+62", flag: "https://flagcdn.com/w20/id.png" },
  { name: "Palestine", code: "+970", flag: "https://flagcdn.com/w20/ps.png" },
  { name: "Poland", code: "+48", flag: "https://flagcdn.com/w20/pl.png" },
  { name: "Portugal", code: "+351", flag: "https://flagcdn.com/w20/pt.png" },
  { name: "Puerto Rico", code: "+1", flag: "https://flagcdn.com/w20/pr.png" },
];

countries.forEach((c) => {
  const opt = document.createElement("option");
  opt.value = c.code;
  opt.textContent = c.name;
  countrySelect.appendChild(opt);
});

new TomSelect("#countrySelect", {
  create: false,
  searchField: ["text"],
  maxItems: 1,
  placeholder: "Select country",
  dropdownParent: "body",
  controlInput: null,
  render: {
    option: function (data, escape) {
      const country = countries.find((c) => c.name === data.text);
      return `
        <div class="option-item">
          <img src="${country.flag}" class="flag-icon" alt="">
          <span class="country-code">${escape(country.code)}</span>
        </div>`;
    },
    item: function (data, escape) {
      const country = countries.find((c) => c.name === data.text);
      return `
        <div class="item-selected">
          <img src="${country.flag}" class="flag-icon" alt="">
          <span class="country-code">${escape(country.code)}</span>
        </div>`;
    },
  },
});

const form = document.getElementById("applyForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  setTimeout(() => {
    window.location.href = "success.html";
  }, 700);
});

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});
