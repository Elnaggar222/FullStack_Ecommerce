import Announcement from "../Components/Announcement";
import Categories from "../Components/Categories/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products/Products";
import Slider from "../Components/Slider/Slider";

const Home = () => {
  return (
    <>
      <Announcement /> 
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
