import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from '../App';
import NFTInfo from '../view/NFTInfo';
import SellSingle from '../view/SellSingle';
import BuySingle from '../view/BuySingle';
import Collections from '../view/Collections';
import Spark from '../view/NFTSpark';
import Publish from '../view/PublishEx'
import Buy from '../view/Buy';

import ScrollToTop from '../components/ScrollToTop';
import MessageExProvider from '../components/MessageExProvider';

const BasicRoute = () => (
	<HashRouter>
		<ScrollToTop>
			<MessageExProvider />
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/publish/:fromNFT" component={Publish} />
				<Route exact path="/buy" component={Buy} />
				<Route exact path="/publish" component={Publish} />
				<Route exact path="/sellSingle/:NFTId" component={SellSingle} />
				<Route exact path="/buySingle/:NFTId" component={BuySingle} />
				<Route exact path="/collections" component={Collections} />
				<Route exact path="/NFT/:id/:chainId" component={NFTInfo} />
				<Route exact path="/NFT/spark/:id/:chainId" component={Spark} />
			</Switch>
		</ScrollToTop>
	</HashRouter>
);

export default BasicRoute;
