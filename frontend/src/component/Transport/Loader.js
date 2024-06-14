import React , {useState} from 'react'
import RingLoader from "react-spinners/RingLoader";

function Loader() {
    let [loading] = useState(true);
   

    return (
        <div>
            <div className="sweet-loading text-center">
                <RingLoader
                    color='#33c32d'
                    loading={loading}
                    css=''
                    size={80}
                />

            </div>

        </div>
    )
}

export default Loader