// Function to be called on document load and button click
document.addEventListener('DOMContentLoaded', generateRandomAyat);
document.getElementById('generate-btn').addEventListener('click', generateRandomAyat);

function generateRandomAyat() {
    const totalAyats = 6236; // Defining the total number of Ayats in the Quran

    // Generating a random Ayat number
    const randomAyatNumber = Math.floor(Math.random() * totalAyats) + 1;

    // Constructing the URL to fetch a random Ayat along with its translation
    const apiUrl = `https://api.alquran.cloud/v1/ayah/${randomAyatNumber}/editions/quran-simple,en.asad`;

    // Fetching the Ayat and its translation
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                // Extracting and displaying the Arabic text, translation, and Surah information
                const arabicText = data.data[0].text;
                const translationText = data.data[1].text;
                const surahName = `${data.data[0].surah.englishName} (${data.data[0].surah.number}), Ayat ${data.data[0].numberInSurah}`;

                document.querySelector('.ayat-text').textContent = arabicText;
                document.querySelector('.ayat-translation').textContent = `Translation: ${translationText}`;
                document.querySelector('.surah-name').textContent = surahName;
            }
        })
        .catch(error => console.error('Error fetching Ayat:', error)); // Handling any errors that occur during the fetch operation
}
