import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalHeader } from 'src/Components/GlobalHeader';
import { NotFound } from 'src/Components/NotFound';
import { DashboardView } from 'src/View/Dashboard';
import { isTokenActive, LoginForm } from 'src/Components/LoginScreen';
import { RegistrationForm } from 'src/Components/RegistrationScreen';
import { AddEventView } from 'src/View/AddEvent';
import { Redirect, RouteProps } from 'react-router';
import { EventDetailsView } from 'src/View/EventDetails';

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({ isAuthenticated, authenticationPath, ...routeProps }: ProtectedRouteProps) {
    if (isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
}

export const App: React.FC = () => {
    const defaultProtectedRouteProps: ProtectedRouteProps = {
        isAuthenticated: isTokenActive(),
        authenticationPath: '/login',
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <GlobalHeader />
                    <DashboardView />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="/register">
                    <RegistrationForm />
                </Route>
                <ProtectedRoute {...defaultProtectedRouteProps} exact path="/addEvent">
                    <GlobalHeader />
                    <AddEventView />
                </ProtectedRoute>
                <ProtectedRoute
                    {...defaultProtectedRouteProps}
                    exact
                    path={'/event/' + localStorage.getItem('eventId')}
                >
                    <GlobalHeader />
                    <EventDetailsView />
                </ProtectedRoute>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};
