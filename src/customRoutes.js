import React from 'react';
import { Route } from 'react-router-dom';
import { RouteWithoutLayout } from 'react-admin';
import HomePage from './pages/HomePage';
import FilterPage from './pages/FilterPage';
import RedirectPage from "./pages/RedirectPage";

export default [
  <RouteWithoutLayout exact path="/" component={HomePage} />,
  <RouteWithoutLayout exact path="/r" component={RedirectPage} />,
  <Route path="/filter/:id" component={FilterPage} />,
];
