import React from 'react';
import { Link } from 'react-router-dom';

const StoreList = ({ branch }) => {
    // stores && console.log(stores);
    console.log(branch);
    const { stores } = branch;
    // const branchid = branch._id;
    return (
        <div className="w-3/12">
            {
                stores?.map((store, i) =>
                    <div key={i}
                        className={(i % 2 === 0 ? "bg-gray-200 p-2" : "bg-gray-300 p-2")}>
                        <div className="flex justify-between">
                            <div>{store?.storeName}</div>
                            <Link to={`/admin/settings/${branch._id}/store/${store?._id}`}>
                                <button className="bg-emerald-700 px-4 py-1 text-white text-xs">Store Details</button>
                            </Link>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default StoreList;