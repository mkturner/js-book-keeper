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

// Modal Event listener
modalShow.addEventListener('click', showModal);
