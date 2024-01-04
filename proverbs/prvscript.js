import data from "../Resources/verses.json" assert { type: "json" };

function getChapterData(chapterNumber) {
    return data[chapterNumber];
}

function generateChapterButtons() {
    const buttonHolder = document.querySelector(".c-container");

    data.forEach((chapter) => {
        const chapterNumber = chapter.chapter;

        const buttonElement = document.createElement("button");

        buttonElement.textContent = chapterNumber;
        buttonElement.classList.add("btn");
        buttonHolder.appendChild(buttonElement);

        buttonElement.addEventListener("click", () => {
            const verseHolder = document.querySelector(".verse-container");
            verseHolder.innerHTML = '';

            const currentChapter = getChapterData(chapterNumber - 1);

            const textVersesArray = currentChapter.verses;
            textVersesArray.forEach((verseData) => {
                const pElement = document.createElement("p");
                pElement.innerHTML = `<strong>Verse ${verseData.verse}:</strong><br>${verseData.text}`;
                verseHolder.appendChild(pElement);
                pElement.classList.add("versesHolder");
            });
        });
    });
}

const searchInput = document.querySelector(".myInput");
const verseContainer = document.querySelector(".verse-container");

searchInput.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();

    verseContainer.innerHTML = "";

    const matchingVerses = data.filter((chapter) =>
        chapter.verses.some((verse) => verse.keywords.includes(inputValue))
    );

    matchingVerses.forEach((chapter) => {
        chapter.verses.forEach((verse) => {
            if (verse.keywords.includes(inputValue)) {
                const pElement = document.createElement("p");
                pElement.innerHTML = `<strong>Chapter ${chapter.chapter}, Verse ${verse.verse}:</strong><br>${verse.text}`;
                verseContainer.appendChild(pElement);
            }
        });
    });
});

generateChapterButtons();
