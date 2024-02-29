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

    window.addEventListener('_windowselected',
      this.handleWindowSelected.bind(this))

    // Set the clock going
    this.updateClock();
    window.setInterval(this.updateClock.bind(this), 1000);

    Homescreen.start();
    Windows.start();
    
    // Uncomment the following two lines to open developer tools for webview
    //this.homescreenWebview.addEventListener('dom-ready',
    //  e => { this.homescreenWebview.openDevTools(); });
  },

  /**
   * Handle a click on the back button.
   */
  handleBackButtonClick: function() {
    window.dispatchEvent(new CustomEvent('_backbuttonclicked'));
  },

  /**
   * Handle a click on the home button.
   */
  handleHomeButtonClick: function() {
    window.dispatchEvent(new CustomEvent('_homebuttonclicked'));
    this.newWindowMenuItem.classList.add('hidden');
    this.windowsMenuItem.classList.remove('hidden');
  },

  /**
   * Handle a click on the windows button.
   */
  handleWindowsButtonClick: function() {
    window.dispatchEvent(new CustomEvent('_windowsbuttonclicked'));
    this.windowsMenuItem.classList.add('hidden');
    this.newWindowMenuItem.classList.remove('hidden');
  },

  /**
   * Handle a click on the new window button.
   */
  handleNewWindowButtonClick: function() {
    window.dispatchEvent(new CustomEvent('_newwindowbuttonclicked'));
    this.newWindowMenuItem.classList.add('hidden');
    this.windowsMenuItem.classList.remove('hidden');
  },

  /**
   * Handle a window being selected.
   */
  handleWindowSelected: function() {
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