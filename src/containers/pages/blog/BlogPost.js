import BlogSkeletonLoader from "components/loaders/BlogSkeletonLoader";
import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_blog } from "redux/actions/blog";

function BlogPost({ get_blog, post }) {
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    get_blog(slug);
  }, []);

  const base = process.env.REACT_APP_API_URL;

  return (
    <FullWidthLayout>
      {post ? (
        <div className="relative py-16 bg-white overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              <div className="flex-shrink-0 shadow-md">
                <img
                  className="h-48 w-full object-cover"
                  src={base + post.thumbnail}
                  alt=""
                />
              </div>
              <h1>
                <Link to={`/blog/categories/${post.category.id}`}>

                  <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                    {post.category.name}
                  </span>
                </Link>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 leading-8">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <BlogSkeletonLoader />
      )}
    </FullWidthLayout>
  );
}

const mapStateToProps = (state) => ({
  post: state.blog.post
});

export default connect(mapStateToProps, {
  get_blog
})(BlogPost);
