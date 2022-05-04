import {useEffect, useState} from 'react';
import './ImagePagesForm.sass';
import {Redirect, Route} from "react-router-dom";
import ImagesAll from "./ImagesAll/ImagesAll";
import ImageInfo from "./ImageInfo/ImageInfo";
import ImagesMatch from "./ImagesMatch/ImagesMatch";
import SynchronizePage from "./SynchronizePage/SynchronizePage";
import Upload from './Upload/Upload';
import {mainPopup} from '../../main'
import {useSelector} from "react-redux"

export interface SelectImage {
    selectImage?:  object,
    setSelectImage?: (selectImage?: object) => void
}

const ImagePagesForm = (props: mainPopup)  => {

    const[selectImage, setSelectImage] = useState<object>()

        //@ts-ignore
        const imagesError = useSelector(state => state.images.error)   

        // console.log("imagesError",imagesError.config.url.split('/')[5]);
    
        function shopifyCheck() {
            if (imagesError?.statusText === "Unauthorized" && imagesError?.config.url.split('/')[5] === "shopify") {
                props.setPopup(true)
                props.setPopupSettings({type: 'danger',value: 'Сбой авторизации Shopify'})
            }
        }
        
        useEffect(() => {
            shopifyCheck()
        }, [imagesError])



    return (
        <div className="ProductGeneralPageContainer">

                <Redirect to={'/images/all'}/>

                <Route exact path='/images/all'>
                    <ImagesAll
                        selectImage={selectImage}
                        setSelectImage={setSelectImage}
                    />
                </Route>

                <Route exact path="/images/info">
                    <ImageInfo
                        selectImage={selectImage}
                        setSelectImage={setSelectImage}
                    />
                </Route>

                <Route exact path="/images/match">
                    <ImagesMatch/>
                </Route>

                <Route exact path="/images/synchronize">
                    <SynchronizePage
                        popup={props.popup}
                        setPopup={props.setPopup}
                        setPopupSettings={props.setPopupSettings}
                    />
                </Route>

                <Route exact path="/images/upload">
                    <Upload/>
                </Route>


        </div>
    );
};

export default ImagePagesForm;


