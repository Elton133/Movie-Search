const form = document.querySelector("#searchForm");
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
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      document.body.append(img);
    }

    const title = document.createElement("h3");
    title.innerText = result.show.name;
    document.body.append(title);

    const rating = document.createElement("p");
    rating.innerText = `Rating: ${result.show.rating.average || "N/A"}`;
    document.body.append(rating);

    const country = document.createElement("p");
    country.innerText = `Country: ${
      result.show.network ? result.show.network.country.name : "N/A"
    }`;
    document.body.append(country);

    const genre = document.createElement("p");
    genre.innerText = `Genre: ${
      result.show.genres.length > 0 ? result.show.genres.join(", ") : "N/A"
    }`;
    document.body.append(genre);
  }
};
