import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TwitterShareButton, XIcon, EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { BsHouse, BsCalendar, BsGeoAlt, BsCrop, BsZoomOut, BsZoomIn, BsFullscreen, BsDownload, BsChevronLeft, BsChevronRight, BsGridFill, BsX, BsCopy, BsCloudArrowDown } from "react-icons/bs";
import { MinimalButton, SpecialZoomLevel, Worker, Viewer, ViewMode } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { ThumbnailDirection, thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { NextIcon, pageNavigationPlugin, PreviousIcon } from '@react-pdf-viewer/page-navigation';
import { fetchSingleEpaper } from '../redux/util/ePaperUtils';
import ePaperPDF from '../assets/pdf/ePaper.pdf';

import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';

const shareUrl = 'http://github.com';
const title = 'GitHub';

const PDFViewer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const singleFeed = useSelector(state => state.ePaper.singleFeed)

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
    const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    const toolbarPluginInstance = toolbarPlugin({
        selectionModePlugin: {
            selectionMode: SelectionMode.Hand,
        },
    });

    const { Toolbar } = toolbarPluginInstance;

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

    return (
        <>
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
                        <div className='flex bg-white px-4 py-2 items-center justify-between'>
                            <div className='flex items-center gap-6 cursor-pointer'>
                                <button onClick={() => navigate(-1)}>
                                    <BsHouse />
                                </button>
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
            <div className='relative h-screen'>
                <div className='absolute z-10 top-[40%] left-2 origin-center -rotate-90'>
                    <MinimalButton onClick={jumpToPreviousPage}>
                        <PreviousIcon />
                    </MinimalButton>
                </div>
                {cropper && (
                    <>
                        <Cropper
                            ref={cropperRef}
                            src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
                            style={{ height: "100%", width: "100%" }}
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
                        defaultScale={SpecialZoomLevel.ActualSize}
                        viewMode={ViewMode.SinglePage}
                        plugins={[pageNavigationPluginInstance, thumbnailPluginInstance, toolbarPluginInstance]}
                        ref={viewerRef}
                    />
                </Worker>
                <div className='absolute z-10 top-[40%] right-2 origin-center -rotate-90'>
                    <MinimalButton onClick={jumpToNextPage}>
                        <NextIcon />
                    </MinimalButton>
                </div>
            </div>
        </>
    );
};

export default PDFViewer;
