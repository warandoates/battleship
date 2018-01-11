import React from 'react';

export default function () {
    let ships = [
        {name: 'Carrier', size: 5, imgURL: 'images/001-carrier.png'},
        {name: 'Battleship', size: 4, imgURL: 'images/002-battleship.png'},
        {name: 'Cruiser', size: 3, imgURL: 'images/003-cruiser.png'},
        {name: 'Sub', size: 3, imgURL: 'images/004-submarine.png'},
        {name: 'Destroyer', size: 2, imgURL: 'images/005-destroyer.png'}
    ]
    return (
        <div className="pickerContainer">

            <div className="col s12">
                <h3>Pick A Ship To Place It</h3>
            </div>
            {ships.map((boat, index) => {
            return(
                <div key={index}>
                    <div className="row">
                    </div>
                    <div className="row btn">
                        <div className="col s5" style={{textAlign: "left"}}>
                            {boat.name} ({boat.size})
                        </div>
                        <div className="col s7">
                            <img
                                src={boat.imgURL || '//via.placeholder.com/100x50'}
                                alt={boat.name}
                                width="150"
                                height="40"
                            />
                        </div>
                    </div>
                </div>
            )
            })}


        </div>
    )
}