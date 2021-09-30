import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Logout from "./components/Logout/Logout";
import Auth from "./containers/Auth/Auth";
import MyList from "./containers/MyList/MyList";
import Profile from "./containers/Profile/Profile";
import Layout from "./containers/Layout/Layout";
import { autoLogin } from "./store/actions/auth";
import { EPISODES, HOME, LOGIN, LOGOUT, MYLIST, NOTFOUND, PROFILE, SEARCH, SHOWBYID, SIGNUP } from "./common/constants/routes";
import { NotFound } from "./containers/NotFound/NotFound";
import { Show } from "./containers/Show/Show";
import Episodes from "./containers/Episodes/Episodes";
import Home from "./containers/Home/Home";
import Search from "./containers/Search/Search";
import { fetchUser } from "./store/actions/user";

const App = () => {

  const isAuthenticated = useSelector((state) => !!state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())

    if (isAuthenticated) {
      dispatch(fetchUser())
    }
  }, [dispatch, isAuthenticated])

  let routes = (
    <Switch>
      <Route path={SEARCH} exact component={Search} />
      <Route path={SHOWBYID} component={Show} />
      <Route path={EPISODES} component={Episodes} />
      <Route path={LOGIN} component={Auth} />
      <Route path={SIGNUP} component={Auth} />
      <Route path={HOME} exact component={Home} />
      <Redirect from={PROFILE} to={HOME} />
      <Redirect from={MYLIST} to={HOME} />
      <Route path={NOTFOUND} component={NotFound} />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path={SEARCH} exact component={Search} />
        <Route path={SHOWBYID} component={Show} />
        <Route path={EPISODES} component={Episodes} />
        <Route path={PROFILE} component={Profile} />
        <Route path={MYLIST} component={MyList} />
        <Route path={LOGOUT} component={Logout} />
        <Route path={HOME} exact component={Home} />
        <Redirect from={LOGIN} to={HOME} />
        <Redirect from={SIGNUP} to={HOME} />
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
