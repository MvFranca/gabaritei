import { Image, StyleSheet } from 'react-native';

const Illustration = ({ index }: { index: number }) => {
  const sources: { [key: number]: any } = {
    1: require('@/assets/images/logo.png'),                                                                                                                                                                                                                                                                                                                                                                                                                                             
    2: require('@/assets/images/logo.png'),
  };

  return <Image source={sources[index]} style={styles.image} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginVertical: 16,
  },
});

export default Illustration;
