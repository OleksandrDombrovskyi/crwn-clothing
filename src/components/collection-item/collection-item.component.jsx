import React from "react";
import {connect} from 'react-redux';
import {addItem} from "../../redux/cart/cart.actions";
import {CollectionItemContainer, AddButton, CollectionFooterContainer, CollectionItemImage, NameContainer, PriceContainer} from "./collection-item.styles";

const CollectionItem = ({item, addItem}) => {
    const {name, imageUrl, price} = item;

    return (
        <CollectionItemContainer>
            <CollectionItemImage className='image' imageUrl={imageUrl}/>
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)} inverted>ADD TO CART</AddButton>
        </CollectionItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);