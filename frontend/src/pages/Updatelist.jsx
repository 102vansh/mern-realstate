



// import React, { useState } from 'react';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from '../firebase';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Createlist = () => {
//   const [files, setFiles] = useState([]);
//   const { user } = useSelector((state) => state.user.user);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     description: '',
//     name: '',
//     address: '',
//     sale: false,
//     rent: false,
//     parking: false,
//     furnished: false,
//     offer: false,
//     bedrooms: 0,
//     bathroom: 0,
//     regularprice: 0,
//     discountedprice: 0,
//     type: 'rent',
//     userRef: user._id
//   });
//   const [imageError, setImageError] = useState('');

//   const handleImageSubmit = async (e) => {
//     e.preventDefault();
//     if (files.length > 0 && files.length < 6) {
//       const promises = [];
//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises).then((urls) => {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           imageUrls: prevFormData.imageUrls.concat(urls)
//         }));
//         setImageError(false);
//       }).catch((error) => {
//         setImageError('Image upload failed');
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { id, type, value, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [id]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5001/api/v1/list/create', formData, { withCredentials: true });
//       console.log(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const filename = new Date().getTime() + `-${file.name}`;
//       const storageRef = ref(storage, filename);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('Upload is ' + progress + '% done');
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleRemove = (index) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index)
//     }));
//   };

//   return (
//     <main className='p-3 mx-w-4xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row'>
//         <div className='flex flex-col gap-4 flex-1 ml-5'>
//           <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' onChange={handleChange} value={formData.name} />
//           <textarea onChange={handleChange} value={formData.description} type='text' placeholder='Description' className='border p-3 rounded-lg' id='description'></textarea>
//           <input onChange={handleChange} value={formData.address} type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' />
//           <div className='flex gap-6 flex-wrap mt-3'>
//             <div className='flex gap-2'>
//               <input onChange={handleChange} checked={formData.sale} type='checkbox' id='sale' className='w-5' />
//               <span>Sell</span>
//             </div>
//             <div className='flex gap-2'>
//               <input onChange={handleChange} checked={formData.rent} type='checkbox' id='rent' className='w-5' />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input onChange={handleChange} checked={formData.parking} type='checkbox' id='parking' className='w-5' />
//               <span>Parking Spot</span>
//             </div>
//             <div className='flex gap-2'>
//               <input onChange={handleChange} checked={formData.furnished} type='checkbox' id='furnished' className='w-5' />
//               <span>Furnished</span>
//             </div>
//             <div className='flex gap-2'>
//               <input onChange={handleChange} checked={formData.offer} type='checkbox' id='offer' className='w-5' />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex flex-wrap gap-6 mt-5'>
//             <div className='flex items-center gap-2'>
//               <input onChange={handleChange} value={formData.bedrooms} type='number' id='bedrooms' className='border p-3 rounded-lg border-gray-300' />
//               <p>Beds</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input onChange={handleChange} value={formData.bathroom} type='number' id='bathroom' className='border p-3 rounded-lg border-gray-300' />
//               <p>Baths</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input onChange={handleChange} value={formData.regularprice} type='number' id='regularprice' className='border p-3 rounded-lg border-gray-300' />
//               <p>Regular Price</p>
//               <span className='text-sm'>($/ month)</span>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input onChange={handleChange} value={formData.discountedprice} type='number' id='discountprice' className='border p-3 rounded-lg border-gray-300' />
//               <p>Discount price</p>
//               <span className='text-sm'>($/ month)</span>
//             </div>
//           </div>
//         </div>
//         <div className='flex flex-col flex-1 gap-4'>
//           <p className='font-semibold ml-6'>
//             Images:<span className='font-normal text-gray-600 ml-2'>The First image Will be Cover</span>
//           </p>
//           <div className='flex'>
//             <input
//               onChange={(e) => setFiles([...e.target.files])}
//               className='p-3 border-gray-600 rounded w-full ml-2'
//               type='file'
//               id='images'
//               multiple
//             />
//             <button
//               onClick={handleImageSubmit}
//               className='p-3 text-green-700 border border-green-700 rounded uppercase hover::shadow-lg disabled:opacity-80'
//             >
//               Upload
//             </button>
//           </div>
//           <p className='text-red-500'>{imageError}</p>
//           {formData.imageUrls.map((url, index) => (
//             <div key={index} className='flex justify-between p-3 border items-center'>
//               <img src={url} alt='listing' className='w-[200px] h-[200px] object-cover rounded-lg' />
//               <button
//                 onClick={() => handleRemove(index)}
//                 className='p-3 text-red-700 border border-red-700 rounded uppercase hover::shadow-lg disabled:opacity-80'
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type='submit'
//             className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[50%] ml-[190px] mt-6'
//           >
//             Create Listing
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default Createlist;

import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Updatetelist = () => {
  const [files, setFiles] = useState([]);
  const { user } = useSelector((state) => state.user.user);
  const {listingid} = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    imageUrls: [],
    description: '',
    name: '',
    address: '',
    sale: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 0,
    bathroom: 0,
    regularprice: 0,
    discountedprice: 0,
    type: 'rent',
    userRef: user._id
  });
  const [imageError, setImageError] = useState('');
useEffect(() => {
    const fetchlisting = async () => {
        try{
        const listingId = params.listingid
        console.log(listingId)
        const response = await axios.get(`http://localhost:5001/api/v1/list//get/${listingId}`)
        console.log(response.data)
        setFormData(response.data)

        }catch(error){
            console.log(error)
        }
    }
})
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length < 6) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        console.log('Image URLs:', urls);
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrls: [...prevFormData.imageUrls, ...urls]
        
        }));

        setImageError('');
      }).catch((error) => {
        setImageError('Image upload failed');
      });
    } else {
      setImageError('Please select between 1 and 5 images.');
    }
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post(`http://localhost:5001/api/v1/list/update/${listingid}`, formData, { withCredentials: true });
      console.log(response.data);
      navigate(`/listing/${response.data.updated._id}`);
      toast.success('Listing updated successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + `-${file.name}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemove = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index)
    }));
  };

  return (
    <main className='p-3 mx-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1 ml-5'>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' onChange={handleChange} value={formData.name} />
          <textarea onChange={handleChange} value={formData.description} placeholder='Description' className='border p-3 rounded-lg' id='description'></textarea>
          <input onChange={handleChange} value={formData.address} type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' />
          <div className='flex gap-6 flex-wrap mt-3'>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.sale} type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.rent} type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.parking} type='checkbox' id='parking' className='w-5' />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.furnished} type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.offer} type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6 mt-5'>
            <div className='flex items-center gap-2'>
              <input onChange={handleChange} value={formData.bedrooms} type='number' id='bedrooms' className='border p-3 rounded-lg border-gray-300' />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input onChange={handleChange} value={formData.bathroom} type='number' id='bathroom' className='border p-3 rounded-lg border-gray-300' />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input onChange={handleChange} value={formData.regularprice} type='number' id='regularprice' className='border p-3 rounded-lg border-gray-300' />
              <p>Regular Price</p>
              <span className='text-sm'>($/ month)</span>
            </div>
            <div className='flex items-center gap-2'>
              <input onChange={handleChange} value={formData.discountedprice} type='number' id='discountprice' className='border p-3 rounded-lg border-gray-300' />
              <p>Discount price</p>
              <span className='text-sm'>($/ month)</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold ml-6'>
            Images:<span className='font-normal text-gray-600 ml-2'>The First image Will be Cover</span>
          </p>
          <div className='flex'>
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className='p-3 border-gray-600 rounded w-full ml-2'
              type='file'
              id='images'
              multiple
            />
            <button
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover::shadow-lg disabled:opacity-80'
            >
              Upload
            </button>
          </div>
          <p className='text-red-500'>{imageError}</p>
          {formData.imageUrls.map((url, index) => (
            <div key={index} className='flex justify-between p-3 border items-center'>
              <img src={url} alt='listing' className='w-[200px] h-[200px] object-cover rounded-lg' />
              <button
                onClick={() => handleRemove(index)}
                className='p-3 text-red-700 border border-red-700 rounded uppercase hover::shadow-lg disabled:opacity-80'
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type='submit'
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[50%] ml-[190px] mt-6'
          >
            Update Listing
          </button>
        </div>
        <Toaster/>
      </form>
    </main>
  );
};

export default Updatetelist;
 