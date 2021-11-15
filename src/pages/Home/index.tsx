import Auction from '../../components/UI/organisms/Auction'
import Explore from "../../components/UI/organisms/Explore";
import Header from "../../components/UI/organisms/Header";

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
