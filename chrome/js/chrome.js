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
    this.webview = document.getElementById('webview');
    this.homeButton = document.getElementById('home-button');
    this.homeButton.addEventListener('click',
      this.handleHomeButtonClick.bind(this));

    // Navigate to home page
    this.navigate(this.HOME_PAGE);

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
  }
}

/**
  * Start chrome on load.
  */
window.addEventListener('load', function chrome_onLoad() {
  window.removeEventListener('load', chrome_onLoad);
  Chrome.start();
});