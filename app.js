const form = document.querySelector("#searchForm");
const resultsContainer = document.querySelector("#resultsContainer");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  console.log(searchTerm);
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  console.log(res);
  displayImages(res.data);
  form.elements.query.value = "";
});

const displayImages = (shows) => {
  // Clear previous results
  document.body.innerHTML = "";

  const resultsContainer = document.createElement("div");
  resultsContainer.style.display = "flex";
  resultsContainer.style.flexWrap = "wrap";
  resultsContainer.style.justifyContent = "center";
  resultsContainer.style.gap = "20px";
  document.body.appendChild(resultsContainer);

  for (let result of shows) {
    if (result.show.image) {
      const showDiv = document.createElement("div");
      showDiv.style.flex = "1 1 300px";
      showDiv.style.maxWidth = "300px";
      showDiv.style.boxSizing = "border-box";
      showDiv.style.border = "1px solid #ddd";
      showDiv.style.borderRadius = "8px";
      showDiv.style.padding = "10px";
      showDiv.style.textAlign = "center";
      showDiv.style.backgroundColor = "#333";
      showDiv.style.color = "#fff";

      // Image
      const img = document.createElement("img");
      img.src = result.show.image.medium;
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "8px";
      img.style.marginBottom = "10px";
      showDiv.appendChild(img);

      // Title
      const title = document.createElement("h3");
      title.innerText = result.show.name;
      title.style.fontSize = "1.25rem";
      title.style.marginBottom = "10px";
      showDiv.appendChild(title);

      // Rating
      const rating = document.createElement("p");
      rating.innerText = `Rating: ${result.show.rating.average || "N/A"}`;
      rating.style.margin = "5px 0";
      showDiv.appendChild(rating);

      // Country
      const country = document.createElement("p");
      country.innerText = `Country: ${
        result.show.network ? result.show.network.country.name : "N/A"
      }`;
      country.style.margin = "5px 0";
      showDiv.appendChild(country);

      // Genre
      const genre = document.createElement("p");
      genre.innerText = `Genre: ${
        result.show.genres.length > 0 ? result.show.genres.join(", ") : "N/A"
      }`;
      genre.style.margin = "5px 0";
      showDiv.appendChild(genre);

      resultsContainer.appendChild(showDiv);
    }
  }
};
