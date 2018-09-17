/* global gapi */

import StreetView from 'react-google-map-street-view';
import React from 'react';
// import axios from 'axios';

class GoogleImg extends React.Component {
  // constructor() {

  // }
  



  render() {
    return (
      <div>
        <StreetView address="4533 Canal ST" APIkey="AIzaSyCx8RkneDTEObbEJ9PASohsk37LO9i0B7c" streetView zoomLevel={15} />
      </div>
    );
  }
}

export default GoogleImg;