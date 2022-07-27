import styled from 'styled-components';
import { desktop, mobile, tablet } from '../responsive';
import StarRating from './StarRating';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  ${mobile({
    flexDirection: 'column',
    alignItems: 'center',
  })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const CardPicture = styled.img`
  border-radius: 50%;
  object-fit: cover;
  ${mobile({ maxWidth: '150px', height: '130px' })}
  ${tablet({ maxWidth: '150px', height: '130px' })}
  ${desktop({ maxWidth: '200px', height: '180px' })}
  padding:10px 20px
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  ${mobile({ flexDirection: 'column', alignItems: 'center' })}
`;

const Rating = styled.div`
  display: flex;
  justify-content: end;
  flex: 1;
`;

const CardTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  flex: 1;
`;

const Table = styled.table`
  border: 1px solid #ccc;
  border-spacing: 0px;
`;

const CountryFlag = styled.img`
  width: 50px;
  height: 40px;
  border-radius: 2px;
  ${mobile({ width: '40px', height: '30px' })}
`;

const Date = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: left;
  position: relative;
  ${mobile({ fontSize: '14px' })}
`;

const StoreLink = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: '14px' })}
`;

const Link = styled.a`
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ${mobile({ flexDirection: 'column', alignItems: 'center' })};
`;

const FooterLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${mobile({ flexDirection: 'column', alignItems: 'left' })};
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: 'column', alignItems: 'center' })}
`;

const Span = styled.span`
  ${mobile({ display: 'none' })}
`;

type Props = {
  title: string;
  link: string;
  rating: number;
  date: string;
  address: string;
  flagLink?: string;
  key: number;
  id: string;
  website: string;
  bestSelling: Array<{
    name: string;
    author: string;
  }>;
};

export default function Card(props: Props) {
  const { rating, id, website, bestSelling } = props;

  return (
    <CardContainer>
      <Body>
        <Left>
          <CardPicture src={props.link} />
        </Left>
        <Right>
          <Header>
            <CardTitle>{props.title}</CardTitle>
            <Rating>
              <StarRating rate={rating} id={id} />
            </Rating>
          </Header>
          <Table>
            <thead style={{ textAlign: 'left' }}>
              <tr>
                <th style={{ paddingLeft: '10px' }}>Best selling books </th>
              </tr>
            </thead>
            <tbody>
              {bestSelling.map((item: { name: string; author: string }) => (
                <tr key={item.name}>
                  <td
                    style={{ padding: '0px 10px', border: '0.5px solid #ccc' }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{ padding: '0px 10px', border: '0.5px solid #ccc' }}
                  >
                    {item.author}
                  </td>
                </tr>
              ))}

              {bestSelling.length === 0 && (
                <tr>
                  <td
                    style={{ padding: '0px 10px', border: '0.5px solid #ccc' }}
                  >
                    No best selling books
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Right>
      </Body>
      <Footer>
        <FooterLeft>
          <Date>{props.date}</Date>
          <StoreLink>
            <Span>-</Span> <Link href={website}>{website}</Link>
          </StoreLink>
        </FooterLeft>
        <CountryFlag src={props.flagLink} />
      </Footer>
    </CardContainer>
  );
}
