import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-bootstrap';
import { Footer } from '@/components/Footer.js';
import styles from '@/styles/Park.module.css';
import Warning from '@/components/Warning.js';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

Park.getInitialProps = async ({ query }) => {
  const res = await axios.get(
    `https://developer.nps.gov/api/v1/parks?limit=1&parkCode=${query.parkCode}&api_key=${API_KEY}`
  );
  const { data } = res.data;
  return { ...query, parkData: data[0] };
};

export default function Park(parkData) {
  const [parkWarnings, setParkWarnings] = useState([]);

  let parkInfo = parkData.parkData;
  let warnings = [];

  useEffect(() => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/alerts?parkCode=${parkInfo.parkCode}&api_key=${API_KEY}`
      )
      .then((response) => {
        setParkWarnings(response.data);
      });

    // Scroll to top of page
    window.scrollTo(0, 0);
  }, [parkData]);
  warnings = parkWarnings.data;

  return (
    <>
      <Head>
        {parkInfo == undefined ? (
          <title>Park Finder</title>
        ) : parkInfo.length === 0 ? (
          <title>Park Finder</title>
        ) : (
          <title>Park Finder | {parkInfo.name}</title>
        )}
      </Head>
      {parkInfo == undefined ? (
        <Link href={'/explore'} className={styles.parkError}>
          Please select a park
        </Link>
      ) : parkInfo.length === 0 ? (
        <Link href={'/explore'} className={styles.parkError}>
          Please select a park
        </Link>
      ) : (
        <main className={styles.park}>
          <div className={styles.parkImageContainer}>
            {parkInfo.images === undefined ? (
              <Image
                className={styles.parkImage}
                fill
                quality={'100'}
                priority
                src='/No_Image.png'
                alt={`No Image Provided`}
              />
            ) : parkInfo.images.length <= 1 ? (
              <Image
                className={styles.parkImage}
                fill
                quality={'70'}
                priority
                src={parkInfo.images[0].url}
                alt={`Image of ${parkInfo.fullName}`}
              />
            ) : (
              <Carousel
                indicators={false}
                className={styles.parkImageContainer}
              >
                {parkInfo.images.map((image, index) => (
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

          {/* ---SVG CURVE BELOW IMAGE--- */}
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

          {/* ---PARK NAME--- */}
          <h1 className={styles.parkName}>{parkInfo.fullName}</h1>

          {/* ---PARK INFO SECTION--- */}
          <div className={styles.parkInfoContainer}>
            <div className={styles.parkInfo}>
              <div className={styles.parkInfoItem}>
                <h4>Price:</h4>
                {parkInfo.entranceFees[0] === undefined ? (
                  <p>Not Provided</p>
                ) : parkInfo.entranceFees[0].cost === '0.00' ? (
                  <p>Free</p>
                ) : (
                  <p>{'$' + parkInfo.entranceFees[0].cost}</p>
                )}
              </div>
              <div className={styles.parkInfoItem}>
                <h4>Location:</h4>
                {parkInfo.addresses[0] === undefined ? (
                  <p>No Address Provided</p>
                ) : (
                  <a target='_blank' href={parkInfo.directionsUrl}>
                    {parkInfo.addresses[0].city +
                      ', ' +
                      parkInfo.addresses[0].stateCode}
                  </a>
                )}
              </div>
              <div className={styles.parkInfoItem}>
                <h4>Phone:</h4>
                {parkInfo.contacts.phoneNumbers[0] === undefined ? (
                  <p>No Phone Number Provided</p>
                ) : (
                  <a
                    href={`tel:${parkInfo.contacts.phoneNumbers[0].phoneNumber}`}
                  >
                    {parkInfo.contacts.phoneNumbers[0].phoneNumber}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ---WARNINGS SECTION--- */}
          <div className={styles.parkWarning}>
            <div className={styles.parkWarningContainer}>
              <div className={styles.parkWarningIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='-4 -2 40 40'
                  fill='none'
                  className={styles.parkWarningIconWarning}
                >
                  <path d='M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z'></path>
                  <path d='M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z'></path>
                  <path d='M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z'></path>
                </svg>
              </div>
              <h4 className={styles.parkWarningTitle}>Park Warnings:</h4>
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

          {/* ---ABOUT SECTION--- */}
          <div className={styles.parkDescripton}>
            <Image
              className={styles.parkDescriptonImage}
              fill
              unoptimized
              src={parkInfo.images[0].url}
              alt={parkInfo.images[0].altText}
            />
            <h2>{`About ${parkInfo.name}`}</h2>
            <div className={styles.parkDescriptonItem}>
              <h3>Park Description</h3>
              <p>{parkInfo.description}</p>
            </div>
            <div className={styles.parkDescriptonItem}>
              <h3>Local Climate</h3>
              <p>{parkInfo.weatherInfo}</p>
            </div>
          </div>

          {/* ---TODO SECTION--- */}
          <div className={styles.parkTodo}>
            <h2>{`Things To Do In ${parkInfo.name}`}</h2>
            {parkInfo.activities[0] == undefined ? (
              <p className={styles.parkTodoListError}>No listed activities</p>
            ) : (
              <ul className={styles.parkTodoList}>
                {parkInfo.activities.map((activity, index) => (
                  <li key={index} className={styles.parkTodoListItem}>
                    <svg
                      className={styles.parkTodoListIcon}
                      viewBox='0 0 32 32'
                    >
                      <path d='M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z'></path>
                    </svg>
                    {activity.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}
