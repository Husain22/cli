const fs = require("fs").promises;
const args = process.argv.slice(2);

const topics = args[0];
const orient = args[1] || "portrait";

const apiUrl = `https://api.unsplash.com/photos/random?query=${topics?.join(
  "+"
)}&orientation=${orient}&client_id=upxAX6fescOdCVoNDVuEFJuzEYSC5eOZ_QWO9NwymYI`;

//uses Unsplash API to fetch and store images locally
async function fetchImages(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const imageUrl = data.urls.regular;
    //console.log(data);
    const fileName = `unsplash-${topics.join("+")}-${orient}-${Date.now()}.jpg`;
    const filePath = `./${fileName}`;

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(
        `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`
      );
    }
    const buffer = await imageResponse.buffer();
    await fs.writeFile(filePath, buffer);

    console.log(`Image saved to ${filePath}`);
  } catch (error) {
    console.error(error);
  }
}
console.log(apiUrl);
fetchImages(apiUrl);
