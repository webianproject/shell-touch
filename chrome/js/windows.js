/**
 * Window Manager.
 * 
 * Manages app windows.
 */
const Windows = {
  /**
   * Start the window manager.
   */
  start: function() {
    console.log('Starting window manager...');
    this.view = document.getElementById('windows-view');
    this.windows = document.getElementById('windows');
  },

  /**
   * Show the window manager.
   */
  show: function() {
    this.view.classList.remove('hidden');
  },

  /**
   * Hide the window manager.
   */
  hide: function() {
    this.view.classList.add('hidden');
  },

  /**
   * Create a new browser window.
   */
  openNewWindow: function() {
    const newWindow = new BrowserWindow();
    if (this.currentWindow) {
      this.currentWindow.classList.add('hidden');
    }
    this.windows.appendChild(newWindow);
    this.currentWindow = newWindow;
  }
}