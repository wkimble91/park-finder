import React, { Component, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Carousel } from 'react-bootstrap';
import Warning from '@/components/Warning.js';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import styles from '@/styles/Park.module.css';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function SelectedPark({ selectedParkData }) {
  const [parkWarnings, setParkWarnings] = useState([]);
  const router = useRouter();
  let warnings = [];
  useEffect(() => {
    // If no park is selected, redirect to home page
    if (selectedParkData.length === 0) {
      router.push('/');
    }
    // Get park warnings
    axios
      .get(
        `https://developer.nps.gov/api/v1/alerts?parkCode=${selectedParkData.parkCode}&api_key=${API_KEY}`
      )
      .then((response) => {
        setParkWarnings(response.data);
      });
    // Scroll to top of page
    window.scrollTo(0, 0);
  }, [selectedParkData]);

  warnings = parkWarnings.data;
  return (
    <>
      <Head>
        {selectedParkData.length === 0 ? (
          <title>Park Finder</title>
        ) : (
          <title>Park Finder | {selectedParkData.name}</title>
        )}
      </Head>
      <Navbar />
      {selectedParkData.length === 0 ? (
        <Link href={'/'} className={styles.parkError}>
          Please select a park
        </Link>
      ) : (
        <div className={styles.park}>
          <div className={styles.parkImageContainer}>
            {selectedParkData.images[0] === undefined ? (
              <Image
                className={styles.parkImage}
                fill
                quality={'100'}
                priority
                src='/No_Image.png'
                alt={`No Image Provided`}
              />
            ) : selectedParkData.images.length <= 1 ? (
              <Image
                className={styles.parkImage}
                fill
                quality={'70'}
                priority
                src={selectedParkData.images[0].url}
                alt={`Image of ${selectedParkData.fullName}`}
              />
            ) : (
              <Carousel className={styles.parkImageContainer}>
                {selectedParkData.images.map((image, index) => (
                  <Carousel.Item
                    key={index}
                    interval={8000}
                    className={styles.parkImageContainer}
                  >
                    <Image
                      className={styles.parkImage}
                      fill
                      unoptimized
                      priority
                      src={image.url}
                      alt={image.altText}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
          <div className={styles.parkDivider}>
            <svg
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <path
                d='M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z'
                className={styles.parkDividerFill}
              ></path>
            </svg>
          </div>
          <h1 className={styles.parkName}>{selectedParkData.fullName}</h1>
          <div className={styles.parkInfo}>
            <div className={styles.parkInfoContainer}>
              <div className={styles.parkInfoIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 32 33'
                  fill='none'
                >
                  <path d='M31.415 10.586l-10-10c-0.496-0.496-1.215-0.695-1.896-0.527-0.359 0.088-0.68 0.273-0.934 0.527-0.227 0.227-0.398 0.508-0.496 0.822-0.453 1.469-1.236 2.746-2.395 3.904-1.548 1.547-3.564 2.719-5.697 3.958-2.264 1.312-4.603 2.672-6.52 4.588-1.629 1.631-2.738 3.445-3.388 5.551-0.219 0.711-0.028 1.48 0.496 2.006l10 10c0.496 0.496 1.215 0.695 1.896 0.527 0.359-0.090 0.68-0.273 0.934-0.527 0.227-0.227 0.398-0.508 0.496-0.824 0.454-1.469 1.237-2.746 2.397-3.904 1.547-1.547 3.562-2.717 5.697-3.955 2.262-1.314 4.602-2.674 6.518-4.59 1.629-1.629 2.738-3.445 3.389-5.551 0.218-0.71 0.026-1.482-0.497-2.005zM12 30c-3.312-3.312-6.688-6.689-10-10 2.842-9.201 15.16-8.799 18-18 3.312 3.311 6.689 6.688 10.002 10-2.843 9.199-15.161 8.799-18.002 18zM19.562 14.9c-0.326-0.273-0.654-0.459-0.984-0.551-0.328-0.092-0.656-0.129-0.988-0.105-0.328 0.025-0.664 0.1-1 0.229-0.336 0.131-0.674 0.273-1.014 0.438-0.537-0.617-1.074-1.227-1.611-1.793 0.242-0.219 0.477-0.33 0.703-0.338 0.227-0.010 0.445 0.014 0.652 0.066 0.211 0.053 0.404 0.098 0.582 0.133 0.18 0.035 0.336-0.004 0.473-0.119 0.145-0.125 0.225-0.287 0.236-0.482 0.010-0.197-0.064-0.389-0.229-0.576-0.211-0.242-0.465-0.389-0.77-0.443-0.301-0.053-0.609-0.049-0.93 0.021-0.316 0.072-0.617 0.191-0.902 0.359s-0.514 0.34-0.684 0.508c-0.065-0.062-0.13-0.123-0.195-0.184-0.072-0.066-0.162-0.102-0.27-0.1-0.109 0-0.199 0.047-0.273 0.133-0.072 0.084-0.105 0.182-0.092 0.285 0.010 0.107 0.053 0.189 0.127 0.252 0.065 0.055 0.13 0.109 0.195 0.166-0.256 0.309-0.467 0.65-0.633 1.010-0.168 0.361-0.268 0.719-0.305 1.066-0.039 0.35-0.002 0.67 0.105 0.967 0.107 0.299 0.305 0.553 0.594 0.793 0.471 0.391 1.025 0.557 1.668 0.52 0.641-0.039 1.332-0.23 2.075-0.629 0.59 0.682 1.182 1.359 1.773 1.988-0.25 0.211-0.469 0.332-0.662 0.371-0.193 0.041-0.365 0.037-0.521-0.010-0.156-0.049-0.301-0.119-0.434-0.209-0.133-0.092-0.264-0.17-0.395-0.234-0.129-0.064-0.262-0.1-0.398-0.102s-0.281 0.064-0.441 0.201c-0.164 0.143-0.246 0.309-0.246 0.496s0.086 0.375 0.254 0.566c0.17 0.191 0.391 0.352 0.658 0.479s0.569 0.207 0.901 0.229c0.332 0.023 0.682-0.027 1.051-0.164 0.371-0.135 0.738-0.379 1.1-0.742 0.174 0.17 0.35 0.332 0.525 0.488 0.074 0.064 0.164 0.096 0.273 0.088 0.105-0.004 0.197-0.053 0.27-0.141 0.074-0.090 0.105-0.189 0.094-0.293-0.010-0.105-0.053-0.186-0.125-0.244-0.176-0.141-0.352-0.289-0.527-0.445 0.299-0.367 0.539-0.754 0.717-1.137 0.178-0.385 0.283-0.756 0.318-1.1 0.035-0.346-0.006-0.658-0.119-0.941-0.112-0.287-0.311-0.533-0.596-0.77zM13.971 15.578c-0.283 0.012-0.53-0.082-0.746-0.291-0.092-0.088-0.156-0.195-0.195-0.322-0.041-0.127-0.055-0.266-0.039-0.418 0.014-0.15 0.059-0.307 0.137-0.465 0.074-0.158 0.184-0.316 0.324-0.469 0.507 0.504 1.013 1.057 1.52 1.629-0.384 0.211-0.718 0.324-1.001 0.336zM18.688 17.58c-0.090 0.166-0.193 0.314-0.314 0.443-0.561-0.566-1.121-1.188-1.68-1.826 0.143-0.064 0.293-0.131 0.455-0.199s0.324-0.113 0.486-0.141c0.166-0.025 0.33-0.018 0.494 0.021 0.162 0.041 0.316 0.129 0.459 0.268 0.141 0.141 0.23 0.287 0.266 0.445 0.039 0.16 0.041 0.322 0.014 0.488-0.029 0.167-0.088 0.333-0.18 0.501zM14.717 22.18c0.197-0.159 0.487-0.151 0.668 0.033 0.196 0.195 0.196 0.514 0 0.709-0.016 0.016-0.033 0.027-0.051 0.041l0.002 0.002c-0.633 0.481-1.153 0.914-1.714 1.475-0.507 0.506-0.965 1.039-1.361 1.58l-0.639 0.875c-0.020 0.036-0.044 0.069-0.074 0.1-0.196 0.195-0.515 0.195-0.71 0-0.17-0.17-0.191-0.432-0.066-0.627l-0.002-0.002 0.684-0.934c0.427-0.584 0.918-1.156 1.461-1.699 0.565-0.567 1.175-1.073 1.8-1.553h0.002zM18.378 7.715c0.506-0.506 0.963-1.037 1.36-1.581l0.664-0.91c0.024-0.043 0.051-0.086 0.088-0.123 0.197-0.197 0.516-0.197 0.713 0 0.187 0.188 0.195 0.485 0.025 0.684l0.002 0.002-0.684 0.938c-0.428 0.584-0.918 1.154-1.461 1.697-0.565 0.565-1.174 1.073-1.799 1.553l-0.004-0.002c-0.199 0.183-0.508 0.179-0.699-0.014-0.197-0.197-0.197-0.518 0-0.715 0.035-0.037 0.076-0.063 0.117-0.086 0.588-0.449 1.155-0.92 1.678-1.443z'></path>
                </svg>
              </div>
              <h4>Price:</h4>
              {selectedParkData.entranceFees[0] === undefined ? (
                <p>No price available</p>
              ) : selectedParkData.entranceFees[0].cost === '0.00' ? (
                <p>Free</p>
              ) : (
                <p>{'$' + selectedParkData.entranceFees[0].cost}</p>
              )}
            </div>
            <div className={styles.parkInfoContainer}>
              <div className={styles.parkInfoIcon}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 32'>
                  <path d='M21.607 12.6282C21.8615 12.6282 22.105 12.5247 22.2817 12.3416L25.6845 8.81481C26.0349 8.45156 26.0349 7.87612 25.6845 7.51294L22.2817 3.98612C22.105 3.803 21.8615 3.69956 21.607 3.69956H15.7987V0.9375C15.7987 0.41975 15.379 0 14.8612 0H11.1379C10.6201 0 10.2004 0.41975 10.2004 0.9375V3.6995H2.56741C1.52485 3.6995 0.676726 4.54763 0.676726 5.59013V10.7375C0.676726 11.7801 1.52485 12.6282 2.56741 12.6282H10.2004V14.5031H4.39204C4.1376 14.5031 3.89404 14.6066 3.71735 14.7897L0.314539 18.3165C-0.0358359 18.6798 -0.0358359 19.2552 0.314539 19.6184L3.71735 23.1452C3.89404 23.3283 4.1376 23.4317 4.39204 23.4317H10.2004V30.125H9.26285C8.7451 30.125 8.32535 30.5448 8.32535 31.0625C8.32535 31.5802 8.7451 32 9.26285 32H16.7362C17.254 32 17.6737 31.5802 17.6737 31.0625C17.6737 30.5448 17.254 30.125 16.7362 30.125H15.7987V23.4317H23.4317C24.4742 23.4317 25.3224 22.5836 25.3224 21.5411V16.3937C25.3224 15.3512 24.4742 14.5031 23.4317 14.5031H15.7987V12.6282H21.607ZM12.0754 1.875H13.9237V3.6995H12.0754V1.875ZM2.55173 10.7375V5.59019C2.55173 5.58156 2.55873 5.57456 2.56741 5.57456H21.2089L23.7072 8.16387L21.2089 10.7532H2.56741C2.55873 10.7532 2.55173 10.7461 2.55173 10.7375ZM13.9237 30.125H12.0754V23.4317H13.9237V30.125ZM23.4474 16.3937V21.5411C23.4474 21.5497 23.4404 21.5567 23.4317 21.5567H4.79023L2.29191 18.9674L4.79023 16.3781H23.4317C23.4404 16.3781 23.4474 16.3851 23.4474 16.3937ZM13.9237 14.5031H12.0754V12.6282H13.9237V14.5031Z'></path>
                </svg>
              </div>
              <h4>Location:</h4>
              {selectedParkData.addresses[0] === undefined ? (
                <p>No Address Provided</p>
              ) : (
                <a target='_blank' href={selectedParkData.directionsUrl}>
                  {selectedParkData.addresses[0].city +
                    ', ' +
                    selectedParkData.addresses[0].stateCode}
                </a>
              )}
            </div>
            <div className={styles.parkInfoContainer}>
              <div className={styles.parkInfoIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 32 32'
                  fill='none'
                >
                  <path d='M24 0h-16c-1.658 0-3 1.343-3 3v26c0 1.658 1.343 3 3 3h16c1.656 0 3-1.344 3-3v-26c0-1.658-1.344-3-3-3zM25 29c0 0.551-0.449 1-1 1h-16c-0.552 0-1-0.447-1-1v-2.004h18v2.004zM25 25.996h-18v-19.996h18v19.996zM25 5h-18v-2c0-0.552 0.448-1 1-1h16c0.551 0 1 0.448 1 1v2zM18 3.5c0 0.276-0.225 0.5-0.5 0.5h-3c-0.277 0-0.5-0.224-0.5-0.5v0c0-0.277 0.223-0.5 0.5-0.5h3c0.275 0 0.5 0.223 0.5 0.5v0zM17 28.496c0 0.275-0.225 0.5-0.5 0.5h-1c-0.276 0-0.5-0.225-0.5-0.5v0c0-0.277 0.224-0.5 0.5-0.5h1c0.275 0 0.5 0.223 0.5 0.5v0z'></path>
                </svg>
              </div>
              <h4>Phone:</h4>
              {selectedParkData.contacts.phoneNumbers[0] === undefined ? (
                <p>no phone number available</p>
              ) : (
                <a href='tel:{selectedParkData.directionsUrl}'>
                  {selectedParkData.contacts.phoneNumbers[0].phoneNumber}
                </a>
              )}
            </div>
          </div>
          <div className={styles.parkWarning}>
            <div className={styles.parkWarningContainer}>
              <div className={styles.parkInfoIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='-4 -2 40 40'
                  fill='none'
                  className={styles.parkInfoIconWarning}
                >
                  <path d='M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z'></path>
                  <path d='M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z'></path>
                  <path d='M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z'></path>
                </svg>
              </div>
              <h4 className={styles.parkWarnings}>Park Warnings:</h4>
              {warnings === undefined ? (
                <p>No warnings</p>
              ) : warnings.length === 0 ? (
                <p>No warnings</p>
              ) : (
                warnings.map((warning, index) => (
                  <Warning
                    key={index}
                    title={warning.title}
                    description={warning.description}
                    url={warning.url}
                    catagory={warning.category}
                  />
                ))
              )}
            </div>
          </div>
          <div className={styles.parkDetailsContainer}>
            <div className={styles.parkDescripton}>
              <h2>{`About ${selectedParkData.name}`}</h2>
              <div className={styles.parkDescriptonContainer}>
                <div className={styles.parkDescriptonIcon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='-3 -3 36 36'
                    fill='none'
                  >
                    <path d='M27 0h-22c-2.209 0-4 1.791-4 4v24c0 2.209 1.791 4 4 4h22c2.209 0 4-1.791 4-4v-24c0-2.209-1.791-4-4-4zM29 28c0 1.102-0.898 2-2 2h-22c-1.103 0-2-0.898-2-2v-24c0-1.103 0.897-2 2-2h22c1.102 0 2 0.897 2 2v24zM26 4h-20c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h20c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM26 5v13.869l-3.25-3.53c-0.191-0.216-0.463-0.339-0.75-0.339s-0.561 0.123-0.75 0.339l-2.604 2.95-7.896-8.95c-0.19-0.216-0.463-0.339-0.75-0.339s-0.56 0.123-0.75 0.339l-3.25 3.748v-8.087h20zM6 14.6l4-4.6 8.646 9.801 2.762 3.199h-15.408v-8.4zM22.74 23l-3.428-3.955 2.688-3.045 4 4.379v2.621h-3.26zM20 13c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.658 0-3 1.343-3 3s1.342 3 3 3zM20 8c1.102 0 2 0.897 2 2s-0.898 2-2 2c-1.104 0-2-0.897-2-2s0.896-2 2-2z'></path>
                  </svg>
                </div>
                <h3>Park Description</h3>
                <p>{selectedParkData.description}</p>
              </div>
              <div className={styles.parkDescriptonContainer}>
                <div className={styles.parkDescriptonIcon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='2 1 28 28'
                    fill='none'
                  >
                    <path d='M7.101 15.102v0c-0.066-0.357-0.101-0.726-0.101-1.102 0-3.314 2.686-6 6-6 2.336 0 4.361 1.335 5.352 3.285 0.812-0.795 1.923-1.285 3.148-1.285 2.485 0 4.5 2.015 4.5 4.5 0 0.209-0.014 0.415-0.042 0.616v0c1.743 0.431 3.042 2.006 3.042 3.884 0 2.205-1.792 4-4.003 4h-16.994c-2.205 0-4.003-1.791-4.003-4 0-1.895 1.325-3.488 3.101-3.898zM24.953 10.219c0.031-0.235 0.047-0.475 0.047-0.719 0-3.038-2.462-5.5-5.5-5.5-2.203 0-4.103 1.295-4.981 3.165v0c-0.489-0.108-0.997-0.165-1.519-0.165-3.866 0-7 3.134-7 7 0 0.138 0.004 0.275 0.012 0.412-1.772 0.77-3.012 2.538-3.012 4.588 0 2.761 2.232 5 4.999 5h17.001c2.761 0 4.999-2.244 4.999-5 0-2.052-1.232-3.815-3.001-4.585-0.026-1.695-0.818-3.204-2.046-4.195v0 0zM23.999 9.599v0 0c-0.75-0.383-1.599-0.599-2.499-0.599-1.059 0-2.047 0.299-2.886 0.817-0.789-1.057-1.87-1.884-3.124-2.362 0.745-1.458 2.261-2.456 4.010-2.456 2.485 0 4.5 2.015 4.5 4.5 0 0.033-0 0.066-0.001 0.099zM10.5 25c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM13.5 27c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM16.5 25c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM19.5 27c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM22.5 25c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM19.5 0c-0.276 0-0.5 0.216-0.5 0.495v2.009c0 0.274 0.232 0.495 0.5 0.495 0.276 0 0.5-0.216 0.5-0.495v-2.009c0-0.274-0.232-0.495-0.5-0.495v0zM26.233 2.789c-0.195-0.195-0.506-0.201-0.704-0.003l-1.421 1.421c-0.193 0.193-0.186 0.514 0.003 0.704 0.195 0.195 0.506 0.201 0.704 0.003l1.421-1.421c0.193-0.193 0.186-0.514-0.003-0.704v0zM29.022 9.522c0-0.276-0.216-0.5-0.495-0.5h-2.009c-0.274 0-0.495 0.232-0.495 0.5 0 0.276 0.216 0.5 0.495 0.5h2.009c0.274 0 0.495-0.232 0.495-0.5v0zM12.767 2.789c-0.195 0.195-0.201 0.506-0.003 0.704l1.421 1.421c0.193 0.193 0.514 0.186 0.704-0.003 0.195-0.195 0.201-0.506 0.003-0.704l-1.421-1.421c-0.193-0.193-0.514-0.186-0.704 0.003v0z'></path>
                  </svg>
                </div>
                <h3>Local Climate</h3>
                <p>{selectedParkData.weatherInfo}</p>
              </div>
            </div>
            <div className={styles.parkTodo}>
              <h2>{`Things To Do At ${selectedParkData.name}`}</h2>

              {selectedParkData.activities[0] == undefined ? (
                <p className={styles.parkTodoListError}>No listed activities</p>
              ) : (
                <ul className={styles.parkTodoList}>
                  {selectedParkData.activities.map((activity, index) => (
                    <li key={index} className={styles.parkTodoListItem}>
                      <svg
                        className={styles.parkTodoListIcon}
                        viewBox='0 0 32 32'
                      >
                        <path d='M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z'></path>
                      </svg>{' '}
                      {activity.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
