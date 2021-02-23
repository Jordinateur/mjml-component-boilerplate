import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-footer': ['mj-column', 'mj-button', 'mj-image'],
  'mj-body': ['mj-footer'],
})

export default class MjFooter extends BodyComponent {
  static allowedAttributes = {
    'var-tel': 'string',
    'logo-tel': 'string',
    'var-agence': 'string',
    'logo-agence': 'string',
    'var-email': 'string',
    'logo-email': 'string',
    'var-conseiller': 'string'
  }

  static defaultAttributes = {
    'var-tel': '<<LIBELLE_60_4>>',
    'logo-tel': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/telproxi.png',
    'var-agence': '<<LIBELLE_60_10>>',
    'logo-agence': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/locaproxi.png',
    'var-email': '<<LIBELLE_60_5>>',
    'logo-email': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/emailproxi.png',
    'var-conseiller': '<<LIBELLE_60_3>>',
    'var-email-conseiller': '<<LIBELLE_60_5>>',
    'var-agence': '<<LIBELLE_60_6>>',
    'var-rue': '<<LIBELLE_60_8>>',
    'var-cp-ville': '<<LIBELLE_60_9>>',
    'var-tel-agence': '<<LIBELLE_60_7>>'
  }

  render() {
    return this.renderMJML(`
      <mj-wrapper padding="0" padding-bottom="20px" class="footer">
      <mj-section background-color="#EDEDED" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="tel:${this.getAttribute('var-tel')}">
            <img src="${this.getAttribute('logo-tel')}" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Votre Conseiller
          </mj-text>
          <mj-text padding-top="5px">
            ${this.getAttribute('var-conseiller')}<br />
            ${this.getAttribute('var-tel')}<br />
            ${this.getAttribute('var-email')}
            </mj-text>          
          </mj-column>
      </mj-section>
      <mj-section background-color="#EDEDED" padding-top="5px" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="https://www.ca-briepicardie.net/eds_agences.php?EDS=${this.getAttribute('var-agence')}">
            <img src="${this.getAttribute('logo-agence')}" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Votre agence
          </mj-text>
          <mj-text padding-top="5px">
            ${this.getAttribute('var-agence')}<br />
            ${this.getAttribute('var-rue')}<br />
            ${this.getAttribute('var-cp-ville')}<br />
            ${this.getAttribute('var-tel-agence')}
          </mj-text>          
        </mj-column>
      </mj-section>
      <mj-section background-color="#EDEDED" padding-top="5px" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="mailto:${this.getAttribute('var-email')}">
            <img src="${this.getAttribute('logo-email')}" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Vos contacts
          </mj-text>
          <mj-text padding-top="5px">
            Notre site Internet : <a href="https://www.credit-agricole.fr/ca-briepicardie/particulier.html" title="Crédit Agricole Brie Picardie">www.credit-agricole.fr/ca-briepicardie</a> <br />
            <br />
            Application : <a href="https://www.ca-briepicardie.net/redirectapp?from=email" title="Ma banque">Ma banque</a>
          </mj-text>          
        </mj-column>
      </mj-section>
      <mj-section background-color="#EDEDED" padding-top="5px">
        <mj-column>
          <mj-button
                background-color="none"
                color="auto"
                padding="0"
                css-class="unsubscribe"
                inner-padding="0"
                font-size="11px"
                text-decoration="underline"
                href="<<PARAM_LIEN_DESABONNEMENT>>">
            Cliquez ici pour vous désabonner aux e-mails du Crédit Agricole
          </mj-button>             
        </mj-column>
      </mj-section>
      
      </mj-wrapper>
    `)
  }
}
