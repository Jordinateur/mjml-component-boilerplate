import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-body': ['mj-bloc'],
  'mj-bloc': ['mj-text'],
})



export default class MjBloc extends BodyComponent {
    static allowedAttributes = {
        'var-picto': 'string',
        width: 'string',
      }
    
      static defaultAttributes = {
        'var-picto': 'https://www.ca-briepicardie.net/Emailing/IMG_PICTOS/nfc.jpg',
        width: '100%',
      }
  render() {
    return this.renderMJML(`
      <mj-group background-color="#1F8D9D" padding="0" width="${this.getAttribute('width')}">
        <mj-column width="20%" background-color="#d9e4e6" vertical-align="middle" padding="8px 3px">
          <mj-image src="${this.getAttribute('var-picto')}" padding="0" width="60px"/>
        </mj-column>
        <mj-column width="80%" background-color="#1F8D9D" padding="0" vertical-align="middle">
          ${this.renderChildren(this.props.children, { rawXML: true, renderer: (component) => component.render })}
        </mj-column>
      <mj-group>      
    `)
  }
}
