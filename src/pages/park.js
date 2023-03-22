import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar.js';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Park.module.css';

export default function SelectedPark({
  selectedParkData,
  selectedParkCode,
  allData,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedParkData]);

  let router = useRouter();

  console.log(selectedParkData);

  return (
    <>
      <Head>
        <title>Park Finder | {selectedParkData.name}</title>
      </Head>
      <Navbar />
      <div className={styles.park}>
        <div className={styles.parkImageContainer}>
          <Image
            className={styles.parkImage}
            fill
            quality={'70'}
            src={selectedParkData.images[1].url}
            alt={`Image of ${selectedParkData.fullName}`}
          />
        </div>
        <h1 className={styles.parkName}>{selectedParkData.fullName}</h1>
        <div className={styles.parkInfo}>
          <div>
            <h4>Location:</h4>
            <p>
              {selectedParkData.addresses === undefined ? (
                <p>No Address Proviced</p>
              ) : (
                <p>
                  {selectedParkData.addresses[0].city +
                    ', ' +
                    selectedParkData.addresses[0].stateCode}
                </p>
              )}
            </p>
          </div>
          <div>
            <h4>Entrance Fee:</h4>
            {selectedParkData.entranceFees === undefined ? (
              <p>No price available</p>
            ) : selectedParkData.entranceFees[0].cost === '0.00' ? (
              <p>Free</p>
            ) : (
              <p>{'$' + selectedParkData.entranceFees[0].cost}</p>
            )}
          </div>
          <div>
            <h4>Phone:</h4>
            {selectedParkData.contacts.phoneNumbers[0] === undefined ? (
              <p>no phone number available</p>
            ) : (
              <p>{selectedParkData.contacts.phoneNumbers[0].phoneNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.parkDescripton}>
        <h1>About This Park</h1>
        <h2>Description</h2>
        <p>{selectedParkData.description}</p>
        <h2>Climate</h2>
        <p>{selectedParkData.weatherInfo}</p>
      </div>
      <div className={styles.parkTodo}>
        <h2>Things to Do</h2>
        <ul className={styles.parkTodoList}>
          {selectedParkData.activities.map((activity, index) => (
            <li key={index} className={styles.parkTodoListItem}>
              &#x2022; {activity.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
