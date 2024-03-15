/**
 * Browser Window.
 * 
 * A web component representing a window with a URL bar.
 */
class BrowserWindow extends HTMLElement {

  DEFAULT_FAVICON_URL = 'images/default-favicon.svg'

  currentFaviconUrl = this.DEFAULT_FAVICON_URL
  
  /**
   * Constructor.
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'open'});
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }

        :host(.hidden) {
          display: none;
        }

        .browser-toolbar {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 48px;
          background-color: #5d5d5d;
          margin: 0;
          padding: 8px;
          box-sizing: border-box;
        }

        .url-bar {
          flex: 1;
          display: flex;
          flex-direction: row;
          background-color: #3a3a3a;
          height: 32px;
          border-radius: 5px;
        }

        .url-bar.focused {
          background-color: #fff;
        }

        .favicon {
          width: 16px;
          height: 16px;
          padding: 8px;
        }

        .url-bar-input {
          flex: 1;
          border: none;
          border-radius: 5px;
          padding: 0 10px 0 0;
          background-color: transparent;
          color: #ccc;
        }

        .url-bar-input:focus {
          color: #000;
          outline: none;
        }

        .go-button, .stop-button, .reload-button {
          width: 32px;
          height: 32px;
          background-color: transparent;
          border: none;
          background-position: center;
          background-repeat: no-repeat;
        }

        .go-button:active, .reload-button:active, .stop-button:active {
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 5px;
        }

        .go-button {
          display: none;
          background-image: url('./images/go.svg');
        }

        .url-bar.focused .go-button {
          display: block;
        }

        .url-bar.focused.loading .go-button {
          display: none;
        }

        .stop-button {
          display: none;
          background-image: url('./images/stop.svg');
        }

        .url-bar.loading .stop-button {
          display: block;
        }

        .reload-button {
          display: block;
          background-image: url('./images/reload.svg');
        }

        .url-bar.focused .reload-button, .url-bar.loading .reload-button {
          display: none;
        }

        webview {
          width: 100%;
          flex: 1;
        }
      </style>
      <menu class="browser-toolbar">
        <form class="url-bar">
          <img src="${this.DEFAULT_FAVICON_URL}" class="favicon" />
          <input type="text" class="url-bar-input">
          <input type="submit" value="" class="go-button">
          <input type="button" value="" class="stop-button">
          <input type="button" value="" class="reload-button">
        </form>
      </menu>
      <webview class="browser-window-webview" src="https://duckduckgo.com/"></webview>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.webview = this.shadowRoot.querySelector('webview');
    this.urlBar = this.shadowRoot.querySelector('.url-bar');
    this.urlBarInput = this.shadowRoot.querySelector('.url-bar-input');
    this.reloadButton = this.shadowRoot.querySelector('.reload-button');
    this.favicon = this.shadowRoot.querySelector('.favicon');
  }

  /**
   * Get the URL of the currently loaded web page.
   * 
   * @returns {String} The URL of the currently loaded web page.
   */
  getUrl() {
    return this.webview.getURL();
  }

  /**
   * Get the URL of the favicon of the currently loaded web page.
   * 
   * @returns {String} The URL of the favicon of the current page (or default).
   */
  getFaviconUrl() {
    return this.currentFaviconUrl;
  }

  /**
   * Get the title of the currently loaded web page.
   * 
   * @returns {String} The title of the currently loaded web page.
   */
  getTitle() {
    return this.webview.getTitle();
  }

  /**
   * Add event listeners when element appended into document.
   */
  connectedCallback() {
    this.webview.addEventListener('will-navigate',
      this.handleLocationChange.bind(this));
    this.webview.addEventListener('did-navigate',
      this.handleLocationChange.bind(this));
    this.webview.addEventListener('did-navigate-in-page',
      this.handleInPageLocationChange.bind(this));
    this.webview.addEventListener('did-start-loading',
      this.handleStartLoading.bind(this));
    this.webview.addEventListener('did-stop-loading',
      this.handleStopLoading.bind(this));
    this.webview.addEventListener('page-favicon-updated',
      this.handleFaviconUpdated.bind(this));
    this.urlBarInput.addEventListener('focus',
      this.handleUrlBarFocus.bind(this));
    this.urlBarInput.addEventListener('blur',
      this.handleUrlBarBlur.bind(this));
    this.urlBar.addEventListener('submit',
      this.handleUrlBarSubmit.bind(this));
    this.reloadButton.addEventListener('click',
      this.handleReloadButtonClick.bind(this));
  }

  /**
   * Remove event listeners when element disconnected from DOM.
   */
  disconnectedCallback() {

  }

  /**
   * Navigate the window back to the previous URL.
   */
  goBack() {
    this.webview.goBack();
  }

  /**
   * Handle a navigation to a new page.
   * 
   * @param {Event} event The will-navigate or did-navigate event. 
   */
  handleLocationChange(event) {
    // Compare old hostname with new hostname
    let oldHostname;
    try {
      oldHostname = new URL(this.currentUrl).hostname;
    } catch (error) {
      oldHostname = '';
    }
    let newHostname;
    try {
      newHostname = new URL(event.url).hostname;
    } catch (error) {
      newHostname = '';
    }
    this.currentUrl = event.url;
    // If switching to another host, reset the favicon so that the old favicon
    // doesn't get displayed for the new host
    if (newHostname !== oldHostname) {
      this.currentFaviconUrl = this.DEFAULT_FAVICON_URL;
      this.favicon.src = this.currentFaviconUrl;
    }
    this.urlBarInput.value = newHostname;
    this.urlBarInput.blur();
  }

  /**
   * Handle an in-page navigation.
   * 
   * @param {Event} event event The did-navigate-in-page event.
   */
  handleInPageLocationChange(event) {
    // Can assume hostname won't change
    this.currentUrl = event.url;
    this.urlBarInput.blur();
  }

  /**
   * Handle the URL bar being focused.
   * 
   * Show full URL and select all.
   */
  handleUrlBarFocus() {
    this.urlBar.classList.add('focused');
    this.urlBarInput.value = this.currentUrl;
    this.urlBarInput.select();
  }

  /**
   * Handle the URL bar losing focus.
   * 
   * Show hostname.
   */
  handleUrlBarBlur() {
    this.urlBar.classList.remove('focused');
    let hostname;
    try {
      hostname = new URL(this.currentUrl).hostname;
    } catch (error) {
      hostname = '';
    }
    this.urlBarInput.value = hostname;
  }

  /**
   * Handle the submission of the URL bar.
   * 
   * @param {Event} event The submit event.
   * @returns null.
   */
  handleUrlBarSubmit(event) {
    event.preventDefault();
    let urlInput = this.urlBarInput.value;
    let url;
    // Check for a valid URL
    try {
      url = new URL(urlInput).href;
    } catch {
      try {
        url = new URL('http://' + urlInput).href;
      } catch {
        return;
      }
    }
    // Manually set URL bar (navigation may not succeed or may redirect)
    this.currentUrl = url;
    // Navigate
    this.webview.loadURL(url);
    // Unfocus the URL bar
    this.urlBarInput.blur();
  }

  /**
   * Handle the webview starting loading.
   */
   handleStartLoading() {
    this.urlBar.classList.add('loading');
  }

  /**
   * Handle the webview stopping loading.
   */
  handleStopLoading() {
    this.urlBar.classList.remove('loading');
  }

  /**
   * Handle an update of the page's favicon.
   * 
   * @param {Event} event The page-favicon-updated event. 
   */
  handleFaviconUpdated(event) {
    // Get the last icon in the array
    let iconUrl = event.favicons.slice(-1) || this.DEFAULT_FAVICON_URL;
    this.currentFaviconUrl = iconUrl;
    this.favicon.src = iconUrl;
  }

  /**
   * Handle a click on the reload button.
   */
  handleReloadButtonClick() {
    this.webview.reload();
  }

}

// Register custom element
customElements.define('browser-window', BrowserWindow);