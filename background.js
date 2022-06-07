console.log('background.js');

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.currentTrelloCardLink) {
      openFloatingCard(request.currentTrelloCardLink);
      chrome.tabs.query({}, function (tabs) {
        chrome.tabs.sendMessage(tabs[tabs.length - 1], {eventId: 'trelloCardOpened'})
      });
    }
  },
);

const openFloatingCard = (cardUrl) => {
  const height = window.outerHeight;
  const width = window.outerWidth;
  const cardHeight = 600;
  const cardWidth = 600;
  // const cardHeight = height * 0.55;
  // const cardWidth = width * 0.5;
  const popupLeft = 100;
  const popupTop = 100;
  // const popupLeft = Math.floor(width * 0.15);
  // const popupTop = Math.floor(height * 0.15);
  return window.open(
    cardUrl,
    '_blank',
    `width=${cardWidth},
    height=${cardHeight},
    menubar=no,
    location=0,
    modal=yes,
    alwaysRaised=yes,
    status=no,
    toolbar=no,
    directories=no,
    dependent=yes,
    left=${popupLeft},
    top=${popupTop},
    scrollable=yes`,
  );
};
