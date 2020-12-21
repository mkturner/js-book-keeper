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

// Handle Data from Form
function storeBookmark(e) {
    // preventDefault to stop page reload
    e.preventDefault();
    console.log(e);
}

// Bookmark event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// Close modal when user clicks outside form
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});
