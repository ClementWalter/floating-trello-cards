let currentTrelloCardLink;
// let popupCard;

$(window).on('load', function () {
  $("html").on("mouseenter", "a", function () {
    currentTrelloCardLink = $(this).prop('href');
  });

  $('.list-card-details').click((e) => {
    if (e.metaKey) {
      e.preventDefault();
      chrome.runtime.sendMessage({currentTrelloCardLink});
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)
  console.log(sender)
  if (request.eventId === 'trelloCardOpened') {
    debugger
    window.onload = function() {
      clearDom(window)
    }
  }
});

const clearDom = (cardWindow) => {
  const popupDocument = cardWindow.document;

  console.log(popupDocument);
  const classicBody = popupDocument.getElementById('classic-body');
  classicBody.style.backgroundImage = '';

  const boardDrawer = popupDocument.getElementById('boards-drawer');
  boardDrawer.parentNode.removeChild(boardDrawer);

  const surface = popupDocument.getElementById('surface');
  surface.parentNode.removeChild(surface);

  const windowOverlay = popupDocument.getElementsByClassName('window-overlay')[0];
  windowOverlay.style.backgroundColor = null;
  windowOverlay.style.justifyContent = null;

  const card = popupDocument.getElementsByClassName('window')[0];
  card.style.margin = 0;
  card.style.width = '100%';
};
