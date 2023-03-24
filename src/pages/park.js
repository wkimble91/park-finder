import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import styles from '@/styles/Park.module.css';

export default function SelectedPark({ selectedParkData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedParkData]);

  console.log(selectedParkData);

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
            <Image
              className={styles.parkImage}
              fill
              quality={'90'}
              priority
              src={selectedParkData.images[0].url}
              alt={`Image of ${selectedParkData.fullName}`}
            />
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

              {selectedParkData.addresses === undefined ? (
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
                <p>No listed activities</p>
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
