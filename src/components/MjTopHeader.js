import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-wrapper': ['mj-top-header'],
  'mj-top-header': ['mj-wrapper'],
})
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
export default class MjTopHeader extends BodyComponent {
  static allowedAttributes = {
    'ligne-un': 'string',
    'ligne-deux': 'string',
    picto: 'string',
    logo: 'string',
  }

  static defaultAttributes = {
    'ligne-un': 'Réglementaire',
    'ligne-deux': 'POUR INFORMATION',
    picto: 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/haut_info.gif',
    logo: 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/Logo_Head_CABP.jpg',
  }

  render() {
    const id = ID();
    return this.renderMJML(`
      <mj-wrapper padding-bottom="0" padding-top="14px" class="top-header">
        <mj-section padding="8px 0">
          <mj-column>
            <mj-button
              background-color="none"
              color="auto"
              padding="0"
              inner-padding="0"
              font-size="11px"
              text-decoration="underline"
              href="<<_PageMiroir>>">Cliquez ici pour visualiser l’email dans un navigateur</mj-button>
              <mj-raw>
                <script>
                  if(document.location.href.indexOf('credit-agricole') !== -1) document.getElementsByClassName('${id}')[0].getElementsByTagName('a')[0].style.display = 'none';
                  ;(function(){
                    if(document.location.href.indexOf('credit-agricole') !== -1) document.getElementsByClassName('${id}')[0].getElementsByTagName('a')[0].style.display = 'none';
                  })();
                </script>
              </mj-raw>
              <mj-divider border-width="2px"  border-color="#1F8D9D"/>
             
            </mj-column>
        </mj-section>
        <mj-wrapper text-align="right" padding="0">
          <mj-section padding="4px">
            <mj-group padding="0">      
              <mj-column padding="0" width="35%"><mj-image padding="0" width="220px" align="left" src="${this.getAttribute('logo')}" /></mj-column>
              <mj-column padding-top="20px" padding-right="10px" width="48%">
                <mj-text align="right" padding="0" padding-bottom="6px" color="#1F8D9D" font-weight="bold">${this.getAttribute('ligne-un')}</mj-text>
                <mj-text align="right" padding="0" color="#1F8D9D">${this.getAttribute('ligne-deux')}</mj-text>
              </mj-column>
              <mj-column width="15%">
                <mj-image padding="0" width="50px" src="${this.getAttribute('picto')}" />
              </mj-column>
            </mj-group>
          </mj-section>
        </mj-wrapper>
      </mj-wrapper>
    `)
  }
}
