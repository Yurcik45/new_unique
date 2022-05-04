import {useEffect, useState} from 'react';
import './SynchronizePage.sass';
import synchronizeIcon from '../../../assets/images/uploadPageSynchronizeIcon.svg';
import uploadFromPcIcon from '../../../assets/images/uploadPageUplPcIcon.svg';
import { NavLink } from 'react-router-dom';
import arrow from '../../../assets/images/down-arrow 1.svg'

import Instagram from '../../../assets/images/synchronizeIcons/synchronizeInsta.svg'
// import Flickr from '../../../assets/images/synchronizeIcons/synchronizeFlickr.svg'
// import Tumblr from '../../../assets/images/synchronizeIcons/synchronizeTumblr.svg'
import Dropbox from '../../../assets/images/synchronizeIcons/synchronizeDropBox.svg'
import GoogleDrive from '../../../assets/images/synchronizeIcons/synchronizeGoogleDrive.svg'
// import Photoshelter from '../../../assets/images/synchronizeIcons/synchronizePhotoshelter.svg'
// import PhotoDeck from '../../../assets/images/synchronizeIcons/synchronizePhotoDeck.svg'
// import SmugMug from '../../../assets/images/synchronizeIcons/synchronizeSmugMug.svg'
import Shopify from '../../../assets/images/synchronizeIcons/synchronizeShopify.svg'
// import FTP from '../../../assets/images/synchronizeIcons/synchronizeFTP.svg'
// import AWSS3 from '../../../assets/images/synchronizeIcons/synchronizeAWSs3.svg'
// import Zenfolio from '../../../assets/images/synchronizeIcons/synchronizeZenfolio.svg'
// import API from '../../../assets/images/synchronizeIcons/synchronizeAPI.svg'
// import WIX from '../../../assets/images/synchronizeIcons/synchronizeWIX.svg'
// import Bigcommerce from '../../../assets/images/synchronizeIcons/synchronizeBigCommerce.svg'
// import Magneto from '../../../assets/images/synchronizeIcons/synchronizeMagneto.svg'
// import Volusion from '../../../assets/images/synchronizeIcons/synchronizeVolusion.svg'
import uploadFromPC from '../../../assets/images/synchronizeIcons/synchronizeUploadFromPC.svg'
// import SelectSource from './GoogleUpload/GoogleUpload';
import Upload from '../Upload/Upload';
import Input from '../../../components/UI/Input/Input';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch, useSelector } from 'react-redux';
import {shopifyAuthorize} from '../../../redux/actions/auth'
import Button from '../../../components/UI/Button/Button'
import {mainPopup} from '../../../main'



const SynchronizePage = (props: mainPopup) => {

    console.log("synchronyze popup props", props);

    //@ts-ignore
    const imagesError = useSelector(state => state.images.error)   

    // console.log("imagesError",imagesError.config.url.split('/')[5]);

    function shopifyCheck() {
        if (imagesError.statusText === "Unauthorized" && imagesError.config.url.split('/')[5] === "shopify") {
            props.setPopup(true)
            props.setPopupSettings({type: 'danger',value: 'Сбой авторизации Shopify'})
        }
    }
    
    useEffect(() => {
        shopifyCheck()
    }, [])
    
    
    

    const [showUpload, setShowUpload] = useState<boolean>(false)

    const [showShopify, setShowShopify] = useState<boolean>(false)

    const cancelIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M10.6491 9.01558L17.6579 2.00652C18.1141 1.55061 18.1141 0.813468 17.6579 0.357558C17.202 -0.0983525 16.4649 -0.0983525 16.009 0.357558L8.99991 7.36661L1.99106 0.357558C1.53493 -0.0983525 0.798004 -0.0983525 0.342093 0.357558C-0.114031 0.813468 -0.114031 1.55061 0.342093 2.00652L7.35095 9.01558L0.342093 16.0246C-0.114031 16.4805 -0.114031 17.2177 0.342093 17.6736C0.569301 17.901 0.868045 18.0153 1.16658 18.0153C1.46511 18.0153 1.76364 17.901 1.99106 17.6736L8.99991 10.6645L16.009 17.6736C16.2364 17.901 16.5349 18.0153 16.8335 18.0153C17.132 18.0153 17.4305 17.901 17.6579 17.6736C18.1141 17.2177 18.1141 16.4805 17.6579 16.0246L10.6491 9.01558Z" fill="#48519D"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </svg>

    const synchronizeItemsArr = [
        {
            icon: Instagram,
            name: 'Instagram',
            link: 'http://instagram.com'
        },
        // {
        //     icon: Flickr,
        //     name: 'Flickr'
        // },
        // {
        //     icon: Tumblr,
        //     name: 'Tumblr'
        // },
        {
            icon: Dropbox,
            name: 'Dropbox',
            link: 'http://dropbox.com'
        },
        {
            icon: GoogleDrive,
            name: 'Google Drive',
            link: 'http://google.com/intl/uk_UA/drive/'
        },
        // {
        //     icon: Photoshelter,
        //     name: 'Photoshelter'
        // },
        // {
        //     icon: PhotoDeck,
        //     name: 'PhotoDeck'
        // },
        // {
        //     icon: SmugMug,
        //     name: 'SmugMug'
        // },
        {
            icon: Shopify,
            name: 'Shopify'
        }
        // {
        //     icon: FTP,
        //     name: 'FTP'
        // },
        // {
        //     icon: AWSS3,
        //     name: 'AWS S3'
        // },
        // {
        //     icon: Zenfolio,
        //     name: 'Zenfolio'
        // },
        // {
        //     icon: API,
        //     name: 'API'
        // },
        // {
        //     icon: WIX,
        //     name: 'Wix'
        // },
        // {
        //     icon: Bigcommerce,
        //     name: 'Bigcommerce'
        // },
        // {
        //     icon: Magneto,
        //     name: 'Magneto'
        // },
        // {
        //     icon: Volusion,
        //     name: 'Volusion'
        // }

    ]

    const synchronizeShopify = () => {
        setShowShopify(true)
        console.log("synchronize shopify");
        
    }

    const [shop, setShop] = useState<string>()

    const shopInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        setShop(value.target.value)
    }

    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(shopifyAuthorize(shop))
    }



    return (
        <div className="UploadPageContainer">

            <div className="unseen_back_button_block">
                <NavLink to="/images/all">
                    <div className="unseen_back_arrow">
                        <img src={arrow} alt="arrow"/>
                    </div>
                    <div className="unseen_back_text">
                        back
                    </div>
                </NavLink>
            </div>

            <div className="synchronize_page_main_block">
                <div className="synchronize_page_left_container">
                    <div className="product_all_center_icon">
                        <div className="center_icon">
                            <img src={synchronizeIcon} alt=""/>
                        </div>
                        <div className="center_icon_name">Synchronize</div>
                        <div className="center_icon_description">with one of following services</div>
                    </div>

                    <div className="synchronize_image_formats">
                        Supported file types for direct file upload: JPG, JPEG, PNG, GIF
                    </div>

                    <div className="synchronize_items_container">
                        {
                            synchronizeItemsArr.map((item,id) => {
                                return (
                                    <div
                                        className="synchronize_items"
                                        key={id}
                                        onClick={item.name === 'Shopify' ? synchronizeShopify : undefined}
                                    >
                                        <div className="synchronize_item_icon">
                                            <img src={item.icon} alt=""/>
                                        </div>
                                        <div className="synchronize_item_name">
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/*<div>*/}
                    {/*    <SelectSource/>*/}
                    {/*</div>*/}
                </div>
                <div className="synchronize_page_right_upload_container">

                    <div className="product_all_right_icon">
                        <div className="right_icon">
                            <img src={uploadFromPcIcon} alt=""/>
                        </div>
                        <div className="right_icon_name">Upload</div>
                        <div className="right_icon_description">your image directly</div>
                    </div>

                    <div onClick={  () => setShowUpload(true)} className="synchronize_item">
                        <div className="synchronize_item_icon">
                            <img src={uploadFromPC} alt="upload from PC"/>
                        </div>
                        <div className="synchronize_item_name">
                            Upload from PC
                        </div>
                    </div>

                </div>
            </div>

            {
                showUpload ?
                    <div className="synchronize_page_upload_popup">
                        <Upload
                            setShowUpload={(e: boolean) => setShowUpload(e)}
                        />
                    </div>
                    : null
            }

            {
                showShopify ?
                    <div className="synchronize_page_shopify_popup">
                        <ClickAwayListener onClickAway={() => setShowShopify(false)}>
                            <div className="shopify_container">
                                <div className="shopifyHeader">
                                    <div className="shopifyHeaderText">Input you shop URL</div>
                                    <div onClick={() => setShowShopify(false)} className="shopifyHeaderIcon">{cancelIcon}</div>
                                </div>
                                <div className="shopifyInput">
                                    <Input
                                        className="MainInput"
                                        placeholder="shop URL"
                                        width="100%"
                                        type="text"
                                        name="email"
                                        autoComplete="no"
                                        mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => shopInput(value)}
                                    />
                                </div>
                                <div className="shopifybutton">
                                    <Button
                                        uppercase={true}
                                        value="send url"
                                        className="green"
                                        mainButtonClicked={() => onSubmit()}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        </ClickAwayListener>
                    </div>
                    : null
            }

        </div>
    );
}

export default SynchronizePage;