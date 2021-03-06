const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteName = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// array to hold bookmarks
let bookmarks = [];

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

    if (!name || !url) {
      alert('Please submit names for both fields.');
      return false;
    }

    if (!url.match(regex)) {
      alert('Please provide a valid web address.');
      return false;
    }

    return true;
}

// Manipulate DOM to show data from localStorage in UI
function restoreBookmarks() {
  // Remove all current bookmarks
  bookmarksContainer.textContent = '';
  //  Build items
  bookmarks.forEach((bookmark) => {
    // destructure data from object
    const { name, url } = bookmark;
    // Create elements
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon img
    const favIcon = document.createElement('img');
    favIcon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favIcon.setAttribute('alt', `${name} Favicon`);
    //  Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // append to bookmarks container
    linkInfo.append(favIcon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function getBookmarks() {
  // get only if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // create bookmarks array in localStorage
    bookmarks =[
      {
        name: 'goog',
        url: 'google.com',
      },
    ];
    // populate localStorage so it has SOME data, since empty
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  restoreBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
  console.log(`delete URL ${url}:`);
  bookmarks = bookmarks.filter(bmark => bmark.url != url);
  console.log(bookmarks);
  // Update bookmarks array in localStorage, repopulate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getBookmarks();
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
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  // make object from data and pass into bookmarks list
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  // print list of bookmarks to console for inspection
  // Save to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getBookmarks();
  // clear form for next entry
  bookmarkForm.reset();
  websiteName.focus();
}

// Bookmark event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// Close modal when user clicks outside form
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});

// On load get Bookmarks
getBookmarks();