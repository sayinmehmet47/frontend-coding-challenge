import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import Card from './components/Card';
import { Books, Countries } from './helpers';
import { AppDispatch, RootState } from './redux/store';
import { fetchStores } from './redux/storeSlice';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 12px;
  place-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
`;

function App() {
  const stores = useSelector((state: RootState) => state.store);
  const { data, included } = stores.stores;

  const countries = included
    .filter((item) => item.type === 'countries')
    .map((item) => {
      return {
        id: item.id,
        code: item.attributes.code,
      };
    });

  const books = included
    .filter((item) => item.type === 'books')
    .map((item) => {
      return {
        id: item.id,
        name: item.attributes.name,
        authorId: item.relationships.author.data.id,
        copiesSold: item.attributes.copiesSold,
      };
    });

  const authors = included
    .filter((item) => item.type === 'authors')
    .map((item) => {
      return {
        id: item.id,
        name: item.attributes.fullName,
      };
    });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div className="App">
      <Wrapper>
        {data.map((store: any, index) => (
          <Card
            key={index}
            //DD.MM.YYYY  format
            date={new Date(store.attributes.establishmentDate)
              .toLocaleDateString()
              .toString()}
            address="123 Main St"
            id={store.id}
            link={store.attributes.storeImage}
            title={store.attributes.name}
            rating={store.attributes.rating}
            website={store.attributes.website}
            flagLink={Countries(
              store.relationships.countries.data.id,
              countries
            )}
            bestSelling={Books(store.relationships.books, authors, books) || []}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default App;
