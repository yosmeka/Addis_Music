import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { createMusicStart } from '../reducers/musicSlice';
import { RootState } from '../reducers/rootReducer';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  background-color: #14b8a6;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.1em;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #05386B;
    outline: none;
  }
`;

const StyledButton = styled.button<{ loading?: boolean }>`
  background-color: ${(props) => (props.loading ? '#999' : '#05386B')};
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.loading && '#5CDB95'};
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.9em;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const NewMusic = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.music.loading);
  const error = useSelector((state: RootState) => state.music.error);
  const { id: userId } = useParams();

  const [musicData, setMusicData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    imageFile: null,
    audioFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMusicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files![0];

    setMusicData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      try {
        if (userId) {
          dispatch(createMusicStart({ musicData, userId }));
          clearForm();
        } else {
          console.error('User ID is undefined.');
        }
      } catch (error) {
        console.error('Error creating music:', error);
      }
    }
  };

  const clearForm = () => {
    setMusicData({
      title: '',
      artist: '',
      album: '',
      genre: '',
      imageFile: null,
      audioFile: null,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit} encType="multipart/form-data">
      <StyledLabel>
        Title
        <StyledInput
          type="text"
          name="title"
          value={musicData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </StyledLabel>
      <StyledLabel>
        Artist
        <StyledInput
          type="text"
          name="artist"
          value={musicData.artist}
          onChange={handleChange}
          placeholder="Enter artist"
        />
      </StyledLabel>
      <StyledLabel>
        Album
        <StyledInput
          type="text"
          name="album"
          value={musicData.album}
          onChange={handleChange}
          placeholder="Enter album"
        />
      </StyledLabel>
      <StyledLabel>
        Genre
        <StyledInput
          type="text"
          name="genre"
          value={musicData.genre}
          onChange={handleChange}
          placeholder="Enter genre"
        />
      </StyledLabel>
      <StyledLabel>
        Cover Image
        <StyledInput
          type="file"
          name="imageFile"
          onChange={handleFileChange}
        />
      </StyledLabel>
      <StyledLabel>
        Audio File
        <StyledInput
          type="file"
          name="audioFile"
          onChange={handleFileChange}
        />
      </StyledLabel>
      
      {error && <ErrorMessage>Error: Please try again</ErrorMessage>}
      
      <StyledButton type="submit" loading={loading}>
        {loading ? "Creating ..." : 'Create Music'}
      </StyledButton>
    </StyledForm>
  );
};

export default NewMusic;
