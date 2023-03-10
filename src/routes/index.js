import React from 'react';
import { Switch } from 'react-router-dom';

import PrivRoutes from './PrivRoutes';
import Page404 from '../pages/page404';
import Login from '../pages/login';
import Register from '../pages/register';
import Fotos from '../pages/fotos';
import Home from '../pages/home';
import Aluno from '../pages/aluno';

export default function Routes() {
  return (
    <Switch>
      <PrivRoutes exact path="/" component={Home} />
      <PrivRoutes exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <PrivRoutes exact path="/aluno" component={Aluno} isClosed />
      <PrivRoutes exact path="/fotos/:id" component={Fotos} isClosed />
      <PrivRoutes exact path="/register" component={Register} />
      <PrivRoutes exact path="/login" component={Login} />
      <PrivRoutes path="*" component={Page404} />
    </Switch>
  );
}
