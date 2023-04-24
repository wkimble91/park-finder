import React, { Component, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Warning from '@/components/Warning.js';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import styles from '@/styles/Park.module.css';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function SelectedPark({ selectedParkData }) {
  const [parkWarnings, setParkWarnings] = useState([]);
  const [loading, setLoading] = useState(false);
  let warnings = [];
  useEffect(() => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/alerts?parkCode=${selectedParkData.parkCode}&api_key=${API_KEY}`
      )
      .then((response) => {
        setParkWarnings(response.data);
      });
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
            ) : (
              <Image
                className={styles.parkImage}
                fill
                quality={'90'}
                priority
                src={selectedParkData.images[0].url}
                alt={`Image of ${selectedParkData.fullName}`}
              />
            )}
          </div>
          <h1 className={styles.parkName}>{selectedParkData.fullName}</h1>
          <div className={styles.parkInfo}>
            <div className={styles.parkInfoContainer}>
              <h4>Entrance Fee:</h4>
              {selectedParkData.entranceFees[0] === undefined ? (
                <p>No price available</p>
              ) : selectedParkData.entranceFees[0].cost === '0.00' ? (
                <p>Free</p>
              ) : (
                <p>{'$' + selectedParkData.entranceFees[0].cost}</p>
              )}
            </div>
            <div className={styles.parkInfoContainer}>
              <h4>Location:</h4>

              {selectedParkData.addresses[0] === undefined ? (
                <p>No Address Proviced</p>
              ) : (
                <a href={selectedParkData.directionsUrl}>
                  {selectedParkData.addresses[0].city +
                    ', ' +
                    selectedParkData.addresses[0].stateCode}
                </a>
              )}
            </div>
            <div className={styles.parkInfoContainer}>
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
          <div className={styles.parkInfo}>
            <div className={styles.parkInfoContainer}>
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
              <h2>About This Park</h2>
              <div className={styles.parkDescriptonContainer}>
                <h3>Description</h3>
                <p>{selectedParkData.description}</p>
              </div>
              <div className={styles.parkDescriptonContainer}>
                <h3>Climate</h3>
                <p>{selectedParkData.weatherInfo}</p>
              </div>
            </div>
            <div className={styles.parkTodo}>
              <h2>Things To Do</h2>

              {selectedParkData.activities[0] == undefined ? (
                <p className={styles.parkTodoListError}>No listed activities</p>
              ) : (
                <ul className={styles.parkTodoList}>
                  {selectedParkData.activities.map((activity, index) => (
                    <li key={index} className={styles.parkTodoListItem}>
                      &#x2022; {activity.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
