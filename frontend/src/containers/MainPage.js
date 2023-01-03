import Header from "../components/Header";
import { TypingPage } from "../containers/TypingPage";
const text="apple banana orange ric"
const MainPage = () => {
  return (
    <>
      <Header />
      <TypingPage targetText={text}/>
    </>
  );
};

export default MainPage;
