const electron = require('electron');

/**
 * System chrome loaded inside the top level window.
 */
const Chrome = {

  HOME_PAGE: 'https://webian.org',

  /**
   * Start chrome.
   */
  start: async function() {
    console.log('Starting chrome...');
    this.clock = document.getElementById('clock');
    this.webview = document.getElementById('webview');
    this.homeButton = document.getElementById('home-button');
    this.backButton = document.getElementById('back-button');

    this.homeButton.addEventListener('click',
      this.handleHomeButtonClick.bind(this));
    this.backButton.addEventListener('click', 
      this.handleBackButtonClick.bind(this));

    // Navigate to home page
    this.navigate(this.HOME_PAGE);

    // Set the clock going
    this.updateClock();
    window.setInterval(this.updateClock.bind(this), 1000);

    // Uncomment the following two lines to open developer tools for webview
    //this.webview.addEventListener('dom-ready',
    //  e => { this.webview.openDevTools(); });
  },

  /**
   * Navigate to the given URL.
   * 
   * @param {string} url URL to navigate to.
   */
  navigate: function(url) {
    this.webview.src = url;
  },

  /**
   * Handle a click on the home button.
   */
  handleHomeButtonClick: function() {
    this.navigate(this.HOME_PAGE);
  },

  /**
   * Handle a click on the back button.
   */
  handleBackButtonClick: function() {
    this.webview.goBack();
  },

  /**
   * Update Clock.
   */
  updateClock: function() {
    var date = new Date(),
    hours = date.getHours() + '', // get hours as string
    minutes = date.getMinutes() + ''; // get minutes as string

    // pad with zero if needed
    if (hours.length < 2)
      hours = '0' + hours;
    if (minutes.length < 2)
      minutes = '0' + minutes;

    this.clock.textContent = hours + ':' + minutes;
  }
}

/**
  * Start chrome on load.
  */
window.addEventListener('load', function chrome_onLoad() {
  window.removeEventListener('load', chrome_onLoad);
  Chrome.start();
});