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
   */
  constructor(title) {
    super();

    this.attachShadow({ mode: 'open'});
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
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

        .title-bar h1 {
          flex: 1;
          font-size: 12px;
          color: #fff;
          line-height: 40px;
          margin: 0;
          padding: 0 0 0 16px;
          font-weight: normal;
        }

        .window-thumbnail {
          flex: 1;
          width: 100%;
          background-color: #5d5d5d;
        }
      </style>
      <menu class="title-bar">
        <h1 class="title-bar-heading">${title}</h1>
      </menu>
      <div class="window-thumbnail">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
customElements.define('window-preview', WindowPreview);