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
    this.backButton = document.getElementById('back-button');
    this.homeButton = document.getElementById('home-button');
    this.windowsMenuItem = document.getElementById('windows-menu-item');
    this.windowsButton = document.getElementById('windows-button');
    this.newWindowMenuItem = document.getElementById('new-window-menu-item');
    this.newWindowButton = document.getElementById('new-window-button');

    this.backButton.addEventListener('click', 
      this.handleBackButtonClick.bind(this));   
    this.homeButton.addEventListener('click',
      this.handleHomeButtonClick.bind(this));
    this.windowsButton.addEventListener('click',
      this.handleWindowsButtonClick.bind(this));
    this.newWindowButton.addEventListener('click',
      this.handleNewWindowButtonClick.bind(this));

    // Set the clock going
    this.updateClock();
    window.setInterval(this.updateClock.bind(this), 1000);

    Windows.start();
    WindowSwitcher.start();
    Homescreen.start();

    // Show home page.
    Homescreen.goHome();
    Homescreen.show();

    // Uncomment the following two lines to open developer tools for webview
    //this.homescreenWebview.addEventListener('dom-ready',
    //  e => { this.homescreenWebview.openDevTools(); });
  },

  /**
   * Handle a click on the back button.
   */
  handleBackButtonClick: function() {
    Homescreen.goBack();
  },

  /**
   * Handle a click on the home button.
   */
  handleHomeButtonClick: function() {
    Windows.hide();
    WindowSwitcher.hide();
    Homescreen.show();
    Homescreen.goHome();
    this.newWindowMenuItem.classList.add('hidden');
    this.windowsMenuItem.classList.remove('hidden');
  },

  handleWindowsButtonClick: function() {
    Homescreen.hide();
    Windows.hide();
    WindowSwitcher.show();
    this.windowsMenuItem.classList.add('hidden');
    this.newWindowMenuItem.classList.remove('hidden');
  },

  handleNewWindowButtonClick: function() {
    Windows.openNewWindow();
    WindowSwitcher.hide();
    Windows.show();
    this.newWindowMenuItem.classList.add('hidden');
    this.windowsMenuItem.classList.remove('hidden');
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