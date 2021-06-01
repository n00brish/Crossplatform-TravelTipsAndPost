import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {NhostAuthProvider, NhostApolloProvider } from "react-nhost"
/** App.tsx inneholder alle route funskjonene som er de vi bruker for å kalle på siden når vi for eksempel trykker på den. Om det skal trykkes på bestemmes i classen, for eksempel Detail siden kommer opp når man klikker på den ved bruk av <Link> <Link/> koden i Home, men selve routingen skjer i app.tsx 
Fra før av har vi følgene routes (home login, og detail) hvor disse inneholder en path, en component og en exact 
 */
// '' //  og  ´´ og ´´  og []
import Home from './pages/Home';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Detail from './pages/Detail';
import Login from './pages/Login';
import { auth } from './utils/nhost';
import NewPost from './pages/NewPost';



// får tilgang til daten i databasen vår via grafql endepunktet her
const App: React.FC = () => (
  <NhostAuthProvider auth={auth}> 
  <NhostApolloProvider auth={auth} gqlEndpoint={'https://hasura-dg36d0lk.nhost.app/v1/graphql'}> 
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/newpost" component={NewPost} exact={true} />

        <Route path="/detail/:id" component={Detail} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </NhostApolloProvider>
  </NhostAuthProvider>
);

export default App;
