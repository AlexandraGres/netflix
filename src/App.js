import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Logout from "./components/Logout/Logout";
import Auth from "./containers/Auth/Auth";
import Favorite from "./containers/Favorite/Favorite";
import Profile from "./containers/Profile/Profile";
import Shows from "./containers/Shows/Shows";
import Layout from "./containers/Layout/Layout";
import { autoLogin } from "./store/actions/auth";
import { FAVORITE, HOME, LOGIN, LOGOUT, NOTFOUND, PROFILE, SHOWBYID, SHOWS, SIGNUP } from "./common/constants/routes";
import { NotFound } from "./containers/NotFound/NotFound";
import { Show } from "./containers/Show/Show";

const App = () => {

  const isAuthenticated = useSelector((state) => !!state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  let routes = (
    <Switch>
      <Route path={SHOWS} component={Shows} />
      <Route path={SHOWBYID} component={Show} />
      <Route path={LOGIN} component={Auth} />
      <Route path={SIGNUP} component={Auth} />
      <Route path={HOME} exact component={Shows} />
      <Route path={NOTFOUND} component={NotFound} />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path={SHOWS} component={Shows} />
        <Route path={SHOWBYID} component={Show} />
        <Route path={PROFILE} component={Profile} />
        <Route path={FAVORITE} component={Favorite} />
        <Route path={LOGOUT} component={Logout} />
        <Route path={HOME} exact component={Shows} />
        <Route path={NOTFOUND} component={NotFound} />
      </Switch>
    )
  }

  return (
    <Layout>
      <Switch>
        {routes}
      </Switch>
    </Layout>
  )
}

export default connect()(App)
