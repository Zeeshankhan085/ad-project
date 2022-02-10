import React, { useState, useEffect, createContext } from 'react';
import instance from './axios';

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
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
  const applyFilter = ({ type, status, platform }) => {
    setFilteredAds(
      ads.filter((ad) => {
        return (
          ad.type === type || ad.status === status || ad.platform === platform
        );
      })
    );
  };
  const [ads, setAds] = useState([]);
  useEffect(() => {
    instance.get('/ads').then((res) => {
      setAds(res.data);
      setFilteredAds(res.data);
    });
  }, []);
  return (
    <AdContext.Provider
      value={{ ads: filteredAds, applyFilter, sortAds, handleInput }}
    >
      {children}
    </AdContext.Provider>
  );
};
