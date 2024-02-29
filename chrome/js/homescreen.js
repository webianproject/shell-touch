/**
 * Home screen.
 */
const Homescreen = {

  HOME_PAGE: 'https://webian.org',

  /**
   * Start the home screen.
   */
  start: function() {
    console.log('Starting home screen...');
    this.view = document.getElementById('homescreen-view');
    this.webview = document.getElementById('homescreen-webview');
    window.addEventListener('_backbuttonclicked',
      this.handleBackButtonClicked.bind(this));
    window.addEventListener('_homebuttonclicked',
      this.handleHomeButtonClicked.bind(this));
    window.addEventListener('_windowsbuttonclicked', 
      this.handleWindowsButtonClicked.bind(this));
    this.webview.src = this.HOME_PAGE;
  },

  handleBackButtonClicked: function() {
    if(document.body.classList.contains('home')) {
      this.webview.goBack();
    }
  },

  handleHomeButtonClicked: function() {
    // If already on the homescreen then navigate to the home page
    if (document.body.classList.contains('home')) {
      this.webview.src = this.HOME_PAGE;
    // Otherwise just switch to the home screen
    } else {
      document.body.classList.add('home');
    }
  },

  handleWindowsButtonClicked: function() {
   document.body.classList.remove('home');
  }
}