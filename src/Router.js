import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Publish from './Publish';
import NFTInfo from './NFTInfo';
import SellSingle from './SellSingle';
import BuySingle from './BuySingle';
import Collections from './Collections';
import Spark from './NFTSpark';
import IntroPublish from './IntroPublish';
import EncryptedPublish from './EncryptedPublish';
import Buy from './Buy';

const BasicRoute = () => (
  <HashRouter >
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/introPublish" component={IntroPublish} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/publish" component={Publish} />
      <Route exact path="/encryptedPublish" component={EncryptedPublish} />
      <Route exact path="/sellSingle/:NFTId" component={SellSingle} />
      <Route exact path="/buySingle/:NFTId" component={BuySingle} />
      <Route exact path="/collections" component={Collections} />
      <Route exact path="/NFT/:id" component={NFTInfo} />
      <Route exact path="/NFT/spark/:id" component={Spark} />
    </Switch>
  </HashRouter>
);


export default BasicRoute;