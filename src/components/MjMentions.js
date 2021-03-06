import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-body': ['mj-mentions'],
  'mj-mentions': ['mj-section', 'mj-text'],
})

export default class MjMentions extends BodyComponent {
  static allowedAttributes = {
    logo: 'string',
  }
  static defaultAttributes = {
    logo: 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/banque.gif'
  }
  render() {
    return this.renderMJML(`
    <mj-wrapper padding="0" class="mentions">
      <mj-section padding="0">
        <mj-column width="100%">
          <mj-divider border-width="2px" border-color="#1F8D9D" />
        </mj-column>
      </mj-section>
      <mj-section padding="0">
        <mj-column width="92%" padding="0">
          <mj-image width="275px" align="left" src="${this.getAttribute('logo')}" alt="Agir chaque jour dans votre intérêt et celui de la société - Crédit Agricole Brie Picardie" />
        </mj-column>
      </mj-section>
      <mj-section padding="0" padding-bottom="10px">
        <mj-column>
          ${this.renderChildren(this.props.children, { rawXML: true, renderer: (component) => component.render })}
        </mj-column>
      </mj-section>
    </mj-wrapper>
    `)
  }
}
