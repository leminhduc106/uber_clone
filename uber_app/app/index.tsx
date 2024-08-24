import { Href, Redirect } from "expo-router";

const Home = () => {
    return (
        <Redirect href={"/(auth)/welcome" as Href} />
    );
}

export default Home;