/*
    커스텀 엘리먼트
    쉐도우돔
    슬롯 (or template)
    이용하여 Custom modal 작성
 */
class SimpleColor extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.activeClassName = "is-active";

    this.shadowRoot.innerHTML = `
        <div class="popup-wrap">
            <div class="popup-inbox">
                <h3 class="title">
                    <slot name="title"></slot>
                </h3>
                <div class="content">
                    <slot name="inbox"></slot>
                </div>
                <a href="#" class="btn-close"><i class="blind">close</i></a>
            </div>
        </div>
        
        <style>
            .popup-wrap {
                display: none;
                position: fixed;
                background-color: rgb(0, 0, 0);
                background-color: rgba(0, 0, 0, 0.4);
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
            }

            .popup-wrap.is-active {
                display: block;
            }

            .popup-inbox {
                position: relative;
                background-color: #efefef;
                margin: 10% auto;
                padding: 20px;
                width: 60%;
            }

            .btn-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 20px;
                height: 20px;
                background: url('https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/svg-layer-close.svg') no-repeat 0 0;
            }

            .blind {
                display: block;
                overflow: hidden;
                position: absolute !important;
                width: 1px;
                height: 1px;
                font-size: 1px;
                line-height: 1px;
                clip: rect(1px, 1px, 1px, 1px);
                }
        </style>
    `;
  }

  /**
   * 가상 트리가 document 에 연결된후 콜백
   */
  connectedCallback() {
    this.target = this.shadowRoot.querySelector(".popup-wrap");

    this.target
      .querySelector(".btn-close")
      .addEventListener("click", this.hide.bind(this));
  }

  /**
   * 가상 트리가 document 에서 연결 해제 된 후 콜백
   */
  disconnectedCallback() {
    this.target
      .querySelector(".btn-close")
      .removeEventListener("click", this.hide);
  }

  hide() {
    this.target.classList.remove(this.activeClassName);
  }

  show() {
    this.target.classList.add(this.activeClassName);
  }
}
customElements.define("simple-color", SimpleColor);
