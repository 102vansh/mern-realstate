 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Listitem from '../component/Listitem';

const Search = () => {
  const [sidebar, setSidebar] = useState({
    search: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [listing, setListing] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchFromUrl = urlParams.get('search') || '';
    const typeFromUrl = urlParams.get('type') || 'all';
    const sortFromUrl = urlParams.get('sort') || 'created_at';
    const orderFromUrl = urlParams.get('order') || 'desc';
    const parkingFromUrl = urlParams.get('parking') === 'true';
    const furnishedFromUrl = urlParams.get('furnished') === 'true';
    const offerFromUrl = urlParams.get('offer') === 'true';

    setSidebar({
      search: searchFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl,
      furnished: furnishedFromUrl,
      offer: offerFromUrl,
      sort: sortFromUrl,
      order: orderFromUrl,
    });

    const fetchList = async () => {
      try {
        const searchQuery = urlParams.toString();
        const response = await axios.get(`http://localhost:5001/api/v1/list/get?${searchQuery}`, { withCredentials: true });
        console.log(response.data.listings);
        if (response.data.listings.length > 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListing(response.data.listings);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchList();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === 'type') {
      setSidebar((prev) => ({
        ...prev,
        type: value,
      }));
    } else if (type === 'checkbox') {
      setSidebar((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else if (id === 'sort') {
      const [sort, order] = value.split('_');
      setSidebar((prev) => ({
        ...prev,
        sort,
        order,
      }));
    } else {
      setSidebar((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.keys(sidebar).forEach((key) => {
      urlParams.set(key, sidebar[key]);
    });
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMore = async () => {
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('skip', startIndex);
    const searchQuery = urlParams.toString();
    const response = await axios.get(`http://localhost:5001/api/v1/list/get?${searchQuery}`, { withCredentials: true });
    if (response.data.listings.length < 9) {
      setShowMore(false);
    }
    setListing((prev) => [...prev, ...response.data.listings]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-bottom-b-2 sm:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="border rounded-lg w-full p-3"
              value={sidebar.search}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                id="all"
                value="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                id="rent"
                value="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                id="sale"
                value="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'sale'}
              />
              <span>Sale</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label>Sort:</label>
            <select id="sort" className="border-rounded-lg p-3" onChange={handleChange} value={`${sidebar.sort}_${sidebar.order}`}>
              <option value="regular-price_desc">Price High To Low</option>
              <option value="regular-price_asc">Price Low To High</option>
              <option value="created_at_desc">Newest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-500 text-white p-3 rounded-lg">Search</button>
        </form>
      </div>
      <div className="p-7">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Result</h1>
        <div className="p-7 flex flex-wrap gap-6">
          {listing.length === 0 && <p>No listings found.</p>}
          {listing.map((item) => (
            <Listitem listing={item} key={item._id} />
          ))}
          
        </div>
        {showMore && (
            <button className="text-green-500 underline cursor-pointer ml-10" onClick={onShowMore}>
              Show More
            </button>
          )}
      </div>
    </div>
  );
};

export default Search;
