import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-body': ['mj-content'],
  'mj-section': ['mj-content'],
  'mj-content': ['mj-section', 'mj-row-buttons'],
})

export default class MjContent extends BodyComponent {
  render() {
    return this.renderMJML(`
    <mj-wrapper css-class="content" background-color="#fff">
      ${this.renderChildren(this.props.children, { rawXML: true, renderer: (component) => component.render })}
    </mj-wrapper>
    `)
  }
}
