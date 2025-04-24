import HeaderHome from "@/src/components/headers/headerHome";
import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    return ( 
        <View style={{ flex: 1, backgroundColor: 'white', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar style="auto" />
            <HeaderHome/>
        </View>
     );
}
 
export default Home;