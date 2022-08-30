import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandSelectInput = ({ handleFormInput }) => {
    let navigate = useNavigate();
    const [isDataReady, setIsDataReady] = useState(false);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // send a post request to the server to fetch customers
        (async () => {
            const rawResponse = await fetch('/api/brands', {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/login");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                // update customers
                setBrands([...content.data])
                // stop the progress bar
                setIsDataReady(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full flex flex-col mb-3">
            <label className="font-semibold text-gray-600 py-2">Brand</label>
            <select onChange={handleFormInput} className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="brandId">
                <option value="">Selete or type to search brand</option>
                {
                    // if data is not ready diplay spinners else diplay the table
                    !isDataReady ? (
                        <option value=""></option>
                    ) : (
                        brands.map((brand, i) => {
                            return <option key={i} value={brand._id}>{brand.brandName}</option>
                        })
                    )
                }
            </select>
            <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
        </div>
    )
}

export default BrandSelectInput;