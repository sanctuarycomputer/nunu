import React, { FC } from 'react';

import Page from 'elements/Page';
import KnowledgeAreaHeader from 'components/KnowledgeAreaHeader';

import knowledgeAreas from 'mockData/knowledgeAreas';

const KnowledgeAreaPage: FC = () => {
  return (
    <Page>
      <KnowledgeAreaHeader image={knowledgeAreas[0].thumbnailImage}>
        {knowledgeAreas[0].title}
      </KnowledgeAreaHeader>
    </Page>
  );
};

export default KnowledgeAreaPage;
