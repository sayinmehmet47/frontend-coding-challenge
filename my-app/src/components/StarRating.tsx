import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { updateRating } from '../redux/storeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { mobile } from '../responsive';

type Props = {
  rate: number;
  id: string;
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ margin: '10px' })}
`;
export const Radio = styled.input`
  display: none;
`;
export const Rating = styled.div`
  cursor: pointer;
`;

export default function StarRating(props: Props) {
  const [rate, setRate] = useState(props.rate);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = props;

  useEffect(() => {
    dispatch(updateRating({ id, rate }));
  }, [rate]);

  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? '000'
                    : 'rgb(192,192,192)'
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
}
