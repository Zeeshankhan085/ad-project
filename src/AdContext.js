import React, { useState, useEffect, createContext } from 'react';

let initialData = [
  {
    id: 1,
    name: 'Coco Cola',
    createdAt: 'Wed Feb 09 2022 19:17:57 GMT+0530 (India Standard Time)',
    updatedAt: '2022-02-10T15:34:24.112Z',
    type: 'image',
    headline: 'Coco Cola',
    description: 'Quench your thirst with the classic taste of Coca-Cola today!e',
    status: 'draft',
    social: ['google', 'facebook', null],
    contentUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
    destinationUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
  },
  {
    id: 2,
    name: 'Coco Cola',
    createdAt: 'Wed Feb 09 2022 19:17:57 GMT+0530 (India Standard Time)',
    updatedAt: '2022-02-10T14:03:11.518Z',
    type: 'image',
    headline: 'Coco Cola',
    description: 'Quench your thirst with the classic taste of Coca-Cola today!e',
    status: 'live',
    social: ['google', 'facebook', 'google'],
    contentUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
    destinationUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
  },
  {
    id: 3,
    name: 'Coco Cola',
    createdAt: 'Wed Feb 09 2022 19:17:57 GMT+0530 (India Standard Time)',
    updatedAt: '2022-02-10T11:55:25.386Z',
    type: 'image',
    headline: 'Coco Cola',
    description: 'capacity with our counter depth fridge',
    status: 'live',
    social: [null, null, null],
    contentUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
    destinationUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
  },
  {
    id: 4,
    name: 'Coco Cola',
    createdAt: 'Wed Feb 09 2022 19:17:57 GMT+0530 (India Standard Time)',
    updatedAt: 'Wed Feb 06 2022 19:17:57 GMT+0530 (India Standard Time)',
    type: 'image',
    headline: 'Coco Cola',
    description: 'Quench your thirst with the classic taste of Coca-Cola today!e',
    status: 'paused',
    social: ['google', 'linkedin', 'facebook'],
    contentUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
    destinationUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
  },
  {
    id: 5,
    name: 'Coco Cola',
    createdAt: 'Wed Feb 09 2022 19:17:57 GMT+0530 (India Standard Time)',
    updatedAt: 'Wed Feb 05 2022 19:17:57 GMT+0530 (India Standard Time)',
    type: 'image',
    headline: 'Coco Cola',
    description: 'Quench your thirst with the classic taste of Coca-Cola today!e',
    status: 'paused',
    social: ['google', 'linkedin', 'facebook'],
    contentUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
    destinationUrl: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg',
  },
];

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);

  const handleInput = (text) => {
    text = text.toLowerCase();
    setFilteredAds(
      ads.filter((ad) => {
        return (
          ad.name.toLowerCase().includes(text) ||
          ad.description.toLowerCase().includes(text) ||
          ad.headline.toLowerCase().includes(text)
        );
      })
    );
  };
  const sortAds = (order) => {
    const ch = ads.map((ad) => ({ ...ad, updatedAt: new Date(ad.updatedAt) }));
    const filtered =
      order === 'desc'
        ? ch.slice().sort((a, b) => b.updatedAt - a.updatedAt)
        : ch.slice().sort((a, b) => a.updatedAt - b.updatedAt);

    setFilteredAds(
      filtered.map((ad) => ({ ...ad, updatedAt: ad.updatedAt.toString() }))
    );
  };

  const clearFilter = () => {
    setFilteredAds(ads);
  };

  const applyFilter = ({ type, status, platform }) => {
    let filteredData = ads;
    if (type) {
      filteredData = ads.filter((ad) => ad.type === type);
      console.log(filteredData, '1');
    }
    if (status) {
      filteredData = filteredData.filter((ad) => ad.status === status);
      console.log(filteredData, '2');
    }

    if (platform) {
      filteredData = filteredData.filter((ad) => ad.social.includes(platform));
      console.log(filteredData, '3');
    }

    setFilteredAds(filteredData);
  };
  useEffect(() => {
    if (!localStorage.getItem('ads')) {
      localStorage.setItem('ads', JSON.stringify(initialData));
    }
    setAds(JSON.parse(localStorage.getItem('ads')));
    setFilteredAds(JSON.parse(localStorage.getItem('ads')));
  }, []);
  return (
    <AdContext.Provider
      value={{
        ads: filteredAds,
        applyFilter,
        sortAds,
        handleInput,
        clearFilter,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};
