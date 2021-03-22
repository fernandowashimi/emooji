import { useEffect, useRef } from 'react';

import { Box } from 'grommet';
import lottie from 'lottie-web';

import loadingAnimation from '@/assets/lottie/loading.json';

export function Loading() {
  const animated = useRef(null);

  useEffect(() => {
    if (!animated.current) return;

    lottie.loadAnimation({
      container: animated.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });
  }, [animated]);

  return (
    <Box fill align="center" justify="center" animation="fadeIn">
      <div ref={animated} style={{ width: '50%', height: '50%' }} />
    </Box>
  );
}
