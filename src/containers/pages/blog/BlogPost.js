import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_blog } from "redux/actions/blog";

function BlogPost({ get_blog }) {
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    get_blog(slug);
  }, []);

  return <FullWidthLayout>Blog Post</FullWidthLayout>;
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  get_blog
})(BlogPost);
