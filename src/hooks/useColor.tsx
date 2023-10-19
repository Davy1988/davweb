import { setColor } from '@/lib/utils';
import { useEffect } from 'react';

export const useColorValue = (data: {
  primary: string;
  secondary: string;
  bg: string;
}) => {
  return useEffect(() => {
    setColor({ primary: data.primary, secondary: data.secondary, bg: data.bg });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
