import FullWidthLayout from 'hocs/layouts/FullWidthLayout'
import { useEffect } from 'react'
import { connect } from 'react-redux'
//import { get_blog_list, get_blog_list_page } from 'redux/actions/blog'

function Home({
  
}) {

  
  return (
    <FullWidthLayout>
        Home
    </FullWidthLayout>
  )
}

const mapStateToProps = state=>({
  
})

export default connect(mapStateToProps, {

})(Home)
