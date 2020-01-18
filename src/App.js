import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from 'reselect';

import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import {checkUserSession} from "./redux/user/user.actions";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exect path='/checkout' component={CheckoutPage}/>
                    <Route exect path='/signin' render={() =>
                        this.props.currentUser
                            ? (<Redirect to='/'/>)
                            : (<SignInAndSignUp/>)
                    }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapToDispatchProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapToDispatchProps)(App);
