import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools} from "react-query/devtools";
import HomePage from "./components/HomePage";
import SuperHerosPage from "./components/superHerosPage";
import RQSuperHerosPage from "./components/RQSuperHerosPage";
import SecondSameQuery from "./components/SecondSameQuery";
import HeroDetailPage from "./components/HeroDetailPage";
import ParallelQueriesPage from "./components/ParallelQueriesPage";
import DynamicParallelQueriesPage from "./components/DynamicParallelQueriesPage";
import DependentQueriesPage from "./components/DependentQueriesPage";
import PaginatedQueriesPage from "./components/PaginatedQueriesPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/second-same-query">Second same query</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/super-heroes" element={<SuperHerosPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHerosPage />} />
          <Route path="/second-same-query" element={<SecondSameQuery />} />
          <Route path="/hero-detail/:id" element={<HeroDetailPage />} />
          <Route path="/parallel-queries" element={<ParallelQueriesPage />} />
          <Route path="/dynamic-parallel-queries" element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
          <Route path="/dependent-queries" element={<DependentQueriesPage email="jarmanjit@gmail.com" />} />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />

        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
