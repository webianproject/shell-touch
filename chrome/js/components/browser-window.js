/**
 * Browser Window.
 * 
 * A web component representing a window with a URL bar.
 */
class BrowserWindow extends HTMLElement {
  
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

        .url-bar-input {
          flex: 1;
          border: none;
          border-radius: 5px;
          padding: 0 10px;
          background-color: transparent;
          color: #ccc;
        }

        .url-bar-input:focus {
          color: #000;
          outline: none;
        }

        .go-button {
          width: 32px;
          height: 32px;
          background-color: transparent;
          border: none;
          background-image: url('./images/go.svg');
          background-position: center;
          background-repeat: no-repeat;
        }

        .go-button:active {
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 5px;
        }

        webview {
          width: 100%;
          flex: 1;
        }
      </style>
      <menu class="browser-toolbar">
        <form class="url-bar">
          <input type="text" class="url-bar-input">
          <input type="submit" value="" class="go-button">
        </form>
      </menu>
      <webview class="browser-window-webview" src="https://google.com"></webview>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.webview = this.shadowRoot.querySelector('webview');
    this.urlBar = this.shadowRoot.querySelector('.url-bar');
    this.urlBarInput = this.shadowRoot.querySelector('.url-bar-input');
  }

  /**
   * Get the URL of the currently loaded web page.
   * 
   * @returns {String} The URL of the currently loaded web page.
   */
  getURL() {
    return this.webview.getURL();
  }

  /**
   * Add event listeners when element appended into document.
   */
  connectedCallback() {
    this.webview.addEventListener('did-navigate',
      this.handleLocationChange.bind(this));
    this.webview.addEventListener('did-navigate-in-page',
      this.handleInPageLocationChange.bind(this));
    this.urlBarInput.addEventListener('focus',
      this.handleUrlBarFocus.bind(this));
    this.urlBarInput.addEventListener('blur',
      this.handleUrlBarBlur.bind(this));
    this.urlBar.addEventListener('submit',
      this.handleUrlBarSubmit.bind(this));
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
   * @param {Event} event The did-navigate event. 
   */
  handleLocationChange(event) {
    this.currentUrl = event.url;
    let hostname;
    try {
      hostname = new URL(event.url).hostname;
    } catch (error) {
      hostname = '';
    }
    this.urlBarInput.value = hostname;
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
}

// Register custom element
customElements.define('browser-window', BrowserWindow);