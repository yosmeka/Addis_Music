
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import Card from '../components/card';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { primaryColor, backgroundColor,  } from '../constants/colors'; // Import color constants


interface CoverImage {
  public_id: string;
  url: string;
}

interface Audio {
  public_id: string;
  url: string;
}

interface MusicListItem {
  coverImg: CoverImage;
  audio: Audio;
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MainContainer = styled.div`
  flex: 1;
  padding-bottom: 40px;
  background-color: ${backgroundColor};
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ShowAllLink = styled(Link)`
  color: ${primaryColor};
  text-decoration: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${primaryColor}CC;
  }

  &:focus {
    outline: 2px solid ${primaryColor};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 15px;
  }

  @media (max-width: 480px) {
    justify-content: center;
    gap: 10px;
  }
`;

const Error = styled.div`
  color: #e35353;
  padding: 30px;
  margin: 20px 0;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Home: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.music);

  if (loading) {
    return (
      <SpinnerContainer>
        <ClipLoader color="#66eac0" loading={loading} size={100} />
      </SpinnerContainer>
    );
  }

  if (error) {
    return <Error>Oops! Something went wrong. Please try again later.</Error>;
  }

  if (!data) {
    return <Error>No data available</Error>;
  }

  const getRandomElements = (array: MusicListItem[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const recentMusic = data.musicList.slice(0, 5);
  const remainingMusic = data.musicList.slice(5);
  const randomlyChosenMusic = getRandomElements(remainingMusic, 5);

  return (
    <MainContainer>
      <HomeContainer>
        <Header>
          <Title>Recent Music</Title>
          <ShowAllLink to="/music">Show All</ShowAllLink>
        </Header>
        <CardsContainer>
          {recentMusic.map((item) => (
            <Card
              key={item._id}
              id={String(item._id)}
              imageUrl={item.coverImg.url}
              title={item.title}
              artist={item.artist}
            />
          ))}
        </CardsContainer>
      </HomeContainer>
      <HomeContainer>
        <Header>
          <Title>Related Music</Title>
          <ShowAllLink to="/music">Show All</ShowAllLink>
        </Header>
        <CardsContainer>
          {randomlyChosenMusic.map((item) => (
            <Card
              key={item._id}
              id={String(item._id)}
              imageUrl={item.coverImg.url}
              title={item.title}
              artist={item.artist}
            />
          ))}
        </CardsContainer>
      </HomeContainer>
    </MainContainer>
  );
};

export default Home;
