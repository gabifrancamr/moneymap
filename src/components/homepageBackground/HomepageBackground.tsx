import { Box } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline/next';

export default function HomepageBackground() {
  return (
    <Box width={"100vw"} height={"100vh"} zIndex={'hide'} opacity="0.5">
      <Spline
        scene="https://prod.spline.design/7kQ9Hk0yBWldw0fs/scene.splinecode" 
      />
    </Box>
  );
}
