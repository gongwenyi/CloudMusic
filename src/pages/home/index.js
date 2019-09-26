import React, {lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PageContainer, TopBar, NavBar, LoadingV2 } from './../../components';
import './style.less';

const Recommend = lazy(() => import('./../recommend'));
const Singer = lazy(() => import('./../singer'));
const Rank = lazy(() => import('./../rank'));


const Home = () => {
  return (
    <div className="home-page">
      <TopBar/>
      <NavBar/>
      <PageContainer className="content">
        <Suspense fallback={<LoadingV2 />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/recommend" /> } />
            <Route path="/recommend" component={Recommend}/>
            <Route path="/singer" component={Singer}/>
            <Route path="/rank" component={Rank}/>
          </Switch>
        </Suspense>
      </PageContainer>
    </div>
  )
}

export default Home;