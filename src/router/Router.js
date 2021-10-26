import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import App from "../App";
import Publish from "../view/Publish";
import NFTInfo from "../view/NFTInfo";
import SellSingle from "../view/SellSingle";
import BuySingle from "../view/BuySingle";
import Collections from "../view/Collections";
import Spark from "../view/NFTSpark";
import IntroPublish from "../view/IntroPublish";
import EncryptedPublish from "../view/EncryptedPublish";
import Buy from "../view/Buy";

const BasicRoute = () => (
  <HashRouter>
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
