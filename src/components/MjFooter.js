import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-footer': ['mj-column', 'mj-button', 'mj-image'],
  'mj-body': ['mj-footer'],
})

export default class MjFooter extends BodyComponent {
  /*
    We could obviously handle all the attributes accepted for Mj Section,
    Column, Image and Text, but let's keep it simple for this example.
  */
  static allowedAttributes = {}

  static defaultAttributes = {}

  render() {
    return this.renderMJML(`
      <mj-wrapper padding="0" padding-bottom="20px">
      <mj-section background-color="#EDEDED" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="tel:<<LIBELLE_60_4>>">
            <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/telproxi.png" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Votre Conseiller
          </mj-text>
          <mj-text padding-top="5px">
            <<LIBELLE_60_3>><br />
            <<LIBELLE_60_4>><br />
            <<LIBELLE_60_5>>
            </mj-text>          
          </mj-column>
      </mj-section>
      <mj-section background-color="#EDEDED" padding-top="5px" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="https://www.ca-briepicardie.net/eds_agences.php?EDS=<<LIBELLE_60_10>>">
            <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/locaproxi.png" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Votre agence
          </mj-text>
          <mj-text padding-top="5px">
            <<LIBELLE_60_6>><br />
            <<LIBELLE_60_8>><br />
            <<LIBELLE_60_9>><br />
            <<LIBELLE_60_7>>
          </mj-text>          
        </mj-column>
      </mj-section>
      <mj-section background-color="#EDEDED" padding-top="5px" padding-bottom="5px">
        <mj-column width="15%">
          <mj-button
          background-color="none"
          padding="0"
          inner-padding="2px 0"
          href="mailto:<<LIBELLE_60_5>>">
            <img src="https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/emailproxi.png" />
          </mj-button>
        </mj-column>           
        <mj-column width="85%">
          <mj-text padding-bottom="5px" font-weight="bold" font-style="italic">
            Vos contacts
          </mj-text>
          <mj-text padding-top="5px">
            Notre site Internet : <a href="https://www.ca-briepicardie.fr" title="Crédit Agricole Brie Picardie">www.ca-briepicardie.fr</a> <br />
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
