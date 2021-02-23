import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-row-buttons': ['mj-column', 'mj-cta', 'mj-image', 'mj-wrapper'],
  'mj-content': ['mj-row-buttons'],
})

export default class MjRowButtons extends BodyComponent {

  /*
    We could obviously handle all the attributes accepted for Mj Section,
    Column, Image and Text, but let's keep it simple for this example.
  */
  static allowedAttributes = {
    number: 'integer',
  }

  static defaultAttributes = {
    number: 1,
  }

  countButtons() {
    return this.props.children.filter((c) => c.tagName === 'mj-cta').length
  }

  calcWidth() {
    if (this.countButtons() > 1) return '45%';
    return '80%';
  }

  renderButtons() {
    const buttons = []
    for (let i = 0; i < this.props.children.length; i += 1) {
      const c = this.props.children[i];
      if (!c.attributes.width) c.attributes.width = this.calcWidth()
      buttons.push(this.renderChildren([c], { rawXML: true }))
      buttons.push('<mj-column width="8px"><mj-text> </mj-text></mj-column>')
    }
    return buttons
  }

  render() {
    return this.renderMJML(`
      <mj-section padding="18px 30px" class="row-button">
        ${this.renderButtons()}
      </mj-section>
    `)
  }
}
