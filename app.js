const form = document.querySelector("#searchForm");
const button = document.querySelector(".submit");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  console.log(searchTerm);
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  console.log(res);
  //   console.log(res.data[0].show.image.medium);
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
  }
};
