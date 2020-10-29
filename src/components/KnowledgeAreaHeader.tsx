import React, { FC } from 'react';
import cx from 'classnames';
import { Image } from 'lib/cms';

import Img from 'elements/Img';

type Props = {
  className?: string;
  image: Image;
};

const KnowledgeAreaHeader: FC<Props> = ({ className, children, image }) => {
  return (
    <header className={cx('KnowledgeAreaHeader flex flex-row', className)}>
      <Img src={image.src} alt={image.alt || ''} />
      <div className="KnowledgeAreaHeader__content flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </header>
  );
};

export default KnowledgeAreaHeader;
