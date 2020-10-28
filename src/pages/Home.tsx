import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'state/reducers';
import { fetchHomePage } from 'state/slices/pages';
import Page from 'elements/Page';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.pages.homePage);

  useEffect(() => {
    if (!page) dispatch(fetchHomePage());
  }, [dispatch, page]);

  return page ? <Page>{page.title}</Page> : null;
  // TODO: loading state
};

export default HomePage;
