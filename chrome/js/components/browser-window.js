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

        .url-bar-input {
          flex: 1;
          border: none;
          border-radius: 5px;
          padding: 0 10px;
          background-color: #3a3a3a;
          color: #ccc;
        }

        webview {
          width: 100%;
          flex: 1;
        }
      </style>
      <menu class="browser-toolbar">
        <form class="url-bar">
          <input type="text" class="url-bar-input" value="google.com" disabled>
        </form>
      </menu>
      <webview class="browser-window-webview" src="https://google.com"></webview>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.webview = this.shadowRoot.querySelector('webview');
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

  }

  /**
   * Remove event listeners when element disconnected from DOM.
   */
  disconnectedCallback() {

  }
}

// Register custom element
customElements.define('browser-window', BrowserWindow);