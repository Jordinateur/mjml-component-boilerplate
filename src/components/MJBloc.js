import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-body': ['mj-bloc'],
  'mj-bloc': ['mj-text'],
})



export default class MjBloc extends BodyComponent {
    static allowedAttributes = {
        'var-picto': 'string',
      }
    
      static defaultAttributes = {
        'var-picto': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/nfc.jpg',
      }
  render() {
    return this.renderMJML(`
      <mj-section background-color="#fff" padding="4px 20px">
        <mj-group background-color="#1F8D9D" padding="0">
        <mj-column width="15%" background-color="#d9e4e6" padding="0" vertical-align="middle">
          <mj-image src="${this.getAttribute('var-picto')}" padding="0" width="60px"/>
        </mj-column>
        <mj-column width="85%" background-color="#1F8D9D" padding="0" vertical-align="middle">
          ${this.renderChildren(this.props.children, { rawXML: true, renderer: (component) => component.render })}
        </mj-column>
        <mj-group>
      </mj-section>
    `)
  }
}
