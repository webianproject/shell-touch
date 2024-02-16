/**
 * Window Switcher.
 * 
 * The UI element used for switching between windows.
 */
const WindowSwitcher = {
  /**
   * Start the window switcher.
   */
  start: function() {
    console.log('Starting window switcher...');
    this.view = document.getElementById('window-switcher-view');
  },

  /**
   * Show the window switcher.
   */
  show: function() {
    this.view.classList.remove('hidden');
  },

  /**
   * Hide the window switcher.
   */
  hide: function() {
    this.view.classList.add('hidden');
  }
}