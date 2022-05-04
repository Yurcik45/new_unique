import { useEffect, useState} from "react";
import './Upload.sass';
import Dropzone from 'react-dropzone-uploader';
import './dropzoneStyles.css';
import uploadFromPC from '../../../assets/images/synchronizeIcons/synchronizeUploadFromPC.svg';
// import DropboxChooser from 'react-dropbox-chooser';
//@ts-ignore
import {getDroppedOrSelectedFiles} from 'html5-file-selector';
import {ISubmitButtonProps} from 'react-dropzone-uploader/dist/Dropzone'
import Button from "../../../components/UI/Button/Button";
import {useReducer} from "react";
import { useDispatch} from "react-redux";
import {uploadFiles} from "../../../redux/actions/images";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface UploadProps {
    setShowUpload?: any
}

const Upload = (props: UploadProps) => {

    const dispatch = useDispatch()

    const removeIcon = <svg width="22" height="22" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path
                d="M5.91618 5.00827L9.81 1.11435C10.0634 0.861071 10.0634 0.451547 9.81 0.198263C9.55671 -0.0550201 9.14719 -0.0550201 8.8939 0.198263L4.99997 4.09218L1.10615 0.198263C0.852744 -0.0550201 0.443337 -0.0550201 0.190052 0.198263C-0.0633508 0.451547 -0.0633508 0.861071 0.190052 1.11435L4.08387 5.00827L0.190052 8.90219C-0.0633508 9.15548 -0.0633508 9.565 0.190052 9.81829C0.316279 9.94463 0.482249 10.0081 0.6481 10.0081C0.813951 10.0081 0.979802 9.94463 1.10615 9.81829L4.99997 5.92437L8.8939 9.81829C9.02025 9.94463 9.1861 10.0081 9.35195 10.0081C9.5178 10.0081 9.68365 9.94463 9.81 9.81829C10.0634 9.565 10.0634 9.15548 9.81 8.90219L5.91618 5.00827Z"
                fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="10" height="10" fill="white"/>
            </clipPath>
        </defs>
    </svg>
    const acceptIcon = <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2.12192 14.177L2.12182 14.1769C1.33293 13.2831 0.9 12.1534 0.9 10.9892C0.9 9.56739 1.58193 8.2319 2.70812 7.3884C2.6729 7.18914 2.652 6.98519 2.652 6.7737C2.652 4.97058 4.11977 3.50282 5.92289 3.50282C6.11089 3.50282 6.29858 3.51946 6.48016 3.54974C6.94243 2.76423 7.58611 2.09567 8.35683 1.59817C9.30669 0.983103 10.4154 0.656836 11.5532 0.656836C13.0258 0.656836 14.44 1.20493 15.5277 2.20066C16.4905 3.08117 17.1257 4.23719 17.3533 5.50524C19.5214 6.10737 21.0958 8.18279 21.1 10.512V10.5121C21.1 11.812 20.6177 13.0616 19.7332 14.0341C18.8446 15.0149 17.6487 15.6028 16.3681 15.6952L16.3609 15.6957V15.6954H16.3608H16.3607H16.3606H16.3605H16.3604H16.3603H16.3602H16.3601H16.36H16.3599H16.3598H16.3597H16.3596H16.3595H16.3595H16.3594H16.3593H16.3592H16.3591H16.359H16.3589H16.3588H16.3587H16.3586H16.3585H16.3584H16.3583H16.3582H16.3581H16.358H16.3579H16.3579H16.3578H16.3577H16.3576H16.3575H16.3574H16.3573H16.3572H16.3571H16.357H16.3569H16.3568H16.3567H16.3566H16.3566H16.3565H16.3564H16.3563H16.3562H16.3561H16.356H16.3559H16.3558H16.3557H16.3556H16.3555H16.3554H16.3554H16.3553H16.3552H16.3551H16.355H16.3549H16.3548H16.3547H16.3546H16.3545H16.3545H16.3544H16.3543H16.3542H16.3541H16.354H16.3539H16.3538H16.3537H16.3536H16.3536H16.3535H16.3534H16.3533H16.3532H16.3531H16.353H16.3529H16.3528H16.3527H16.3527H16.3526H16.3525H16.3524H16.3523H16.3522H16.3521H16.352H16.352H16.3519H16.3518H16.3517H16.3516H16.3515H16.3514H16.3513H16.3513H16.3512H16.3511H16.351H16.3509H16.3508H16.3507H16.3506H16.3506H16.3505H16.3504H16.3503H16.3502H16.3501H16.35H16.3499H16.3499H16.3498H16.3497H16.3496H16.3495H16.3494H16.3493H16.3493H16.3492H16.3491H16.349H16.3489H16.3488H16.3487H16.3487H16.3486H16.3485H16.3484H16.3483H16.3482H16.3481H16.3481H16.348H16.3479H16.3478H16.3477H16.3476H16.3476H16.3475H16.3474H16.3473H16.3472H16.3471H16.347H16.347H16.3469H16.3468H16.3467H16.3466H16.3465H16.3465H16.3464H16.3463H16.3462H16.3461H16.346H16.346H16.3459H16.3458H16.3457H16.3456H16.3455H16.3455H16.3454H16.3453H16.3452H16.3451H16.345H16.345H16.3449H16.3448H16.3447H16.3446H16.3446H16.3445H16.3444H16.3443H16.3442H16.3441H16.3441H16.344H16.3439H16.3438H16.3437H16.3437H16.3436H16.3435H16.3434H16.3433H16.3432H16.3432H16.3431H16.343H16.3429H16.3428H16.3428H16.3427H16.3426H16.3425H16.3424H16.3424H16.3423H16.3422H16.3421H16.342H16.342H16.3419H16.3418H16.3417H16.3416H16.3416H16.3415H16.3414H16.3413H16.3412H16.3412H16.3411H16.341H16.3409H16.3408H16.3408H16.3407H16.3406H16.3405H16.3404H16.3404H16.3403H16.3402H16.3401H16.34H16.34H16.3399H16.3398H16.3397H16.3396H16.3396H16.3395H16.3394H16.3393H16.3393H16.3392H16.3391H16.339H16.3389H16.3389H16.3388H16.3387H16.3386H16.3385H16.3385H16.3384H16.3383H16.3382H16.3382H16.3381H16.338H16.3379H16.3378H16.3378H16.3377H16.3376H16.3375H16.3375H16.3374H16.3373H16.3372H16.3371H16.3371H16.337H16.3369H16.3368H16.3368H16.3367H16.3366H16.3365H16.3365H16.3364H16.3363H16.3362H16.3361H16.3361H16.336H16.3359H16.3358H16.3358H16.3357H16.3356H16.3355H16.3355H16.3354H16.3353H16.3352H16.3352H16.3351H16.335H16.3349H16.3348H16.3348H16.3347H16.3346H16.3345H16.3345H16.3344H16.3343H16.3342H16.3342H16.3341H16.334H16.3339H16.3339H16.3338H16.3337H16.3336H16.3336H16.3335H16.3334H16.3333H16.3333H16.3332H16.3331H16.333H16.333H16.3329H16.3328H16.3327H16.3327H16.3326H16.3325H16.3324H16.3324H16.3323H16.3322H16.3321H16.3321H16.332H16.3319H16.3318H16.3318H16.3317H16.3316H16.3315H16.3315H16.3314H16.3313H16.3312H16.3312H16.3311H16.331H16.3309H16.3309H16.3308H16.3307H16.3306H16.3306H16.3305H16.3304H16.3303H16.3303H16.3302H16.3301H16.33H16.33H16.3299H16.3298H16.3297H16.3297H16.3296H16.3295H16.3294H16.3294H16.3293H16.3292H16.3292H16.3291H16.329H16.3289H16.3289H16.3288H16.3287H16.3286H16.3286H16.3285H16.3284H16.3283H16.3283H16.3282H16.3281H16.328H16.328H16.3279H16.3278H16.3278H16.3277H16.3276H16.3275H16.3275H16.3274H16.3273H16.3272H16.3272H16.3271H16.327H16.3269H16.3269H16.3268H16.3267H16.3267H16.3266H16.3265H16.3264H16.3264H16.3263H16.3262H16.3261H16.3261H16.326H16.3259H16.3259H16.3258H16.3257H16.3256H16.3256H16.3255H16.3254H16.3253H16.3253H16.3252H16.3251H16.3251H16.325H16.3249H16.3248H16.3248H16.3247H16.3246H16.3245H16.3245H16.3244H16.3243H16.3243H16.3242H16.3241H16.324H16.324H16.3239H16.3238H16.3237H16.3237H16.3236H16.3235H16.3235H16.3234H16.3233H16.3232H16.3232H16.3231H16.323H16.3229H16.3229H16.3228H16.3227H16.3227H16.3226H16.3225H16.3224H16.3224H16.3223H16.3222H16.3221H16.3221H16.322H16.3219H16.3219H16.3218H16.3217H16.3216H16.3216H16.3215H16.3214H16.3214H16.3213H16.3212H16.3211H16.3211H16.321H16.3209H16.3208H16.3208H16.3207H16.3206H16.3206H16.3205H16.3204H16.3203H16.3203H16.3202H16.3201H16.3201H16.32H16.3199H16.3198H16.3198H13.2681C12.9045 15.6954 12.6129 15.4039 12.6129 15.0402C12.6129 14.6765 12.9045 14.385 13.2681 14.385H16.2953C18.2217 14.235 19.7896 12.5048 19.7896 10.5121C19.7896 8.62924 18.4402 6.98288 16.6607 6.67897C16.3696 6.63026 16.1465 6.39239 16.1174 6.09667L16.1174 6.09639C15.892 3.73782 13.9324 1.95904 11.5573 1.95904C9.79047 1.95904 8.16422 2.98958 7.41167 4.58723L7.41149 4.58762C7.26591 4.89332 6.91177 5.03866 6.59198 4.92238L6.59142 4.92217C6.38101 4.84424 6.15429 4.80502 5.92289 4.80502C4.84301 4.80502 3.96243 5.6856 3.96243 6.76547C3.96243 7.0051 4.00166 7.22771 4.07959 7.43812L4.08006 7.43941L4.08005 7.43941C4.18604 7.73811 4.07092 8.07313 3.79327 8.23388M2.12192 14.177L3.74316 8.14734M2.12192 14.177C2.93183 15.0918 4.00484 15.6361 5.15242 15.6994L5.15241 15.6995H5.15793H5.158H5.15807H5.15814H5.15822H5.15829H5.15836H5.15843H5.1585H5.15857H5.15865H5.15872H5.15879H5.15886H5.15893H5.159H5.15907H5.15914H5.15921H5.15928H5.15935H5.15942H5.1595H5.15957H5.15964H5.15971H5.15978H5.15985H5.15992H5.15999H5.16006H5.16012H5.16019H5.16026H5.16033H5.1604H5.16047H5.16054H5.16061H5.16068H5.16075H5.16082H5.16088H5.16095H5.16102H5.16109H5.16116H5.16123H5.1613H5.16136H5.16143H5.1615H5.16157H5.16164H5.1617H5.16177H5.16184H5.16191H5.16197H5.16204H5.16211H5.16218H5.16224H5.16231H5.16238H5.16244H5.16251H5.16258H5.16264H5.16271H5.16278H5.16284H5.16291H5.16298H5.16304H5.16311H5.16318H5.16324H5.16331H5.16337H5.16344H5.16351H5.16357H5.16364H5.1637H5.16377H5.16384H5.1639H5.16397H5.16403H5.1641H5.16416H5.16423H5.16429H5.16436H5.16442H5.16449H5.16455H5.16462H5.16468H5.16475H5.16481H5.16488H5.16494H5.16501H5.16507H5.16513H5.1652H5.16526H5.16533H5.16539H5.16546H5.16552H5.16558H5.16565H5.16571H5.16578H5.16584H5.1659H5.16597H5.16603H5.16609H5.16616H5.16622H5.16628H5.16635H5.16641H5.16647H5.16654H5.1666H5.16666H5.16673H5.16679H5.16685H5.16692H5.16698H5.16704H5.16711H5.16717H5.16723H5.16729H5.16736H5.16742H5.16748H5.16754H5.16761H5.16767H5.16773H5.16779H5.16786H5.16792H5.16798H5.16804H5.16811H5.16817H5.16823H5.16829H5.16835H5.16842H5.16848H5.16854H5.1686H5.16866H5.16873H5.16879H5.16885H5.16891H5.16897H5.16903H5.1691H5.16916H5.16922H5.16928H5.16934H5.1694H5.16947H5.16953H5.16959H5.16965H5.16971H5.16977H5.16983H5.1699H5.16996H5.17002H5.17008H5.17014H5.1702H5.17026H5.17032H5.17038H5.17044H5.17051H5.17057H5.17063H5.17069H5.17075H5.17081H5.17087H5.17093H5.17099H5.17105H5.17111H5.17118H5.17124H5.1713H5.17136H5.17142H5.17148H5.17154H5.1716H5.17166H5.17172H5.17178H5.17184H5.1719H5.17196H5.17202H5.17209H5.17215H5.17221H5.17227H5.17233H5.17239H5.17245H5.17251H5.17257H5.17263H5.17269H5.17275H5.17281H5.17287H5.17293H5.17299H5.17305H5.17311H5.17317H5.17323H5.17329H5.17335H5.17341H5.17347H5.17353H5.17359H5.17366H5.17372H5.17378H5.17384H5.1739H5.17396H5.17402H5.17408H5.17414H5.1742H5.17426H5.17432H5.17438H5.17444H5.1745H5.17456H5.17462H5.17468H5.17474H5.1748H5.17486H5.17492H5.17498H5.17504H5.1751H5.17516H5.17522H5.17528H5.17534H5.1754H5.17546H5.17552H5.17558H5.17564H5.1757H5.17576H5.17582H5.17589H5.17595H5.17601H5.17607H5.17613H5.17619H5.17625H5.17631H5.17637H5.17643H5.17649H5.17655H5.17661H5.17667H5.17673H5.17679H5.17685H5.17691H5.17697H5.17703H5.17709H5.17716H5.17722H5.17728H5.17734H5.1774H5.17746H5.17752H5.17758H5.17764H5.1777H5.17776H5.17782H5.17788H5.17795H5.17801H5.17807H5.17813H5.17819H5.17825H5.17831H5.17837H5.17843H5.17849H5.17856H5.17862H5.17868H5.17874H5.1788H5.17886H5.17892H5.17898H5.17904H5.17911H5.17917H5.17923H5.17929H5.17935H5.17941H5.17947H5.17954H5.1796H5.17966H5.17972H5.17978H5.17984H5.17991H5.17997H5.18003H5.18009H5.18015H5.18022H5.18028H5.18034H5.1804H5.18046H5.18053H5.18059H5.18065H5.18071H5.18077H5.18084H5.1809H5.18096H5.18102H5.18109H5.18115H5.18121H5.18127H5.18134H5.1814H5.18146H5.18152H5.18159H5.18165H5.18171H5.18178H5.18184H5.1819H5.18197H5.18203H5.18209H5.18215H5.18222H5.18228H5.18234H5.18241H5.18247H5.18253H5.1826H5.18266H5.18273H5.18279H5.18285H5.18292H5.18298H5.18304H5.18311H5.18317H5.18324H5.1833H5.18336H5.18343H5.18349H5.18356H5.18362H5.18369H5.18375H5.18382H5.18388H5.18394H5.18401H5.18407H5.18414H5.1842H5.18427H5.18433H5.1844H5.18446H5.18453H5.18459H5.18466H5.18472H5.18479H5.18485H5.18492H5.18499H5.18505H5.18512H5.18518H5.18525H5.18532H5.18538H5.18545H5.18551H5.18558H5.18565H5.18571H5.18578H5.18584H5.18591H5.18598H5.18604H5.18611H5.18618H5.18624H5.18631H5.18638H5.18645H5.18651H5.18658H5.18665H5.18671H5.18678H5.18685H5.18692H5.18699H5.18705H5.18712H5.18719H5.18726H5.18732H5.18739H5.18746H5.18753H5.1876H5.18767H5.18773H5.1878H5.18787H5.18794H5.18801H5.18808H5.18815H5.18822H5.18828H5.18835H5.18842H5.18849H5.18856H5.18863H5.1887H5.18877H5.18884H5.18891H5.18898H5.18905H5.18912H5.18919H5.18926H5.18933H5.1894H5.18947H5.18954H5.18961H5.18968H5.18975H5.18983H5.1899H5.18997H5.19004H5.19011H5.19018H5.19025H5.19033H5.1904H5.19047H5.19054H5.19061H5.19068H5.19076H5.19083H8.72774C9.09142 15.6995 9.38295 15.408 9.38295 15.0443C9.38295 14.6806 9.09142 14.3891 8.72774 14.3891H5.21035M2.12192 14.177L5.20728 14.4891M3.79327 8.23388L3.74316 8.14734M3.79327 8.23388C3.79337 8.23382 3.79347 8.23376 3.79357 8.2337L3.74316 8.14734M3.79327 8.23388C2.81642 8.80418 2.21043 9.85702 2.21043 10.9851C2.21043 12.7383 3.5879 14.2881 5.21035 14.3891M3.74316 8.14734C2.73555 8.73545 2.11043 9.8212 2.11043 10.9851C2.11043 12.7864 3.52519 14.3863 5.20728 14.4891M5.21035 14.3891H5.20728V14.4891M5.21035 14.3891C5.21136 14.3892 5.21237 14.3892 5.21338 14.3893L5.20728 14.4891"
            fill="white" stroke="white" strokeWidth="0.2"/>
        <path
            d="M14.4046 11.5863C14.6616 11.3293 14.6616 10.9164 14.4046 10.6594L11.464 7.7188C11.3432 7.598 11.1741 7.525 11.0026 7.525C10.833 7.525 10.663 7.59249 10.5405 7.71946L7.60058 10.6594C7.34356 10.9164 7.34356 11.3293 7.60058 11.5863C7.72616 11.7119 7.8955 11.7801 8.062 11.7801C8.2265 11.7801 8.39686 11.7174 8.52405 11.5857L10.3474 9.76237V18.6881C10.3474 19.0518 10.6389 19.3433 11.0026 19.3433C11.3662 19.3433 11.6578 19.0518 11.6578 18.6881V9.76237L13.4811 11.5856C13.4812 11.5858 13.4813 11.5859 13.4814 11.586C13.7348 11.8439 14.148 11.8428 14.4046 11.5863Z"
            fill="white" stroke="white" strokeWidth="0.2"/>
    </svg>;
    const cancelIcon = <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path
                d="M11.064 9.3388L10.8872 9.51558L11.064 9.69235L18.4622 17.0908L18.4623 17.0908C18.846 17.4744 18.846 18.0942 18.4623 18.4778L18.4622 18.4778C18.2708 18.6692 18.0201 18.7652 17.7687 18.7652C17.5173 18.7652 17.2666 18.6692 17.0752 18.4778L9.67671 11.0794L9.49993 10.9026L9.32316 11.0794L1.9249 18.4778C1.73352 18.6692 1.48277 18.7652 1.23139 18.7652C0.979939 18.7652 0.72904 18.6692 0.537959 18.4779L0.537834 18.4778C0.154055 18.0942 0.154055 17.4744 0.537834 17.0908L0.537878 17.0908L7.93613 9.69235L8.1129 9.51558L7.93613 9.3388L0.537878 1.94035L0.537834 1.94031C0.154055 1.55671 0.154055 0.93697 0.537834 0.553372L0.537876 0.553331C0.921448 0.169761 1.54103 0.169686 1.9249 0.553328C1.92492 0.553343 1.92493 0.553358 1.92494 0.553372L9.32316 7.95178L9.49993 8.12856L9.67671 7.95178L17.0752 0.553331C17.4588 0.169723 18.0786 0.169723 18.4622 0.553331L18.4623 0.553372C18.846 0.93697 18.846 1.55671 18.4623 1.94031L18.4622 1.94035L11.064 9.3388Z"
                fill="white" stroke="#900000" strokeWidth="0.5"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="19" height="19" fill="white"/>
            </clipPath>
        </defs>
    </svg>;


    let resultSize: string;
    const formatBytes = (bytes: number) => {
        let marker = 1024; // Change to 1000 if required
        let decimal = 3; // Change as required
        let kiloBytes = marker; // One Kilobyte is 1024 bytes
        let megaBytes = marker * marker; // One MB is 1024 KB
        let gigaBytes = marker * marker * marker; // One GB is 1024 MB

        if (bytes < kiloBytes) return (resultSize = bytes + " Bytes");
        else if (bytes < megaBytes) return (resultSize = (bytes / kiloBytes).toFixed(decimal) + " KB");
        else if (bytes < gigaBytes) return resultSize = ((bytes / megaBytes).toFixed(decimal) + " MB");
        else return resultSize = ((bytes / gigaBytes).toFixed(decimal) + " GB");
    }

    const Custom = () => {

        const [, forceUpdate] = useReducer(x => x + 1, 0);
        const [countFiles, setCountFiles] = useState<number>(0)
        let resultFiles: any = [];


        const Preview = ({meta, fileWithMeta, files}: any) => {
            const {name, size, previewUrl} = meta
            formatBytes(size)

            const remove = () => {

                let rmArr: any[] = []
                //@ts-ignore
                files.map((f) => {
                    if (f.file.status === 'removed') {
                        rmArr.push(f.file.name)
                    }
                    return rmArr
                })
                let cleanItems: any;
                const cleanArr = (arr: any[]) => {
                    return cleanItems = arr.filter((e, i, a) => a.indexOf(e) === i)
                }
                cleanArr(rmArr)
                fileWithMeta.file.status = 'removed'
                cleanItems = []
                //@ts-ignore
                files.map((f) => {
                    if (f.file.status === 'removed') {
                        cleanItems.push(f.file.status)
                    }
                    return cleanItems
                })
                forceUpdate()
                if (cleanItems.length === files.length) {
                    //@ts-ignore
                    files.forEach(f => f.remove()) && console.log('all files deleted', files)
                }
            }
            const [showDelete, setShowDelete] = useState<boolean>(false)
            const viewDelete = () => {
                setShowDelete(true)
            }
            const mouseLeave = () => {
                setShowDelete(false)
            }
            return (
                <div
                    style={{display: fileWithMeta.file.status === 'removed' ? "none" : "flex"}}
                    className="dzu-previewContainer"
                    onMouseLeave={mouseLeave}
                    onMouseOver={viewDelete}
                >
                    <div className="main_images_image">
                        <img src={previewUrl} alt="preview"/>
                    </div>
                    {
                        showDelete
                            ? <button className="removeImage" onClick={remove}>{removeIcon}</button>
                            : null
                    }
                    <div className="main_images_image_name"> {name} </div>
                    <div className="main_images_image_size"> {resultSize} </div>
                </div>
            )
        }


        const Input = ({accept, files, onFiles, getFilesFromEvent}: any) => {
            const text = files.length > 0 ? 'Add more files' : 'browse';

            useEffect(() => {
                //@ts-ignore
                setCountFiles(files.filter(file => file.file.status !== "removed").length)
            }, [files])


            return (
                <div
                    style={{display: text !== 'browse' ? 'none' : 'flex'}}
                    className="dropzoneInputContainer"
                >
                    <div className="input_image">
                        <img src={uploadFromPC} alt="uploadFromPC"/>
                    </div>
                    <div className="input_text">Drop files here, paste or</div>
                    <div className="input_main_browse">
                        <label className="browseLabel">
                            {text}
                            <input
                                style={{display: 'none'}}
                                type="file"
                                accept={accept}
                                multiple
                                onChange={(e => {
                                    // @ts-ignore
                                    getFilesFromEvent(e).then(chosenFiles => {
                                        onFiles(chosenFiles)
                                    })
                                })}
                            />
                        </label>
                    </div>
                    <div className="input_img_format">
                        Supported file types for direct file upload: JPG, JPEG, PNG, GIF
                    </div>
                </div>
            )
        }


        const handleSubmit = (files: any, allFiles: any) => {
            if (files === undefined) {
            } else {
                files.map((f: string) => {
                    //@ts-ignore
                    if (f.file.status !== 'removed') {
                        resultFiles.push(f)
                    }
                    return resultFiles
                })
                dispatch(uploadFiles(resultFiles))
                //@ts-ignore
                allFiles.forEach(f => f.remove())
            }
        }
        const SubmitButton = (props: ISubmitButtonProps) => {
            const {onSubmit, files} = props

            const handleSubmit = () => {
                onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))

            }
            const cancelSubmit = () => {
                //@ts-ignore
                onSubmit(files.forEach(f => f.remove()))
            }

            return (
                <div className="submitButtonContainer">
                    <Button
                        value='upload'
                        height='calc(100% - 5px)'
                        width='180px'
                        minWidth="140px"
                        className="green"
                        uppercase={true}
                        buttonIcon={acceptIcon}
                        fontSize="14px"
                        borderRadius="10px"
                        mainButtonClicked={handleSubmit}
                    />
                    <Button
                        value='cancel'
                        height='calc(100% - 5px)'
                        width='180px'
                        className="red"
                        uppercase={true}
                        buttonIcon={cancelIcon}
                        fontSize="14px"
                        borderRadius="10px"
                        mainButtonClicked={cancelSubmit}
                    />
                </div>
            )
        }


        const getUploadParams = () => ({url: 'https://httpbin.org/post'})
        const getFilesFromEvent = (e: any) => {
            return new Promise(resolve => {
                //@ts-ignore
                getDroppedOrSelectedFiles(e).then(chosenFiles => {
                    //@ts-ignore
                    resolve(chosenFiles.map(f => f.fileObject))
                })
            })
        }
        return (
            <div className={countFiles > 0 ? "pre-dropzone upload" : "pre-dropzone"}>

                <div
                    style={{display: countFiles > 0 ? "flex" : "none"}}
                    className="pre-dropzone_match_files"
                >
                    {/*{countFiles - cleanItems?.length > 0 ? cleanItems.length : 0} files*/}
                    {countFiles} files
                </div>
                <Dropzone
                    accept="image/*"
                    getUploadParams={getUploadParams}
                    InputComponent={Input}
                    PreviewComponent={Preview}
                    onSubmit={handleSubmit}
                    // onChangeStatus={handleChangeStatus}
                    SubmitButtonComponent={SubmitButton}
                    //@ts-ignore
                    getFilesFromEvent={getFilesFromEvent}
                    disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
                />
            </div>
        )
    }

    const closeModal = () => {
        props.setShowUpload(false)
    }

    return (
        <div className="ImageUploadPage">
    
            <ClickAwayListener onClickAway={closeModal}>

                <div className="dropzone">
                    <Custom/>
                </div>
            </ClickAwayListener>

        </div>
    )
}

export default Upload;


// {/*<h1>Upload Or Choose Files to DropBox</h1>*/
// }
// {/*<div className="container">*/
// }
// {/*    <DropboxChooser*/
// }
// {/*        appKey={APP_KEY}*/
// }
// {/*        success={handleSuccess}*/
// }
// {/*        cancel={() => console.log('closed')}*/
// }
// {/*        multiselect={true}*/
// }
// {/*    >*/
// }
// {/*        <button>Upload or Choose Files</button>*/
// }
// {/*        <div className="dropbox"></div>*/
// }
// {/*        <br/><br/>*/
// }
// {/*        <img src={url} width="200" height="10" alt="images"/>*/
// }
// {/*    </DropboxChooser>*/
// }
// {/*</div>*/
// }