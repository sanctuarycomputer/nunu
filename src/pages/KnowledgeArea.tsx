import React, { FC } from 'react';
import knowledgeAreas from 'mockData/knowledgeAreas';

import Page from 'elements/Page';
import KnowledgeAreaHeader from 'components/KnowledgeAreaHeader';
import TextStyle from 'elements/TextStyle';

const KnowledgeAreaPage: FC = () => {
  return (
    <Page>
      <KnowledgeAreaHeader image={knowledgeAreas[0].thumbnailImage}>
        <TextStyle variation="heading-1" element="h1" uppercase>
          {knowledgeAreas[0].title}
        </TextStyle>
      </KnowledgeAreaHeader>
    </Page>
  );
};

export default KnowledgeAreaPage;
