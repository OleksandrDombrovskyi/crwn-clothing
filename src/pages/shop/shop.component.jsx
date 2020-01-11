import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateCollections} from "../../redux/shop/shop.actions";

import CollectionsOverView from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        const {updateCollection} = this.props;

        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollection(collectionsMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverViewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollection: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);