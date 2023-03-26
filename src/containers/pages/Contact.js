import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { connect } from "react-redux";

function Contact() {
  return <FullWidthLayout>Contact</FullWidthLayout>;
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Contact);
