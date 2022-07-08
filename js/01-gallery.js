// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const galleryListRef = document.querySelector('.gallery');

const itemsList = galleryItems
    .map(({ original, preview, description }) => {
    return `<a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}"/>
    </a>`
    })
    .join("");
galleryListRef.insertAdjacentHTML("beforeend", itemsList);

console.log(itemsList);
console.log(galleryItems);
// <----------Modal------->
let modalWindow = new SimpleLightbox(
        '.gallery a', { captionsData: 'alt', captionDelay: 250 }
);
console.log(galleryItems);
