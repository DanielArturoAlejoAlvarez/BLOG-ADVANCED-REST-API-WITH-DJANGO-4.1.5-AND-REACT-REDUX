import { useEffect } from "react"
import { connect } from "react-redux"
import { get_categories } from "redux/actions/categories"

function BlogCategories({
    get_categories,
    categories
}) {

  useEffect(() => {
    get_categories()
  }, [])
  
    
  return (
    <div>BlogCategories</div>
  )
}


const mapStateToProps = state=>({
    categories: state.categories.categories
})

export default connect(mapStateToProps, {
    get_categories
})(BlogCategories)