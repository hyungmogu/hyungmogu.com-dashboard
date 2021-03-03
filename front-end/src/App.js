import './App.css';
import { PrimaryNavMenu, SecondaryNavMenu } from './components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';
import InfoScreen from './screens/InfoScreen';
import ProjectDetailScreen from './screens/ProjectDetailScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import WorkExperienceDetailScreen from './screens/WorkExperienceDetailScreen';
import WorkExperiencesScreen from './screens/WorkExperiencesScreen';
import HomeScreen from './screens/HomeScreen';
import styled from 'styled-components';

const AppStyle = {
  Main: styled.main`
    margin: 2.39rem 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  `
};

function App() {
  return (
    <HashRouter>
      <div className="App">
        <PrimaryNavMenu/>
        <AppStyle.Main>
          <SecondaryNavMenu/>
          <Switch>
            <Route path="/admin/info" component={InfoScreen}/>
            <Route path="/admin/projects/:id" component={ProjectDetailScreen}/>
            <Route path="/admin/projects" component={ProjectsScreen}/>
            <Route path="/admin/work-experience/:id" component={WorkExperienceDetailScreen}/>
            <Route path="/admin/work-experience" component={WorkExperiencesScreen}/>
            <Route exact path="/admin" component={HomeScreen}/>
        </Switch>
        </AppStyle.Main>
      </div>
    </HashRouter>
  );
}

export default App;
