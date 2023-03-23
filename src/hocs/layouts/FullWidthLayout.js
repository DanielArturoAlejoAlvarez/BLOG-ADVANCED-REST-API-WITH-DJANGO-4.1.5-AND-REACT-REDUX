import Footer from "components/navigation/Footer"
import NavBar from "components/navigation/NavBar"
import { connect } from "react-redux"

function FullWidthLayout({children}) {
  return (
    <>
      <NavBar />
        {children}
      <Footer />
    </>
  )
}

const mapStateToProps = state=>({

})

export default connect(mapStateToProps, {

})(FullWidthLayout)
