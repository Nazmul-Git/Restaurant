// import BannerMain from "./Components/Banner/BannerMain";

import FoodContainer from "./Components/FoodContainer";
import SliderMain from "./Components/Banner/SliderMain";
import Footer from "./Components/Footer/Footer";
import Team from "./Components/Team";
import Partner from "./Components/Partner";
import Testimonial from "./Components/Testimonial";


export default function Home() {
  return (
    <>
      <SliderMain />
      <FoodContainer />
      <Testimonial/>
      <Team/>
      <Partner/>
      <Footer/>
    </>
  );
}
