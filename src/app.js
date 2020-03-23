import React, { lazy, Suspense, useReducer } from 'react';
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom';
import { LoadingV2, Player } from './components';
import reducer, { AppContext, initial } from './reducer';

const Home = lazy(() => import('./pages/home'));
const Album = lazy(() => import('./pages/album'));
const RankDetail = lazy(() => import('./pages/rankDetail'));
const SingerDetail = lazy(() => import('./pages/singerDetail'));
const SingerDesc = lazy(() => import('./pages/singerDesc'));
const MvDetail = lazy(() => import('./pages/mvDetail'));
const Search = lazy(() => import('./pages/search'));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <Suspense fallback={<LoadingV2 />}>
          <Switch>
            <Route path="/recommend/:id" component={Album} />
            <Route path="/rank/:id" component={RankDetail} />
            <Route path="/singer/:id" component={SingerDetail} />
            <Route path="/singerDesc/:id" component={SingerDesc} />
            <Route path="/mvDetail/:id" component={MvDetail} />
            <Route path="/search" component={Search} />
            <Route path="/" component={Home} />
          </Switch>
          {/* 底部播放器 */}
          <Player />
        </Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
