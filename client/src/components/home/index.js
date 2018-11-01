import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import {getProductsBySell, getProductsByArrival} from '../../actions/productActions';
import CardBlock from '../utils/cardBlock';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock list={this.props.products.bySell} title="Best Selling Items"/>
                <HomePromotion />
                <CardBlock list={this.props.products.byArrival} title="New Arrivals"/>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        products: state.products
    }
);

export default connect(mapStateToProps)(Home);