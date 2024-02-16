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
  },

  /**
   * Show the home screen.
   */
  show: function() {
    this.view.classList.remove('hidden');
  },

  /**
   * Hide the home screen.
   */
  hide: function() {
    this.view.classList.add('hidden');
  },

  /**
   * Navigate to the given URL.
   */
  goHome: function() {
    this.webview.src = this.HOME_PAGE;
  },

  /**
   * Navigate to the last page in history.
   */
  goBack: function() {
    this.webview.goBack();
  },
}