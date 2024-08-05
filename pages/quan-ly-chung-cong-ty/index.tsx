import Trangchu from '@/components/trangchuphanmemgiaoviec/Trangchu';
import React from 'react';

const HomeCty = ({ isHasRole }: { isHasRole: boolean }) => {
  return <Trangchu isHasRole={isHasRole} />;
};

export default HomeCty;
