export const storeData = (ad) => {
  const ads = JSON.parse(localStorage.getItem('ads'));
  ad.id = ads.length + 1;
  ads.push(ad);
  localStorage.setItem('ads', JSON.stringify(ads));
};

export const updateData = (id, data) => {
  const ads = JSON.parse(localStorage.getItem('ads'));
  console.log('------------data', data);

  ads.forEach((ad, index) => {
    if (ad.id === Number(id)) {
      ads[index] = data;
    }
  });
  localStorage.setItem('ads', JSON.stringify(ads));
  console.log('----------------------------------------------ads', ads);
};

export const getData = (id) => {
  const ads = JSON.parse(localStorage.getItem('ads'));
  return ads.find((ad) => ad.id === Number(id));
};
