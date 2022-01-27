import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../../../../../App';

const CreateStoreForm = () => {
    const { id } = useParams();
    console.log(id);

    const { branchListState } = useContext(AppContext);
    const [branchList, setBranchList] = branchListState;  // get state from context
    console.log(branchList.length);

    // 
    const navigate = useNavigate();

    useEffect(() => {
        if (branchList.length < 1) {
            navigate('/admin/settings/branch')
        }
    }, [branchList.length, navigate])

    const selectedBranch = branchList.find(branch => branch._id.toString() === id.toString());
    console.log(selectedBranch);


    const storeNameRef = useRef();
    const storeIDRef = useRef();

    const [newStoreState, setNewStoreState] = useState({
        storeID: '',
        storeName: ''
    })



    const handleSubmit = (e) => {
        const newStore = {
            storeID: storeIDRef.current.value,
            storeName: storeNameRef.current.value,
        }
        // console.log(newStore);
        setNewStoreState(newStore);

        storeIDRef.current.value = '';
        storeNameRef.current.value = '';

        e.preventDefault();
    }

    newStoreState.storeID && newStoreState.storeName && console.log(newStoreState);

    useEffect(() => {
        newStoreState.storeID && newStoreState.storeName &&
            fetch(`http://localhost:5000/admin/branch/${selectedBranch._id}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
                body: JSON.stringify(newStoreState) // We send data in JSON format
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
    }, [newStoreState, selectedBranch?._id]);

    return (
        <div>
            {
                <form onSubmit={handleSubmit} className="w-full shadow-lg ml-4 rounded p-4">
                    <div className='mt-2'>
                        <div>
                            <label className='text-sm font-semibold'>Branch ID</label>
                            <input type="text" disabled value={selectedBranch?.branchID} className='border w-full block my-2 p-2 rounded focus:outline-gray-400 placeholder:text-gray-600 text-sm' />
                        </div>
                        <div>
                            <label className='text-sm font-semibold'>Branch Name</label>
                            <input type="text" disabled value={selectedBranch?.branchName} className='border w-full block my-2 p-2 rounded focus:outline-gray-400 placeholder:text-gray-600 text-sm' />
                        </div>

                        <div>
                            <label className='text-sm font-semibold'>Store ID</label>
                            <input type="text" ref={storeIDRef} placeholder="Store ID" className='border w-full block my-2 p-2 rounded focus:outline-gray-400 placeholder:text-gray-600 text-sm' />
                        </div>

                        <div>
                            <label className='text-sm font-semibold'>Store Name</label>
                            <input type="text" ref={storeNameRef} placeholder="Store name" className='border w-full block my-2 p-2 rounded focus:outline-gray-400 placeholder:text-gray-600 text-sm' />
                        </div>

                        <button type="submit" className="text-sm bg-emerald-600 text-gray-50 px-4 py-1 my-2 rounded">Create Store</button>

                    </div>



                </form>}
        </div>
    );
};

export default CreateStoreForm;