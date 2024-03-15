const { v4: uuidv4 } = require('uuid');

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
    this.windowSwitcher = document.getElementById('window-switcher');
    this.windowsElement = document.getElementById('windows');
    this.windowPreviewsElement = document.getElementById('window-previews');
    this.windowPreviewPlaceholder = document.getElementById('window-preview-placeholder');

    window.addEventListener('_backbuttonclicked',
      this.handleBackButtonClicked.bind(this));
    window.addEventListener('_windowsbuttonclicked', 
      this.handleWindowsButtonClicked.bind(this));
    window.addEventListener('_newwindowbuttonclicked', 
      this.handleNewWindowButtonClicked.bind(this));

    this.windowPreviewsElement.addEventListener('click', 
      this.handleWindowPreviewClicked.bind(this));
    this.windowPreviewsElement.addEventListener('_closewindowbuttonclicked', 
      this.handleCloseWindowButtonClicked.bind(this));

    // The collection of open windows
    this.windows = new Map();

    // The collection of window previews in the window switcher
    this.windowPreviews = new Map();
  },

  /**
   * Show the windows view.
   */
  show: function() {
    this.view.classList.remove('hidden');
  },

  /**
   * Hide the windows view.
   */
  hide: function() {
    this.view.classList.add('hidden');
  },

  /**
   * Show the window switcher and hide windows.
   */
  showWindowSwitcher: function() {
    // Start from fresh each time
    this.windowPreviewsElement.innerHTML = '';
    this.windowPreviews.clear();

    this.windowsElement.classList.add('hidden');
    if (this.windows.size === 0) {
      this.windowPreviewPlaceholder.classList.remove('hidden');
      return;
    }
    this.windowPreviewPlaceholder.classList.add('hidden');
    this.windows.forEach((value, key, map) => {
      const title = value.element.getTitle();
      const newWindowPreview = this.windowPreviewsElement.appendChild(new WindowPreview(key, title));
      newWindowPreview.dataset.windowId = key;

      // Store the window preview element in a map of window previews
      this.windowPreviews.set(key, {
        element: newWindowPreview
      });
    });
    this.windowPreviewsElement.classList.remove('hidden');
    this.windowSwitcher.classList.remove('hidden');
    // Reset the scroll position of the window previews element
    this.windowPreviewsElement.scrollTo(0, 0);
    // Scroll to the preview of the current window if one is selected
    if(this.currentWindowId) {
      let x = this.windowPreviews.get(this.currentWindowId).element.getBoundingClientRect().x;
      this.windowPreviewsElement.scrollTo(x, 0);
    }
    },

  /**
   * Hide the window switcher and show windows.
   */
  hideWindowSwitcher: function() {
    this.windowSwitcher.classList.add('hidden');
    this.windowsElement.classList.remove('hidden');
  },

  /**
   * Handle a click on the system back button.
   */
  handleBackButtonClicked: function() {
    // If the user is on the homescreen or no windows are open, ignore.
    if(document.body.classList.contains('home') || !this.currentWindowId) {
      return;
    }

    // Otherwise navigate the current window back
    let currentWindow = this.windows.get(this.currentWindowId);
    currentWindow.element.goBack();
  },

  /**
   * Handle a click on the windows button.
   */
  handleWindowsButtonClicked: function() {
    this.show();
    this.showWindowSwitcher();
  },

  /**
   * Handle a click on the new window button. 
   */
  handleNewWindowButtonClicked: function() {
    const newWindowId = uuidv4();
    const newWindow = this.windowsElement.appendChild(new BrowserWindow());
    newWindow.id = newWindowId;
    this.windows.set(newWindowId, {
      element: newWindow
    });
    this.selectWindow(newWindowId);
  },


  /**
   * Handle a click on the window previews element.
   * 
   * @param {Event} event The click event.
   */
  handleWindowPreviewClicked: function(event) {
    const target = event.target;
    if(target.tagName != 'WINDOW-PREVIEW') {
      return;
    }
    this.selectWindow(target.dataset.windowId);
  },

  /**
   * Handle a close window button click from a window preview.
   * 
   * @param {Event} event The _closewindowbuttonclicked event. 
   */
  handleCloseWindowButtonClicked: function(event) {
    this.closeWindow(event.detail.windowId);
  },

  /**
   * Select a window.
   * 
   * @param {String} id The UUID of the window to select.
   */
  selectWindow: function(id) {
    if (this.currentWindowId) {
      this.windows.get(this.currentWindowId).element.classList.add('hidden');
    }
    this.windows.get(id).element.classList.remove('hidden');
    this.currentWindowId = id;
    this.hideWindowSwitcher();
    window.dispatchEvent(new CustomEvent('_windowselected'));
  },

  /**
   * Close a window. 
   * 
   * @param {String} id The ID of the window to close. 
   */
  closeWindow: function(id) {
    // Destroy the specified window
    let windowToRemove = document.getElementById(id);
    windowToRemove.remove();
    this.windows.delete(id);
    this.windowPreviews.delete(id);
    this.currentWindowId = null;

    // If no more windows then show placeholder
    if (this.windows.size === 0) {
      this.windowPreviewsElement.classList.add('hidden');
      this.windowPreviewPlaceholder.classList.remove('hidden');
    }
  }
}