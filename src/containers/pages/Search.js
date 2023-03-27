import BlogListSearch from "components/blog/BlogListSearch";
import BlogSkeletonLoader from "components/loaders/BlogSkeletonLoader";
import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_search_blog } from "redux/actions/blog";

function Search({
    get_search_blog,
    posts
}) {

    

    const params = useParams()

    const term = params.term

    useEffect(() => {
      get_search_blog(term)
    }, [])
    


    return (
        <FullWidthLayout>
            <BlogListSearch blog_list={posts} />
        </FullWidthLayout>
    )
}

const mapStateToProps = (state) => ({
    posts: state.blog.filtered_posts
});

export default connect(mapStateToProps, {
    get_search_blog
})(Search);
