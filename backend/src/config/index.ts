import { Environ, IConfig } from '../types';

// default configurations goes here
export default (): Partial<IConfig> => {
  return {
    PORT: parseInt(process.env.PORT as string, 10) || 4500,
    DATABASE_URL: `${process.env.DB_URL}${
      process.env.NODE_ENV === Environ.test ? '_test' : ''
    }`,
  };
};
