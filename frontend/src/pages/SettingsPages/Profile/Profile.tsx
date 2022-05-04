import React, {useState} from 'react';
import './Profile.sass'
import Input from "../../../components/UI/Input/Input";
import Button from '../../../components/UI/Button/Button';
import MaskInput from "../../../components/UI/MaskInput/MaskInput";
import CustomSelect from "../../../components/UI/CustomSelect/CustomSelect";

const Profile = () => {

    const[testState]= useState<object>({select_gender: "MR.", country: "United States"})

    const [titleValue, setTitleValue] = useState<any[] | string>([])
    const [countryValue, setCountryValue] = useState<any[] | string>([])

    const unitedStatesIcon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6206 18.2068H0.379327C0.169855 18.2068 0 18.0369 0 17.8274V4.1723C0 3.96282 0.169855 3.79297 0.379327 3.79297H21.6207C21.8301 3.79297 22 3.96282 22 4.1723V17.8274C22 18.037 21.8301 18.2068 21.6206 18.2068Z" fill="#F5F5F5"/>
        <path d="M22 4.90177H0V4.1723C0 3.96282 0.169855 3.79297 0.379327 3.79297H21.6207C21.8301 3.79297 22 3.96282 22 4.1723L22 4.90177Z" fill="#FF4B55"/>
        <path d="M22 8.22754H0V9.3363H22V8.22754Z" fill="#FF4B55"/>
        <path d="M22 6.01074H0V7.1195H22V6.01074Z" fill="#FF4B55"/>
        <path d="M22 11.5541H0.379327C0.169855 11.5541 0 11.3843 0 11.1748V10.4453H22V11.5541Z" fill="#FF4B55"/>
        <path d="M22 14.8809H0V15.9896H22V14.8809Z" fill="#FF4B55"/>
        <path d="M21.6206 18.2064H0.379327C0.169855 18.2064 0 18.0366 0 17.8271V17.0977H22V17.8271C22 18.0366 21.8301 18.2064 21.6206 18.2064Z" fill="#FF4B55"/>
        <path d="M22 12.6631H0V13.7718H22V12.6631Z" fill="#FF4B55"/>
        <path d="M9.86204 3.79297H0.379327C0.169855 3.79297 0 3.96278 0 4.17225V11.1749C0 11.3843 0.169855 11.5542 0.379327 11.5542H9.86208C10.0716 11.5542 10.2414 11.3843 10.2414 11.1749V4.17225C10.2414 3.96278 10.0715 3.79297 9.86204 3.79297Z" fill="#41479B"/>
        <path d="M1.06514 4.6641L1.1491 4.9159L1.41452 4.91792C1.4489 4.91822 1.46312 4.96205 1.43549 4.98246L1.22198 5.14015L1.30207 5.39319C1.31247 5.42594 1.27513 5.45309 1.24716 5.43307L1.03124 5.27877L0.815325 5.43311C0.787352 5.45309 0.750098 5.42598 0.760411 5.39324L0.840504 5.14019L0.626993 4.9825C0.599364 4.96205 0.613587 4.91826 0.647962 4.91796L0.913379 4.91594L0.997339 4.66415C1.00817 4.63149 1.05423 4.63149 1.06514 4.6641Z" fill="#F5F5F5"/>
        <path d="M1.06514 5.98145L1.1491 6.23325L1.41452 6.23527C1.4489 6.23557 1.46312 6.2794 1.43549 6.29981L1.22198 6.4575L1.30207 6.71054C1.31247 6.74329 1.27513 6.77044 1.24716 6.75042L1.03124 6.59612L0.815325 6.75046C0.787352 6.77044 0.750098 6.74333 0.760411 6.71059L0.840504 6.45755L0.626993 6.29985C0.599364 6.2794 0.613587 6.23561 0.647962 6.23531L0.913379 6.23329L0.997339 5.9815C1.00817 5.94888 1.05423 5.94888 1.06514 5.98145Z" fill="#F5F5F5"/>
        <path d="M1.06514 7.29884L1.1491 7.55064L1.41452 7.55266C1.4489 7.55296 1.46312 7.59678 1.43549 7.61719L1.22198 7.77489L1.30207 8.02794C1.31247 8.06068 1.27513 8.08784 1.24716 8.06781L1.03124 7.91351L0.815325 8.06785C0.787352 8.08784 0.750098 8.06072 0.760411 8.02798L0.840504 7.77493L0.626993 7.61724C0.599364 7.59678 0.613587 7.553 0.647962 7.5527L0.913379 7.55068L0.997339 7.29888C1.00817 7.26627 1.05423 7.26627 1.06514 7.29884Z" fill="#F5F5F5"/>
        <path d="M1.06514 8.61528L1.1491 8.86707L1.41452 8.86909C1.4489 8.86939 1.46312 8.91322 1.43549 8.93363L1.22198 9.09133L1.30207 9.34437C1.31247 9.37711 1.27513 9.40427 1.24716 9.38424L1.03124 9.22994L0.815325 9.38429C0.787352 9.40427 0.750098 9.37715 0.760411 9.34441L0.840504 9.09137L0.626993 8.93367C0.599364 8.91322 0.613587 8.86944 0.647962 8.86913L0.913379 8.86711L0.997339 8.61532C1.00817 8.58266 1.05423 8.58266 1.06514 8.61528Z" fill="#F5F5F5"/>
        <path d="M1.06514 9.93269L1.1491 10.1845L1.41452 10.1865C1.4489 10.1868 1.46312 10.2306 1.43549 10.251L1.22198 10.4087L1.30207 10.6618C1.31247 10.6945 1.27513 10.7217 1.24716 10.7017L1.03124 10.5474L0.815325 10.7017C0.787352 10.7217 0.750098 10.6946 0.760411 10.6618L0.840504 10.4088L0.626993 10.2511C0.599364 10.2306 0.613587 10.1869 0.647962 10.1866L0.913379 10.1845L0.997339 9.93273C1.00817 9.90003 1.05423 9.90003 1.06514 9.93269Z" fill="#F5F5F5"/>
        <path d="M2.0875 5.30958L2.17146 5.56138L2.43688 5.5634C2.47125 5.5637 2.48547 5.60753 2.45784 5.62794L2.24433 5.78563L2.32443 6.03868C2.33483 6.07142 2.29749 6.09857 2.26951 6.07855L2.0536 5.92421L1.83768 6.07855C1.80971 6.09853 1.77245 6.07142 1.78276 6.03868L1.86286 5.78563L1.64935 5.62794C1.62172 5.60749 1.63594 5.5637 1.67032 5.5634L1.93573 5.56138L2.01969 5.30958C2.03048 5.27701 2.07663 5.27701 2.0875 5.30958Z" fill="#F5F5F5"/>
        <path d="M2.0875 6.627L2.17146 6.87879L2.43688 6.88081C2.47125 6.88111 2.48547 6.92494 2.45784 6.94535L2.24433 7.10304L2.32443 7.35608C2.33483 7.38882 2.29749 7.41598 2.26951 7.39595L2.0536 7.24161L1.83768 7.39595C1.80971 7.41593 1.77245 7.38887 1.78276 7.35608L1.86286 7.10304L1.64935 6.94535C1.62172 6.9249 1.63594 6.88111 1.67032 6.88081L1.93573 6.87879L2.01969 6.627C2.03048 6.59439 2.07663 6.59439 2.0875 6.627Z" fill="#F5F5F5"/>
        <path d="M2.0875 7.94438L2.17146 8.19618L2.43688 8.1982C2.47125 8.1985 2.48547 8.24233 2.45784 8.26274L2.24433 8.42043L2.32443 8.67347C2.33483 8.70622 2.29749 8.73337 2.26951 8.71335L2.0536 8.55901L1.83768 8.71335C1.80971 8.73333 1.77245 8.70622 1.78276 8.67347L1.86286 8.42043L1.64935 8.26274C1.62172 8.24228 1.63594 8.1985 1.67032 8.1982L1.93573 8.19618L2.01969 7.94438C2.03048 7.91177 2.07663 7.91177 2.0875 7.94438Z" fill="#F5F5F5"/>
        <path d="M2.0875 9.26173L2.17146 9.51353L2.43688 9.51555C2.47125 9.51585 2.48547 9.55968 2.45784 9.58009L2.24433 9.73778L2.32443 9.99083C2.33483 10.0236 2.29749 10.0507 2.26951 10.0307L2.0536 9.87636L1.83768 10.0307C1.80971 10.0507 1.77245 10.0236 1.78276 9.99083L1.86286 9.73778L1.64935 9.58009C1.62172 9.55963 1.63594 9.51585 1.67032 9.51555L1.93573 9.51353L2.01969 9.26173C2.03048 9.22916 2.07663 9.22916 2.0875 9.26173Z" fill="#F5F5F5"/>
        <path d="M3.10986 4.66411L3.19382 4.9159L3.45924 4.91792C3.49361 4.91822 3.50783 4.96205 3.48021 4.98246L3.26669 5.14015L3.34679 5.3932C3.35719 5.42594 3.31985 5.45309 3.29187 5.43307L3.07595 5.27873L2.86003 5.43307C2.83206 5.45305 2.79481 5.42594 2.80512 5.3932L2.88521 5.14015L2.6717 4.98246C2.64407 4.96201 2.6583 4.91822 2.69267 4.91792L2.95809 4.9159L3.04205 4.66411C3.05288 4.6315 3.09898 4.6315 3.10986 4.66411Z" fill="#F5F5F5"/>
        <path d="M3.10986 5.98146L3.19382 6.23326L3.45924 6.23527C3.49361 6.23558 3.50783 6.2794 3.48021 6.29981L3.26669 6.45751L3.34679 6.71055C3.35719 6.74329 3.31985 6.77045 3.29187 6.75043L3.07595 6.59608L2.86003 6.75043C2.83206 6.77041 2.79481 6.74329 2.80512 6.71055L2.88521 6.45751L2.6717 6.29981C2.64407 6.27936 2.6583 6.23558 2.69267 6.23527L2.95809 6.23326L3.04205 5.98146C3.05288 5.94889 3.09898 5.94889 3.10986 5.98146Z" fill="#F5F5F5"/>
        <path d="M3.10986 7.29787L3.19382 7.54967L3.45924 7.55169C3.49361 7.55199 3.50783 7.59582 3.48021 7.61623L3.26669 7.77392L3.34679 8.02697C3.35719 8.05971 3.31985 8.08687 3.29187 8.06685L3.07595 7.9125L2.86003 8.06685C2.83206 8.08683 2.79481 8.05971 2.80512 8.02697L2.88521 7.77392L2.6717 7.61623C2.64407 7.59577 2.6583 7.55199 2.69267 7.55169L2.95809 7.54967L3.04205 7.29787C3.05288 7.26529 3.09898 7.26529 3.10986 7.29787Z" fill="#F5F5F5"/>
        <path d="M3.10986 8.61528L3.19382 8.86708L3.45924 8.8691C3.49361 8.8694 3.50783 8.91322 3.48021 8.93363L3.26669 9.09133L3.34679 9.34437C3.35719 9.37711 3.31985 9.40427 3.29187 9.38425L3.07595 9.2299L2.86003 9.38425C2.83206 9.40423 2.79481 9.37711 2.80512 9.34437L2.88521 9.09133L2.6717 8.93363C2.64407 8.91318 2.6583 8.8694 2.69267 8.8691L2.95809 8.86708L3.04205 8.61528C3.05288 8.58267 3.09898 8.58267 3.10986 8.61528Z" fill="#F5F5F5"/>
        <path d="M3.10986 9.9327L3.19382 10.1845L3.45924 10.1865C3.49361 10.1868 3.50783 10.2306 3.48021 10.2511L3.26669 10.4087L3.34679 10.6618C3.35719 10.6945 3.31985 10.7217 3.29187 10.7017L3.07595 10.5473L2.86003 10.7017C2.83206 10.7216 2.79481 10.6945 2.80512 10.6618L2.88521 10.4087L2.6717 10.2511C2.64407 10.2306 2.6583 10.1868 2.69267 10.1865L2.95809 10.1845L3.04205 9.9327C3.05288 9.90004 3.09898 9.90004 3.10986 9.9327Z" fill="#F5F5F5"/>
        <path d="M4.13225 5.30958L4.21621 5.56138L4.48163 5.5634C4.51601 5.5637 4.53023 5.60753 4.5026 5.62794L4.28909 5.78563L4.36918 6.03868C4.37958 6.07142 4.34224 6.09857 4.31427 6.07855L4.09835 5.92421L3.88243 6.07855C3.85446 6.09853 3.81721 6.07142 3.82752 6.03868L3.90761 5.78563L3.6941 5.62794C3.66647 5.60749 3.6807 5.5637 3.71507 5.5634L3.98049 5.56138L4.06445 5.30958C4.07523 5.27701 4.12138 5.27701 4.13225 5.30958Z" fill="#F5F5F5"/>
        <path d="M4.13225 6.627L4.21621 6.87879L4.48163 6.88081C4.51601 6.88111 4.53023 6.92494 4.5026 6.94535L4.28909 7.10304L4.36918 7.35608C4.37958 7.38882 4.34224 7.41598 4.31427 7.39595L4.09835 7.24161L3.88243 7.39595C3.85446 7.41593 3.81721 7.38887 3.82752 7.35608L3.90761 7.10304L3.6941 6.94535C3.66647 6.9249 3.6807 6.88111 3.71507 6.88081L3.98049 6.87879L4.06445 6.627C4.07523 6.59439 4.12138 6.59439 4.13225 6.627Z" fill="#F5F5F5"/>
        <path d="M4.13225 7.94438L4.21621 8.19618L4.48163 8.1982C4.51601 8.1985 4.53023 8.24233 4.5026 8.26274L4.28909 8.42043L4.36918 8.67347C4.37958 8.70622 4.34224 8.73337 4.31427 8.71335L4.09835 8.55901L3.88243 8.71335C3.85446 8.73333 3.81721 8.70622 3.82752 8.67347L3.90761 8.42043L3.6941 8.26274C3.66647 8.24228 3.6807 8.1985 3.71507 8.1982L3.98049 8.19618L4.06445 7.94438C4.07523 7.91177 4.12138 7.91177 4.13225 7.94438Z" fill="#F5F5F5"/>
        <path d="M4.13225 9.26173L4.21621 9.51353L4.48163 9.51555C4.51601 9.51585 4.53023 9.55968 4.5026 9.58009L4.28909 9.73778L4.36918 9.99083C4.37958 10.0236 4.34224 10.0507 4.31427 10.0307L4.09835 9.87636L3.88243 10.0307C3.85446 10.0507 3.81721 10.0236 3.82752 9.99083L3.90761 9.73778L3.6941 9.58009C3.66647 9.55963 3.6807 9.51585 3.71507 9.51555L3.98049 9.51353L4.06445 9.26173C4.07523 9.22916 4.12138 9.22916 4.13225 9.26173Z" fill="#F5F5F5"/>
        <path d="M5.1546 4.66411L5.23856 4.9159L5.50398 4.91792C5.53835 4.91822 5.55257 4.96205 5.52495 4.98246L5.31144 5.14015L5.39153 5.3932C5.40193 5.42594 5.36459 5.45309 5.33662 5.43307L5.12066 5.27873L4.90474 5.43307C4.87677 5.45305 4.83951 5.42594 4.84983 5.3932L4.92992 5.14015L4.71641 4.98246C4.68878 4.96201 4.703 4.91822 4.73738 4.91792L5.00279 4.9159L5.08675 4.66411C5.09763 4.6315 5.14373 4.6315 5.1546 4.66411Z" fill="#F5F5F5"/>
        <path d="M5.1546 5.98146L5.23856 6.23326L5.50398 6.23527C5.53835 6.23558 5.55257 6.2794 5.52495 6.29981L5.31144 6.45751L5.39153 6.71055C5.40193 6.74329 5.36459 6.77045 5.33662 6.75043L5.12066 6.59608L4.90474 6.75043C4.87677 6.77041 4.83951 6.74329 4.84983 6.71055L4.92992 6.45751L4.71641 6.29981C4.68878 6.27936 4.703 6.23558 4.73738 6.23527L5.00279 6.23326L5.08675 5.98146C5.09763 5.94889 5.14373 5.94889 5.1546 5.98146Z" fill="#F5F5F5"/>
        <path d="M5.1546 7.29787L5.23856 7.54967L5.50398 7.55169C5.53835 7.55199 5.55257 7.59582 5.52495 7.61623L5.31144 7.77392L5.39153 8.02697C5.40193 8.05971 5.36459 8.08687 5.33662 8.06685L5.12066 7.9125L4.90474 8.06685C4.87677 8.08683 4.83951 8.05971 4.84983 8.02697L4.92992 7.77392L4.71641 7.61623C4.68878 7.59577 4.703 7.55199 4.73738 7.55169L5.00279 7.54967L5.08675 7.29787C5.09763 7.26529 5.14373 7.26529 5.1546 7.29787Z" fill="#F5F5F5"/>
        <path d="M5.1546 8.61528L5.23856 8.86708L5.50398 8.8691C5.53835 8.8694 5.55257 8.91322 5.52495 8.93363L5.31144 9.09133L5.39153 9.34437C5.40193 9.37711 5.36459 9.40427 5.33662 9.38425L5.12066 9.2299L4.90474 9.38425C4.87677 9.40423 4.83951 9.37711 4.84983 9.34437L4.92992 9.09133L4.71641 8.93363C4.68878 8.91318 4.703 8.8694 4.73738 8.8691L5.00279 8.86708L5.08675 8.61528C5.09763 8.58267 5.14373 8.58267 5.1546 8.61528Z" fill="#F5F5F5"/>
        <path d="M5.1546 9.9327L5.23856 10.1845L5.50398 10.1865C5.53835 10.1868 5.55257 10.2306 5.52495 10.2511L5.31144 10.4087L5.39153 10.6618C5.40193 10.6945 5.36459 10.7217 5.33662 10.7017L5.12066 10.5473L4.90474 10.7017C4.87677 10.7216 4.83951 10.6945 4.84983 10.6618L4.92992 10.4087L4.71641 10.2511C4.68878 10.2306 4.703 10.1868 4.73738 10.1865L5.00279 10.1845L5.08675 9.9327C5.09763 9.90004 5.14373 9.90004 5.1546 9.9327Z" fill="#F5F5F5"/>
        <path d="M6.17697 5.30958L6.26093 5.56138L6.52635 5.5634C6.56072 5.5637 6.57494 5.60753 6.54732 5.62794L6.3338 5.78563L6.4139 6.03868C6.4243 6.07142 6.38695 6.09857 6.35898 6.07855L6.14306 5.92421L5.92714 6.07855C5.89917 6.09853 5.86192 6.07142 5.87223 6.03868L5.95232 5.78563L5.73881 5.62794C5.71118 5.60749 5.7254 5.5637 5.75978 5.5634L6.0252 5.56138L6.10916 5.30958C6.12003 5.27701 6.16609 5.27701 6.17697 5.30958Z" fill="#F5F5F5"/>
        <path d="M6.17697 6.627L6.26093 6.87879L6.52635 6.88081C6.56072 6.88111 6.57494 6.92494 6.54732 6.94535L6.3338 7.10304L6.4139 7.35608C6.4243 7.38882 6.38695 7.41598 6.35898 7.39595L6.14306 7.24161L5.92714 7.39595C5.89917 7.41593 5.86192 7.38887 5.87223 7.35608L5.95232 7.10304L5.73881 6.94535C5.71118 6.9249 5.7254 6.88111 5.75978 6.88081L6.0252 6.87879L6.10916 6.627C6.12003 6.59439 6.16609 6.59439 6.17697 6.627Z" fill="#F5F5F5"/>
        <path d="M6.17697 7.94438L6.26093 8.19618L6.52635 8.1982C6.56072 8.1985 6.57494 8.24233 6.54732 8.26274L6.3338 8.42043L6.4139 8.67347C6.4243 8.70622 6.38695 8.73337 6.35898 8.71335L6.14306 8.55901L5.92714 8.71335C5.89917 8.73333 5.86192 8.70622 5.87223 8.67347L5.95232 8.42043L5.73881 8.26274C5.71118 8.24228 5.7254 8.1985 5.75978 8.1982L6.0252 8.19618L6.10916 7.94438C6.12003 7.91177 6.16609 7.91177 6.17697 7.94438Z" fill="#F5F5F5"/>
        <path d="M6.17697 9.26173L6.26093 9.51353L6.52635 9.51555C6.56072 9.51585 6.57494 9.55968 6.54732 9.58009L6.3338 9.73778L6.4139 9.99083C6.4243 10.0236 6.38695 10.0507 6.35898 10.0307L6.14306 9.87636L5.92714 10.0307C5.89917 10.0507 5.86192 10.0236 5.87223 9.99083L5.95232 9.73778L5.73881 9.58009C5.71118 9.55963 5.7254 9.51585 5.75978 9.51555L6.0252 9.51353L6.10916 9.26173C6.12003 9.22916 6.16609 9.22916 6.17697 9.26173Z" fill="#F5F5F5"/>
        <path d="M7.19935 4.66411L7.28331 4.9159L7.54873 4.91792C7.58311 4.91822 7.59733 4.96205 7.5697 4.98246L7.35619 5.14015L7.43628 5.3932C7.44668 5.42594 7.40934 5.45309 7.38137 5.43307L7.16545 5.27873L6.94953 5.43307C6.92155 5.45305 6.8843 5.42594 6.89461 5.3932L6.97471 5.14015L6.76119 4.98246C6.73357 4.96201 6.74779 4.91822 6.78216 4.91792L7.04758 4.9159L7.13154 4.66411C7.14233 4.6315 7.18848 4.6315 7.19935 4.66411Z" fill="#F5F5F5"/>
        <path d="M7.19935 5.98146L7.28331 6.23326L7.54873 6.23527C7.58311 6.23558 7.59733 6.2794 7.5697 6.29981L7.35619 6.45751L7.43628 6.71055C7.44668 6.74329 7.40934 6.77045 7.38137 6.75043L7.16545 6.59608L6.94953 6.75043C6.92155 6.77041 6.8843 6.74329 6.89461 6.71055L6.97471 6.45751L6.76119 6.29981C6.73357 6.27936 6.74779 6.23558 6.78216 6.23527L7.04758 6.23326L7.13154 5.98146C7.14233 5.94889 7.18848 5.94889 7.19935 5.98146Z" fill="#F5F5F5"/>
        <path d="M7.19935 7.29787L7.28331 7.54967L7.54873 7.55169C7.58311 7.55199 7.59733 7.59582 7.5697 7.61623L7.35619 7.77392L7.43628 8.02697C7.44668 8.05971 7.40934 8.08687 7.38137 8.06685L7.16545 7.9125L6.94953 8.06685C6.92155 8.08683 6.8843 8.05971 6.89461 8.02697L6.97471 7.77392L6.76119 7.61623C6.73357 7.59577 6.74779 7.55199 6.78216 7.55169L7.04758 7.54967L7.13154 7.29787C7.14233 7.26529 7.18848 7.26529 7.19935 7.29787Z" fill="#F5F5F5"/>
        <path d="M7.19935 8.61528L7.28331 8.86708L7.54873 8.8691C7.58311 8.8694 7.59733 8.91322 7.5697 8.93363L7.35619 9.09133L7.43628 9.34437C7.44668 9.37711 7.40934 9.40427 7.38137 9.38425L7.16545 9.2299L6.94953 9.38425C6.92155 9.40423 6.8843 9.37711 6.89461 9.34437L6.97471 9.09133L6.76119 8.93363C6.73357 8.91318 6.74779 8.8694 6.78216 8.8691L7.04758 8.86708L7.13154 8.61528C7.14233 8.58267 7.18848 8.58267 7.19935 8.61528Z" fill="#F5F5F5"/>
        <path d="M7.19935 9.9327L7.28331 10.1845L7.54873 10.1865C7.58311 10.1868 7.59733 10.2306 7.5697 10.2511L7.35619 10.4087L7.43628 10.6618C7.44668 10.6945 7.40934 10.7217 7.38137 10.7017L7.16545 10.5473L6.94953 10.7017C6.92155 10.7216 6.8843 10.6945 6.89461 10.6618L6.97471 10.4087L6.76119 10.2511C6.73357 10.2306 6.74779 10.1868 6.78216 10.1865L7.04758 10.1845L7.13154 9.9327C7.14233 9.90004 7.18848 9.90004 7.19935 9.9327Z" fill="#F5F5F5"/>
        <path d="M8.2217 5.30958L8.30566 5.56138L8.57107 5.5634C8.60545 5.5637 8.61967 5.60753 8.59204 5.62794L8.37853 5.78563L8.45863 6.03868C8.46902 6.07142 8.43169 6.09857 8.40371 6.07855L8.1878 5.92421L7.97188 6.07855C7.94391 6.09853 7.90665 6.07142 7.91697 6.03868L7.99706 5.78563L7.78355 5.62794C7.75592 5.60749 7.77014 5.5637 7.80452 5.5634L8.06993 5.56138L8.15389 5.30958C8.16472 5.27701 8.21087 5.27701 8.2217 5.30958Z" fill="#F5F5F5"/>
        <path d="M8.2217 6.627L8.30566 6.87879L8.57107 6.88081C8.60545 6.88111 8.61967 6.92494 8.59204 6.94535L8.37853 7.10304L8.45863 7.35608C8.46902 7.38882 8.43169 7.41598 8.40371 7.39595L8.1878 7.24161L7.97188 7.39595C7.94391 7.41593 7.90665 7.38887 7.91697 7.35608L7.99706 7.10304L7.78355 6.94535C7.75592 6.9249 7.77014 6.88111 7.80452 6.88081L8.06993 6.87879L8.15389 6.627C8.16472 6.59439 8.21087 6.59439 8.2217 6.627Z" fill="#F5F5F5"/>
        <path d="M8.2217 7.94438L8.30566 8.19618L8.57107 8.1982C8.60545 8.1985 8.61967 8.24233 8.59204 8.26274L8.37853 8.42043L8.45863 8.67347C8.46902 8.70622 8.43169 8.73337 8.40371 8.71335L8.1878 8.55901L7.97188 8.71335C7.94391 8.73333 7.90665 8.70622 7.91697 8.67347L7.99706 8.42043L7.78355 8.26274C7.75592 8.24228 7.77014 8.1985 7.80452 8.1982L8.06993 8.19618L8.15389 7.94438C8.16472 7.91177 8.21087 7.91177 8.2217 7.94438Z" fill="#F5F5F5"/>
        <path d="M8.2217 9.26173L8.30566 9.51353L8.57107 9.51555C8.60545 9.51585 8.61967 9.55968 8.59204 9.58009L8.37853 9.73778L8.45863 9.99083C8.46902 10.0236 8.43169 10.0507 8.40371 10.0307L8.1878 9.87636L7.97188 10.0307C7.94391 10.0507 7.90665 10.0236 7.91697 9.99083L7.99706 9.73778L7.78355 9.58009C7.75592 9.55963 7.77014 9.51585 7.80452 9.51555L8.06993 9.51353L8.15389 9.26173C8.16472 9.22916 8.21087 9.22916 8.2217 9.26173Z" fill="#F5F5F5"/>
        <path d="M9.2441 4.66411L9.32806 4.9159L9.59348 4.91792C9.62785 4.91822 9.64208 4.96205 9.61445 4.98246L9.40094 5.14015L9.48103 5.3932C9.49143 5.42594 9.45409 5.45309 9.42612 5.43307L9.2102 5.27873L8.99428 5.43307C8.96631 5.45305 8.92905 5.42594 8.93937 5.3932L9.01946 5.14015L8.80595 4.98246C8.77832 4.96201 8.79254 4.91822 8.82692 4.91792L9.09234 4.9159L9.1763 4.66411C9.18712 4.6315 9.23319 4.6315 9.2441 4.66411Z" fill="#F5F5F5"/>
        <path d="M9.2441 5.98146L9.32806 6.23326L9.59348 6.23527C9.62785 6.23558 9.64208 6.2794 9.61445 6.29981L9.40094 6.45751L9.48103 6.71055C9.49143 6.74329 9.45409 6.77045 9.42612 6.75043L9.2102 6.59608L8.99428 6.75043C8.96631 6.77041 8.92905 6.74329 8.93937 6.71055L9.01946 6.45751L8.80595 6.29981C8.77832 6.27936 8.79254 6.23558 8.82692 6.23527L9.09234 6.23326L9.1763 5.98146C9.18712 5.94889 9.23319 5.94889 9.2441 5.98146Z" fill="#F5F5F5"/>
        <path d="M9.2441 7.29787L9.32806 7.54967L9.59348 7.55169C9.62785 7.55199 9.64208 7.59582 9.61445 7.61623L9.40094 7.77392L9.48103 8.02697C9.49143 8.05971 9.45409 8.08687 9.42612 8.06685L9.2102 7.9125L8.99428 8.06685C8.96631 8.08683 8.92905 8.05971 8.93937 8.02697L9.01946 7.77392L8.80595 7.61623C8.77832 7.59577 8.79254 7.55199 8.82692 7.55169L9.09234 7.54967L9.1763 7.29787C9.18712 7.26529 9.23319 7.26529 9.2441 7.29787Z" fill="#F5F5F5"/>
        <path d="M9.2441 8.61528L9.32806 8.86708L9.59348 8.8691C9.62785 8.8694 9.64208 8.91322 9.61445 8.93363L9.40094 9.09133L9.48103 9.34437C9.49143 9.37711 9.45409 9.40427 9.42612 9.38425L9.2102 9.2299L8.99428 9.38425C8.96631 9.40423 8.92905 9.37711 8.93937 9.34437L9.01946 9.09133L8.80595 8.93363C8.77832 8.91318 8.79254 8.8694 8.82692 8.8691L9.09234 8.86708L9.1763 8.61528C9.18712 8.58267 9.23319 8.58267 9.2441 8.61528Z" fill="#F5F5F5"/>
        <path d="M9.2441 9.9327L9.32806 10.1845L9.59348 10.1865C9.62785 10.1868 9.64208 10.2306 9.61445 10.2511L9.40094 10.4087L9.48103 10.6618C9.49143 10.6945 9.45409 10.7217 9.42612 10.7017L9.2102 10.5473L8.99428 10.7017C8.96631 10.7216 8.92905 10.6945 8.93937 10.6618L9.01946 10.4087L8.80595 10.2511C8.77832 10.2306 8.79254 10.1868 8.82692 10.1865L9.09234 10.1845L9.1763 9.9327C9.18712 9.90004 9.23319 9.90004 9.2441 9.9327Z" fill="#F5F5F5"/>
    </svg>

    const ukraineIcon = <svg width="22" height="22" viewBox="0 0 63 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.1562 0L9.84375 0C3.3203 0 0 4.925 0 11L0 22L63 22V11C63 4.925 59.6797 0 53.1562 0Z" fill="#1B75BB"/>
        <path d="M0 33C0 39.075 3.3203 44 9.84375 44H53.1562C59.6797 44 63 39.075 63 33V22L0 22L0 33Z" fill="#F9CB38"/>
    </svg>

    const setUserDataInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        testState[value.target.name] = value.target.value
    }


    const selectUserData = (value: React.ChangeEvent<HTMLSelectElement>) => {
        //@ts-ignore
        testState[value.target.name] = value.target.value
    }

    const saveUserDataButton = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('Button worked', testState)
    }

    const titleOptions = [
        {item: 'MR.'},
        {item: 'MS.'}
        ]



    const countryOptions = [
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
        {
            icon: ukraineIcon,
            item: 'Ukraine'
        },
        {
            icon: unitedStatesIcon,
            item: 'United States'
        },
    ]

    return (
        <div className="prof_set_mainBlock">
            <div className="prof_set_itemsContainer">
                <div className="prof_set_itemsColumn">
                    {/* @ts-ignore */}
                    <div className="prof_set_item">
                        <CustomSelect
                            placeholder="MR."
                            label="TITLE"
                            width="calc(100% - 15px)"
                            selectOnClick={(event: React.ChangeEvent<HTMLSelectElement>) => selectUserData(event)}
                            name="select_gender"
                            selectedStandard="MR."
                            textColor="black"
                            selectedOptions={titleOptions}
                            optionValue={countryValue}
                            setOptionValue={setCountryValue}
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="admin@eddapps.com"
                            label="EMAIL"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="email"
                        />
                    </div>
                    <div className="prof_set_item">
                        <MaskInput
                            type="tel"
                            placeholder="+1 (111) 111-1111"
                            // icon = ""
                            label="MOBILE PHONE"
                            width="calc(100% - 15px)"
                            mask="true"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="mobile_phone"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="2035 Sunset Lake Road"
                            label="STREET AND NO."
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="street_and_number"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="19702"
                            label="ZIP/POST CODE"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="zip_or_post_code"
                        />
                    </div>
                </div>
                <div className="prof_set_itemsColumn">
                    <div className="prof_set_item">
                        <Input
                            placeholder="eddappstest1"
                            label="FIRST NAME"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="first_name"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="Admin"
                            label="LAST NAME"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="last_name"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="Company..."
                            label="COMPANY (OPTIONAL)"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="company"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="Newark"
                            label="CITY"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="city"
                        />
                    </div>
                    <div className="prof_set_item">
                        <Input
                            placeholder="Delaware"
                            label="STATE"
                            width="calc(100% - 15px)"
                            mainInputEvent={(value: React.ChangeEvent<HTMLInputElement>) => setUserDataInput(value)}
                            name="state"
                        />
                    </div>
                </div>
            </div>
            <div className="prof_set_country">
                <CustomSelect
                    placeholder="United States"
                    label="COUNTRY"
                    width="calc(100% - 15px)"
                    height="40px"
                    icon={unitedStatesIcon}
                    selectOnClick={(event: React.ChangeEvent<HTMLSelectElement>) => selectUserData(event)}
                    name="country"
                    selectedStandard="United States"
                    textColor="black"
                    selectedOptions={countryOptions}
                    optionValue={titleValue}
                    setOptionValue={setTitleValue}
                />
            </div>
            <div className="prof_set_buttonSave">
                <Button
                    buttonType="reg"
                    value="Save"
                    width="160px"
                    height="40px"
                    mainButtonClicked={(event: React.MouseEvent<HTMLDivElement>) => saveUserDataButton(event)}
                    className="green"
                />
            </div>
        </div>
    );
};

export default Profile;
