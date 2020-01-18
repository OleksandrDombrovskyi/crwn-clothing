import React from "react";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {connect} from 'react-redux';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({currentUser, isCartDropdownHidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contacts">
                CONTACT
            </OptionLink>
            {
                currentUser
                    ? <OptionLink as='div' className="option" onClick={signOutStart}> SIGN OUT </OptionLink>
                    : <OptionLink to="/signin"> SIGN IN </OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {isCartDropdownHidden ? null : <CartDropdown/>}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isCartDropdownHidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);