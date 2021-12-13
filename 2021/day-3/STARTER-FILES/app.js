const whiteKeys = document.querySelectorAll('path.white-keys');
const blackKeys = document.querySelectorAll('path.black-keys');
const allKeys = [...whiteKeys, ...blackKeys];

allKeys.forEach((key, i) => {
  key.dataset.index = i + 1;
  key.addEventListener('click', (e) => {
    const note = new Audio(`./audio/key-${e.target.dataset.index}.mp3`);
    note.play();
    console.log(note);
  });
});
