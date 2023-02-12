import { useRef, useEffect } from 'react';
import AnimatedLottieView from 'lottie-react-native';

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return <></>;

  const animation = useRef(null)

  useEffect(() => {
    if (visible) {
      animation.current?.play()
    }
  }, [ visible ])

  return (
    <AnimatedLottieView
      ref={animation}
      autoPlay
      loop
      source={require('../assets/animations/loader.json')}
    />
  );
};

export default ActivityIndicator;
