import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb://${user}:${password}@cluster0-shard-00-00.${url}:27017,cluster0-shard-00-01.${url}:27017,cluster0-shard-00-02.${url}:27017/${db}?ssl=true&replicaSet=atlas-gk64bo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error connection Mongo ${error.message}`);
    throw error;
  }
};
