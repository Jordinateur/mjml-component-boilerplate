import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-header-conseiller': ['mj-column', 'mj-button', 'mj-image'],
  'mj-wrapper': ['mj-header-conseiller'],
  'mj-button': ['mj-image'],
})

export default class MjHeaderConseiller extends BodyComponent {
  static allowedAttributes = {
    'var-tel': 'string',
    'logo-tel': 'string',
    'var-agence': 'string',
    'logo-agence': 'string',
    'var-email': 'string',
    'logo-email': 'string',
    'logo-conseiller': 'string',
    'text-color': 'string'
  }

  static defaultAttributes = {
    'var-tel': '<<LIBELLE_60_4>>',
    'logo-tel': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/telproxi.png',
    'var-agence': '<<LIBELLE_60_10>>',
    'logo-agence': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/locaproxi.png',
    'var-email': '<<LIBELLE_60_5>>',
    'logo-email': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/emailproxi.png',
    'logo-conseiller': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/d_besoin_un.gif',
  }

  render() {
    return this.renderMJML(`
        <mj-section background-color="#99CC00" padding="0" text-align="left" class="header-conseiller">
          <mj-group>
          <mj-column background-color="#EDEDED" width="12%" vertical-align="middle">
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="tel:${this.getAttribute('var-tel')}">
                <img src="${this.getAttribute('logo-tel')}" />
            </mj-button >
            <mj-divider padding="2px" border-color="#fff"/>
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="https://www.ca-briepicardie.net/eds_agences.php?EDS=${this.getAttribute('var-agence')}">
                <img src="${this.getAttribute('logo-agence')}" />
            </mj-button>
            <mj-divider padding="2px" border-color="#fff"/>
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="mailto:${this.getAttribute('var-email')}">
                <img src="${this.getAttribute('logo-email')}" />
            </mj-button>
          </mj-column>
          <mj-column background-color="#99CC00" padding="0" vertical-align="bottom" width="18%" >
            <mj-image padding="0" padding-bottom="4px" src="${this.getAttribute('logo-conseiller')}" align="right" />
          </mj-column>
          <mj-column inner-background-color="#fff" padding-left="0" vertical-align="middle" width="67%" background-color="#99CC00" inner-border-right="8px" padding-right="8px">
            <mj-text color="#1f8d9d" css-class="text-conseiller" padding="12px 8px"><h1 style="font-weight: normal;margin: 0;">${this.getContent()}</h1></mj-text>
          </mj-column>
          </mj-group>
        </mj-section>
    `)
  }
}
