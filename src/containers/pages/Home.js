import FullWidthLayout from 'hocs/layouts/FullWidthLayout'
import { connect } from 'react-redux'

function Home() {
  return (
    <FullWidthLayout>
        <h1>Home</h1>
    </FullWidthLayout>
  )
}

const mapStateToProps = state=>({

})

export default connect(mapStateToProps, {
    
})(Home)
