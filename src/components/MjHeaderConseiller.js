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
    'var-eds': 'string',
    'var-email': 'string',
  }

  static defaultAttributes = {
    'var-tel': '<<LIBELLE>>',
    'var-eds': '<<LIBELLE>>',
    'var-email': '<<LIBELLE>>',
  }

  render() {
    return this.renderMJML(`
        <mj-section background-color="#99CC00" padding="0" text-align="left">
          <mj-group>
          <mj-column background-color="#EDEDED" width="12%" vertical-align="middle">
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="tel:${this.getAttribute('var-tel')}">
                <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/telproxi.png" />
            </mj-button >
            <mj-divider padding="2px" border-color="#fff"/>
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="https://www.ca-briepicardie.net/eds_agences.php?EDS=${this.getAttribute('var-eds')}">
                <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/locaproxi.png" />
            </mj-button>
            <mj-divider padding="2px" border-color="#fff"/>
            <mj-button
              background-color="none"
              padding="0"
              inner-padding="2px 0"
              href="mailto:${this.getAttribute('var-email')}">
                <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/emailproxi.png" />
            </mj-button>
          </mj-column>
          <mj-column background-color="#99CC00" padding="0" vertical-align="bottom" width="18%" >
            <mj-image padding="0" padding-bottom="4px" src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/d_besoin_un.gif" align="right" />
          </mj-column>
          <mj-column inner-background-color="#fff" padding-left="0" vertical-align="middle" width="67%" background-color="#99CC00" inner-border-right="8px" padding-right="8px">
            <mj-text color="#1f8d9d" css-class="text-conseiller" padding="12px 8px"><h1 style="font-weight: normal;margin: 0;">${this.getContent()}</h1></mj-text>
          </mj-column>
          </mj-group>
        </mj-section>
    `)
  }
}
