import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './views/Layout';
import Home from './views/Home';
import Single from './views/Single';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
