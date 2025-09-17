const searchBtn = document.getElementById("searchBtn");
const phoneInput = document.getElementById("phoneInput");
const loadingArea = document.getElementById("loadingArea");
const resultArea = document.getElementById("resultArea");

const gradients = [
  "from-pink-500 to-yellow-500",
  "from-green-400 to-blue-500",
  "from-purple-500 to-pink-500",
  "from-orange-400 to-red-500",
  "from-blue-400 to-indigo-500"
];

searchBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    alert("⚠️ Please enter a phone number!");
    return;
  }

  resultArea.innerHTML = "";
  loadingArea.classList.remove("hidden");

  try {
    const res = await fetch(`https://api.impossible-world.xyz/api/data?phone=${phone}`);
    const data = await res.json();
    loadingArea.classList.add("hidden");

    if (data.records && data.records.length > 0) {
      data.records.forEach((record, i) => {
        const card = document.createElement("div");
        card.className = `p-5 rounded-xl text-white shadow-lg bg-gradient-to-r ${gradients[i % gradients.length]}`;

        card.innerHTML = `
          <p><strong>Name:</strong> ${record.Name || "N/A"}</p>
          <p><strong>Mobile:</strong> ${record.Mobile || "N/A"}</p>
          <p><strong>Country:</strong> ${record.Country || "N/A"}</p>
          <p><strong>CNIC:</strong> ${record.CNIC || "N/A"}</p>
          <p><strong>Address:</strong> ${record.Address || "N/A"}</p>
          <button class="mt-3 px-3 py-1 bg-black/30 rounded-lg text-sm copyBtn">Copy</button>
        `;
        resultArea.appendChild(card);
      });

      // Copy button
      document.querySelectorAll(".copyBtn").forEach(btn => {
        btn.addEventListener("click", () => {
          const text = btn.parentElement.innerText.replace("Copy", "").trim();
          navigator.clipboard.writeText(text);
          btn.innerText = "Copied!";
          setTimeout(() => btn.innerText = "Copy", 2000);
        });
      });

    } else {
      resultArea.innerHTML = `<p class="text-red-600 font-semibold text-center">❌ No record found.</p>`;
    }
  } catch (error) {
    loadingArea.classList.add("hidden");
    resultArea.innerHTML = `<p class="text-red-600 font-semibold text-center">⚠️ Error fetching data.</p>`;
  }
});