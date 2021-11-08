import React, { lazy, Suspense } from 'react';
import {Skeleton} from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect

} from "react-router-dom";
import {helper} from '../helpers/common'
const SearchPage = lazy(() => import('../page/search/index'));

const PopularPage = lazy(() => import('../page/popular/index'));
//import PopularPage from '../page/popular/index';

const UpcomingPage = lazy(() => import('../page/upcoming/index'));
//import UpcomingPage from '../page/upcoming/index';

const LoginPage = lazy(() => import('../page/login/index'));

const DetailPage = lazy(() => import('../page/detail/index'));

const PrivateRoute = ({children, ...rest})=>{
    const auth = helper.isAuthenticated();
    return(
        <Route
            {...rest}
            render={({location})=>auth
                    ? (children)
                    : <Redirect to={{
                        pathname:"/",
                        state:{from:location}
                    }}/>
        }
        />
    )
}
const IsRouteLogin = ({children, ...rest})=>{
    const auth = helper.isAuthenticated();
    return(
        <Route
            {...rest}
            render={({location})=>auth
                    ? <Redirect to={{
                        pathname:"/search-movie",
                        state:{from:location}
                    }}/>
                    : (children)
        }
        />
    )
}
const RouterMovie = () =>{
    return(
        <Router>
            <Suspense fallback={<Skeleton active/>}>
                <Switch>
                    <IsRouteLogin path="/" exact>
                        <LoginPage></LoginPage>
                    </IsRouteLogin>

                    <PrivateRoute path="/popular-movie">
                        <PopularPage></PopularPage>
                    </PrivateRoute>

                    <PrivateRoute path="/upcoming-movie">
                        <UpcomingPage></UpcomingPage>
                    </PrivateRoute>

                    <PrivateRoute path="/search-movie">
                        <SearchPage></SearchPage>
                    </PrivateRoute>

                    <PrivateRoute path="/movie-detail/:slug~:id">
                        <DetailPage></DetailPage>
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
    )
}
export default React.memo(RouterMovie);