import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-cta': ['mj-column', 'mj-button', 'mj-image', 'mj-wrapper'],
  'row-buttons': ['mj-cta'],
})

export default class MjCTA extends BodyComponent {
  static endingTag = true
  /*
    We could obviously handle all the attributes accepted for Mj Section,
    Column, Image and Text, but let's keep it simple for this example.
  */
  static allowedAttributes = {
    href: 'string',
    text: 'string',
    width: 'string',
    fleche: 'string'
  }

  static defaultAttributes = {
    href: 'https://www.ca-briepicardie.fr',
    text: 'Prendre RDV',
    'background-color': '#E3E9EC',
    width: '80%',
    fleche: 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/fleche_vert.gif'
  }

  ga(str) {
    return this.getAttribute(str);
  }

  render() {
    return this.renderMJML(`
        
        <mj-group background-color="${this.ga('background-color')}" vertical-align="middle" padding="0 4px" width="${this.ga('width')}" class="button-cta">
          <mj-column
            width="83%"
            padding="0"
            vertical-align="middle">
            <mj-button 
              href="${this.ga('href')}"
              title="${this.ga('text')}"
              border-radius="0"
              background-color="none"
              color="#1F8D9D"
              font-weight="bold"
              text-transform="uppercase"
              padding="4px 3px">
              ${this.ga('text')}
            </mj-button>
          </mj-column>
          <mj-column
            width="14%"
            padding="0"
            color="#1F8D9D"
            vertical-align="middle">
            <mj-button 
              href="${this.ga('href')}"
              title="${this.ga('text')}"
              border-radius="0"
              background-color="none"
              color="#1F8D9D"
              padding="0"
              inner-padding="0"
              font-weight="bold"
              text-transform="uppercase"
              text-align="right">
              <img src="${this.ga('fleche')}" height="49px" width="29px" />
            </mj-button>
          </mj-column>
        </mj-group>
    `)
  }
}
