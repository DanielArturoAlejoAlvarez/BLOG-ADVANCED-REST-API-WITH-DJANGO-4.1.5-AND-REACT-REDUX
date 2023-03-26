import CategoryBlogList from 'components/blog/CategoryBlogList'
import FullWidthLayout from 'hocs/layouts/FullWidthLayout'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { get_blog_category_list, get_blog_category_list_page } from 'redux/actions/blog'

function BlogCategory({
    get_blog_category_list,
    get_blog_category_list_page,
    blog_list,
    count
}) {

 const params = useParams()
 const category_id = params.category_id

 useEffect(() => {
   get_blog_category_list(category_id)
 }, [])
 


  return (
    <FullWidthLayout>
        <CategoryBlogList 
            get_blog_list_page={get_blog_category_list_page}
            blog_list={blog_list}
            count={count}
            category_id={category_id}
        />
    </FullWidthLayout>
  )
}

const mapStateToProps = state=>({
    blog_list: state.blog.blog_category_list,
    count: state.blog.count
})

export default connect(mapStateToProps, {
    get_blog_category_list,
    get_blog_category_list_page
})(BlogCategory)