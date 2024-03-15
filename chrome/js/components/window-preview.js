/**
 * Window Preview.
 * 
 * A web component representing a preview of a window in the window switcher.
 */
class WindowPreview extends HTMLElement {
  
  /**
   * Constructor.
   * 
   * @param {String} title A title to show in the title bar.
   * @param {String} iconUrl The URL of a favicon URL to show in the title bar.
   */
  constructor(windowId, title, iconUrl) {
    super();

    // The ID of the window of which this is a preview
    this.windowId = windowId;

    this.attachShadow({ mode: 'open'});
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .title-bar {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 40px;
          background-color: #474747;
          padding: 0;
          margin: 0;
        }

        .favicon {
          width: 16px;
          height: 16px;
          padding: 12px;
        }

        .title-bar h1 {
          flex: 1;
          font-size: 12px;
          color: #fff;
          line-height: 40px;
          margin: 0;
          padding: 0;
          font-weight: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .close-button {
          width: 40px;
          height: 40px;
          background-color: transparent;
          background-image: url('images/close.svg');
          background-size: 12px;
          background-position: center;
          background-repeat: no-repeat;
          border: none;
        }

        .close-button:active {
          background-color: rgba(0, 0, 0, 0.15);
        }

        .window-thumbnail {
          flex: 1;
          width: 100%;
          background-color: #5d5d5d;
        }
      </style>
      <menu class="title-bar">
        <img src="${iconUrl}" class="favicon" />
        <h1 class="title-bar-heading">${title}</h1>
        <button class="close-button">
      </menu>
      <div class="window-thumbnail">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.closeButton = this.shadowRoot.querySelector('.close-button');
    this.favicon = this.shadowRoot.querySelector('.favicon');
  }

  /**
   * Add event listeners when element appended into document.
   */
  connectedCallback() {
    this.closeButton.addEventListener('click', this.handleCloseWindowButtonClicked.bind(this));
  }

  /**
   * Remove event listeners when element disconnected from DOM.
   */
  disconnectedCallback() {

  }

  /**
   * Handle a click on the close button.
   * 
   * @param {Event} event The click event.
   */
  handleCloseWindowButtonClicked(event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('_closewindowbuttonclicked', {
      detail: {
        windowId: this.windowId
      },
      bubbles: true
    }));
    // Self destruct
    this.remove();
  }
}

// Register custom element
customElements.define('window-preview', WindowPreview);