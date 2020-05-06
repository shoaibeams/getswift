const dev = {
  API_URL: 'http://157.230.54.90/flowerful/api',
};

const prod = {
  API_URL: 'http://157.230.54.90/flowerful/api',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
