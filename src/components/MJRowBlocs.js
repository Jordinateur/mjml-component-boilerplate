import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-row-blocs': ['mj-bloc'],
  'mj-content': ['mj-row-blocs'],
})

export default class MjRowBlocs extends BodyComponent {
  nbChilds = false
  countBlocs() {
    if(this.nbChilds === false) this.nbChilds = this.props.children.filter((c) => c.tagName === 'mj-bloc').length
    return this.nbChilds
  }

  calcWidth(i = 0) {
    const c = this.countBlocs()
    if (i === this.countBlocs() - 1) return '100%';
    if(this.props.children.length % 2 === 0) return '49%'
    if(this.props.children.length % 2 === 1 && i < this.countBlocs() - 1) return '49%';
  }

  renderBlocs() {
    const blocs = []
    for (let i = 0; i < this.countBlocs(); i += 1) {
      const c = this.props.children[i];      
      if (!c.attributes.width) c.attributes.width = this.calcWidth(i)
      if(i % 2 === 1) blocs.push('<mj-column width="2%"><mj-text> </mj-text></mj-column>')
      if(i % 2 === 0 && i > 0) blocs.push('<mj-spacer height="15px" />')
      blocs.push(this.renderChildren([c], { rawXML: true }))
    }
    return blocs
  }

  render() {
    return this.renderMJML(`
      <mj-section padding="4px 20px" class="row-button">
        ${this.renderBlocs()}
      </mj-section>
    `)
  }
}
