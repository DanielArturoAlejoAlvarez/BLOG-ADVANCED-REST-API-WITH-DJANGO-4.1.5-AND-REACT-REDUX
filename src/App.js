import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from './store'
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import Blog from "containers/pages/blog/Blog";
import BlogPost from "containers/pages/blog/BlogPost";
import About from "containers/pages/About";
import Contact from "containers/pages/Contact";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />}/>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
