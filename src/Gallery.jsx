import { useGlobalContext } from './Context';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchValue } = useGlobalContext();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['images', searchValue],
    queryFn: async () => {
      const { data } = await axios.get(`${url}&query=${searchValue}`);
      return data;
    },
  });
  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }
  //   console.log(data.results);

  if (data.results.length < 1) {
    return (
      <section className="image-container">
        <h4>No resutlt found...</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {data.results.map((item) => {
        const { id, urls, alt_description, description } = item;
        const url = item?.urls?.regular;
        return (
          <img
            key={id}
            src={url}
            alt={alt_description}
            title={description}
            className="img"
          />
        );
      })}
    </section>
  );
};
export default Gallery;
