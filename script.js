const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteName = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show Modal, Focus on 1st input
function showModal() {
  modal.classList.add('show-modal');
  websiteName.focus;
}

// Modal Event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);

// Validate Form
function validate(name, url) {
    const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expr);

    if (url.match(regex)) {
        alert('match');
        return true;
    } else {
        alert('Please provide a valid web address')
        return false;
    }
}

// Handle Data from Form
function storeBookmark(e) {
    // preventDefault to stop page reload
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteURL.value;
    if (!urlValue.includes('http://', 'https://')) {
      urlValue = `https://${urlValue}`;
    }
    console.log(nameValue, urlValue);
    validate(nameValue, urlValue);
}

// Bookmark event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// Close modal when user clicks outside form
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});
