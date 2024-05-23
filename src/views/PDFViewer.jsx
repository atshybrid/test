import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TwitterShareButton, XIcon, EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { BsHouse, BsCalendar, BsGeoAlt, BsCrop, BsZoomOut, BsZoomIn, BsFullscreen, BsDownload, BsChevronLeft, BsChevronRight, BsGridFill, BsX, BsCopy, BsCloudArrowDown, BsList } from "react-icons/bs";
import { MinimalButton, SpecialZoomLevel, Worker, Viewer, ViewMode, ScrollMode } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { ThumbnailDirection, thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { fetchSingleEpaper } from '../redux/util/ePaperUtils';
import ePaperPDF from '../assets/pdf/ePaper.pdf';

import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { disableScrollPlugin } from '../utils/helper';

const shareUrl = 'http://github.com';
const title = 'GitHub';

const PDFViewer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const settings = useSelector(state => state.ePaper.settings)
    const color = settings?.epaper_sitetheme.primary_color_code;
    // const singleFeed = useSelector(state => state.ePaper.singleFeed)

    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [viewThubnails, setViewThubnails] = useState(false);
    const [cropper, setCropper] = useState(null);
    const [cropArea, setCropArea] = useState({});
    const viewerRef = useRef(null);
    const cropperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch(fetchSingleEpaper(id));
    }, [dispatch])

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToNextPage, jumpToPreviousPage, jumpToPage } = pageNavigationPluginInstance;

    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    const toolbarPluginInstance = toolbarPlugin({
        selectionModePlugin: {
            selectionMode: SelectionMode.Hand,
        },
    });

    const { Toolbar } = toolbarPluginInstance;

    const disableScrollPluginInstance = disableScrollPlugin();

    const scrollModePluginInstance = scrollModePlugin();

    scrollModePluginInstance.switchScrollMode(ScrollMode.Horizontal);

    const handleThumbnailChange = () => {
        setViewThubnails(!viewThubnails);
    };

    const handleCropEnd = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const cropData = cropper.cropBoxData;
            const { left, top, width, height } = cropData;

            const buttonTop = top + height - 24; // Adjust button position as needed
            const buttonLeft = left + width + 12; // Adjust button position as needed

            setCropArea({ buttonTop, buttonLeft });

            // console.log(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const navlinks = [
        {
            label: "All Editions",
            link: () => navigate('/')
        },
        {
            label: "Home",
            link: () => jumpToPage(0)
        },
        {
            label: "Crop and Share",
            link: () => null
        },
        {
            label: "Contact Us",
            link: () => null
        },
        {
            label: "About Us",
            link: () => null
        },
        {
            label: "Terms & Conditions",
            link: () => null
        },
        {
            label: "Privacy Policy",
            link: () => null
        }
    ];

    return (
        <>
            <SideBar data={navlinks} isVisible={sideMenuOpen} onSideMenuClose={() => setSideMenuOpen(false)} onBackdropPress={() => setSideMenuOpen(false)} />
            <Header onMenuPress={() => setSideMenuOpen(true)} onCropPress={() => setCropper(!cropper)} />
            <Toolbar>
                {(props) => {
                    const {
                        CurrentPageInput,
                        CurrentScale,
                        GoToFirstPage,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ZoomIn,
                        ZoomOut,
                        EnterFullScreen,
                        Download
                    } = props;
                    return (
                        <div className='hidden xl:flex padding-x py-2 items-center justify-between'>
                            <div className='flex items-center gap-6 cursor-pointer'>
                                <BsList onClick={() => setSideMenuOpen(true)} />
                                <BsHouse onClick={() => navigate(-1)} />
                                <GoToFirstPage>
                                    {(props) => (
                                        <button onClick={props.onClick}>
                                            <p>Home</p>
                                        </button>
                                    )}
                                </GoToFirstPage>
                                <button className='flex items-center'>
                                    <p className='mr-2'>April 15, 2024</p>
                                    <BsCalendar />
                                </button>
                                <button className='flex items-center'>
                                    <p className='mr-2'>Andhra Pradesh Main</p>
                                    <BsGeoAlt />
                                </button>
                                <div className='flex items-center'>
                                    <GoToPreviousPage>
                                        {(props) => (
                                            <BsChevronLeft onClick={props.onClick} />
                                        )}
                                    </GoToPreviousPage>
                                    <div className='flex items-center mx-2'>
                                        <CurrentPageInput /> of <NumberOfPages />
                                    </div>
                                    <GoToNextPage>
                                        {(props) => (
                                            <BsChevronRight onClick={props.onClick} />
                                        )}
                                    </GoToNextPage>
                                </div>
                                <button className='flex items-center' onClick={() => setCropper(!cropper)}>
                                    <BsCrop />
                                    <p className='ml-2'>Crop&Share</p>
                                </button>
                                <BsGridFill onClick={handleThumbnailChange} />
                                <div className='flex items-center'>
                                    <ZoomOut>
                                        {(props) => (
                                            <BsZoomOut onClick={props.onClick} />
                                        )}
                                    </ZoomOut>
                                    <div className='mx-2'>
                                        <CurrentScale>
                                            {(props) => (
                                                <span>{`${Math.round(props.scale * 100)}%`}</span>
                                            )}
                                        </CurrentScale>
                                    </div>
                                    <ZoomIn>
                                        {(props) => (
                                            <BsZoomIn onClick={props.onClick} />
                                        )}
                                    </ZoomIn>
                                </div>
                            </div>
                            <div className='flex items-center gap-6 cursor-pointer'>
                                <EnterFullScreen>
                                    {(props) => (
                                        <BsFullscreen onClick={props.onClick} />
                                    )}
                                </EnterFullScreen>
                                <Download>
                                    {(props) => (
                                        <BsDownload onClick={props.onClick} />
                                    )}
                                </Download>
                            </div>
                        </div>
                    );
                }}
            </Toolbar>
            {viewThubnails && (
                <div className='bg-gray-600'>
                    <div className='flex justify-end p-2'>
                        <BsX onClick={handleThumbnailChange} className='size-8 text-white cursor-pointer' />
                    </div>
                    <Thumbnails thumbnailDirection={ThumbnailDirection.Horizontal} />
                </div>
            )}
            <div className='max-sm:h-[640px] h-screen w-full xl:w-[70%] xl:mx-auto relative'>
                <div className={`size-8 ${color ? '' : 'bg-yellow-500'} absolute z-10 top-1/2 left-8`} style={color ? { backgroundColor: color } : {}}>
                    <MinimalButton onClick={jumpToPreviousPage}>
                        <BsChevronLeft className='text-white' />
                    </MinimalButton>
                </div>
                {cropper && (
                    <>
                        <Cropper
                            ref={cropperRef}
                            src={ePaperPDF}
                            style={{ height: "100%", width: "100%", position: 'absolute', zIndex: 50, top: 0, left: 0 }}
                            autoCrop={true}
                            guides={true}
                            modal={true}
                            onInitialized={(instance) => setCropper(instance)}
                            cropend={handleCropEnd}
                        />
                        <div style={{ position: 'absolute', display: 'flex', top: cropArea.buttonTop, left: cropArea.buttonLeft, }}>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <XIcon size={32} round />
                            </TwitterShareButton>
                            <EmailShareButton
                                url={shareUrl}
                                subject={title}
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                            <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <div className='flex size-8 bg-gray-500 rounded-full items-center justify-center'>
                                <BsCopy className='size-4 text-white' />
                            </div>
                            <div className='flex size-8 bg-green-700 rounded-full items-center justify-center'>
                                <BsCloudArrowDown className='size-4 text-white' />
                            </div>
                        </div>
                    </>
                )}
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={ePaperPDF}
                        defaultScale={SpecialZoomLevel.PageWidth}
                        viewMode={ViewMode.SinglePage}
                        plugins={[pageNavigationPluginInstance, thumbnailPluginInstance, toolbarPluginInstance, scrollModePluginInstance, disableScrollPluginInstance]}
                        ref={viewerRef}
                    />
                </Worker>

                <div className={`size-8 ${color ? '' : 'bg-yellow-500'} absolute z-10 top-1/2 right-8`} style={color ? { backgroundColor: color } : {}}>
                    <MinimalButton onClick={jumpToNextPage}>
                        <BsChevronRight className='text-white' />
                    </MinimalButton>
                </div>
            </div>
            <div className="flex xl:hidden bg-gray-600">
                <Thumbnails thumbnailDirection={ThumbnailDirection.Horizontal} />
            </div>
        </>
    );
};

export default PDFViewer;
