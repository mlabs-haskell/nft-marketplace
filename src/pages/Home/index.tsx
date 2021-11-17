import Auction from '../../components/UI/organisms/Home/Auction'
import Explore from "../../components/UI/organisms/Home/Explore";
import Header from "../../components/UI/organisms/Home/Header";

function Home() {
  return (
    <div>
      <Header/>
      <Auction/>
      <Explore/>
    </div>
  );
}

export default Home;