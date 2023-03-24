import FullWidthLayout from "hocs/layouts/FullWidthLayout"
import { connect } from "react-redux"

function About() {
  return (
    <FullWidthLayout>
        About
    </FullWidthLayout>
  )
}

const mapStateToProps = state=>({

})

export default connect(mapStateToProps, {

})(About)