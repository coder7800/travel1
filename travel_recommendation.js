const resultsContainer = document.getElementById("resultsContainer");

function createCard(item) {
    const card = document.createElement("div");
    card.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    card.style.borderRadius = "10px";
    card.style.padding = "15px";
    card.style.width = "300px"; // reduced width to ~finger size
    card.style.boxShadow = "0 0 10px white";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
  
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;
    img.style.width = "100%";
    img.style.borderRadius = "10px";
  
    const name = document.createElement("h3");
    name.textContent = item.name;
    name.style.marginTop = "10px";
    name.style.color = "#FFD700";
  
    const desc = document.createElement("p");
    desc.textContent = item.description;
    desc.style.textAlign = "center";
    desc.style.fontSize = "14px";
  
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(desc);
  
    resultsContainer.appendChild(card);
  }
  

function search() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  resultsContainer.innerHTML = "";

  if (!input) return;

  fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
      const results = [];

      if (input.includes("beach") || input.includes("beaches")) {
        results.push(...data.beaches);
      }

      if (input.includes("temple") || input.includes("temples")) {
        results.push(...data.temples);
      }

      data.countries.forEach(country => {
        if (input.includes(country.name.toLowerCase())) {
          results.push(...country.cities);
        }
      });

      if (results.length === 0) {
        resultsContainer.textContent = "No matching results found.";
      } else {
        results.forEach(item => createCard(item));
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      resultsContainer.textContent = "Error loading recommendations.";
    });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  resultsContainer.innerHTML = "";
}
