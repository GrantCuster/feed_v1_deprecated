import Head from 'next/head'

export function calcLayout(WrappedComponent) {
  return class extends React.Component {
    static getInitialProps(ctx) {
      return WrappedComponent.getInitialProps(ctx)
    }

    constructor(props) {
      super(props)
      this.state = {
        ww: null,
        wh: null,
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWindowDimensions)
      this.updateWindowDimensions()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
      this.setState({
        ww: window.innerWidth,
        wh: window.innerHeight,
      })
    }

    render() {
      let column_target = 240

      let { ww, wh } = this.state
      let font_size = 16
      let line_height = 1.4
      let unit = font_size * line_height
      let columns = Math.floor(ww / column_target)
      let column_gap = unit
      let column_width = ww / columns

      let grid = {
        width: ww,
        height: wh,
        font_family: 'Inter UI',
        font_size,
        line_height,
        unit,
        indent: unit,
        margin_top: unit / 2,
        margin_bottom: unit / 2,
        margin_left: unit / 2,
        margin_right: unit / 2,
        columns: columns,
        column_width,
        column_gap,
      }

      return (
        <div>
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://rsms.me/inter/inter-ui.css"
            />
            <link rel="stylesheet" type="text/css" href="/static/grid.css" />
          </Head>

          {this.state.ww !== null ? (
            <WrappedComponent grid={grid} {...this.props} />
          ) : (
            <div>
              <div
                style={{
                  marginLeft: grid.margin_left,
                  marginTop: grid.margin_top,
                }}
              >
                <div>Grant Custer</div>
                <div>Design–Build</div>
                <div>Measuring...</div>
              </div>
            </div>
          )}
        </div>
      )
    }
  }
}
