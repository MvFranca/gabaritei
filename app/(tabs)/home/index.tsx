import HeaderHome from "@/src/components/headers/headerHome";
import { View, StyleSheet } from "react-native";
import CardSubModule from "@/src/components/submodule";

const Home = () => {
  return (
    <View style={styles.wrapper}>

      <View style={styles.container}>
        <View style={styles.cardArea}>
          <CardSubModule
            title="Operações Básicas"
            description="Aprenda mais sobre adição, subtração..."
          />
        </View>
      </View>

      <HeaderHome />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 114, 
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  cardArea: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});

export default Home;
