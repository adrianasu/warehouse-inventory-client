import React from 'react';
import { Loader } from 'react-loaders';
import '../css/loader.scss';

export default function renderLoader(){
    return(
        <Loader type='line-scale' active />
    )
}