
import AIChatbox from "./component/AIChatbox";
import PlaningSearch from "./component/PlanningSearch";
import CarouselComponent from "./component/CarouselComponent";
import NearbySupplier from "./component/NearbySupplier";
import Starts from "./component/Stats";
import Works from "./component/Works";
import Categories from "./component/Categories";
import ChooseUs from "./component/ChooseUs";
import PartnerBrands from "./component/PartnerBrands";
import FAQ from "./component/FAQ";
import SuccessStories from "./component/SuccessStories";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <AIChatbox />
      <PlaningSearch />
      <Starts />
      <Works />
      <Categories />
      <NearbySupplier />
      <CarouselComponent />
      <ChooseUs />
      <PartnerBrands />
      <FAQ />
      <SuccessStories />
    </div>
  );
};

export default Home;
