const tweetText = document.getElementById('tweetText');
const charLabel = document.getElementById('charLabel');
const tweetButton = document.getElementById('tweetButton');
const tweetFeed = document.getElementById('tweetFeed');
const tweetTemplate = document.getElementById('tweetTemplate');

const MAX_CHARS = 160;

function validateTweet() {
  const length = tweetText.value.length;
  const remaining = MAX_CHARS - length;

  if (remaining < 0) {
    tweetButton.disabled = true;
    charLabel.textContent = `Limit exceeded by ${-remaining} characters (max 160).`;
    charLabel.style.color = 'red';
  } else {
    tweetButton.disabled = length === 0; 
    charLabel.textContent = `${remaining} characters remaining`;
    charLabel.style.color = '#536471';
  }
}

function handleInput() {
  validateTweet();
}

function postTweet() {
    const text = tweetText.value.trim();
    if (text.length === 0 || text.length > MAX_CHARS) {
        return;
    }

    const clone = tweetTemplate.content.cloneNode(true);
    const textElement = clone.querySelector('.tweet-text');
    const timeElement = clone.querySelector('.time');

    textElement.textContent = text;

    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).replace(',', '');
    timeElement.textContent = `· ${dateTime}`;

    tweetFeed.insertBefore(clone, tweetFeed.firstChild);

    tweetText.value = '';
    validateTweet();
}


tweetText.addEventListener('input', handleInput);
tweetButton.addEventListener('click', postTweet);

// Initial state on page load
validateTweet();

