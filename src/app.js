import React, { lazy, Suspense, useReducer } from 'react';
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom';
import { LoadingV2, Player } from './components';
import reducer, { AppContext, initial } from './reducer';

const Home = lazy(() => import('./pages/home'));
const Album = lazy(() => import('./pages/album'));
const RankDetail = lazy(() => import('./pages/rankDetail'));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <Suspense fallback={<LoadingV2 />}>
          <Switch>
            <Route path="/recommend/:id" component={Album} />
            <Route path="/rank/:id" component={RankDetail} />
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
