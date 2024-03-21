
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/login',
      permanent: false, 
    },
  };
};

const HomePage = () => {
  return <div>Redireccionando...</div>;
};

export default HomePage;
