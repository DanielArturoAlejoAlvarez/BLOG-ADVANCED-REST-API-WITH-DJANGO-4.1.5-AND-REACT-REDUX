import Header from 'components/Header'
import BlogList from 'components/blog/BlogList'
import FullWidthLayout from 'hocs/layouts/FullWidthLayout'
import { useEffect } from 'react'
import { connect } from 'react-redux'

function Blog({
  
}) {

  useEffect(() => {
    
  }, [])
  
  return (
    <FullWidthLayout>
      <Header /> 
      <BlogList />
    </FullWidthLayout>
  )
}

const mapStateToProps = state=>({
  
})

export default connect(mapStateToProps, {
  
})(Blog)
